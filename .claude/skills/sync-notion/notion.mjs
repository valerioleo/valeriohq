// Notion REST client for the CMS sync. It authenticates with an internal
// integration token that belongs to the personal workspace, so it can only
// ever reach the CMS, whichever workspace the Notion connector is signed in
// to. The token lives in .env.local (gitignored) as NOTION_TOKEN.
//
//   node --env-file=.env.local .claude/skills/sync-notion/notion.mjs <command>
//
//   rows                        every CMS row: id, last edit, properties
//   page <id>                   one row's properties and its body as markdown
//   comments <id>               unresolved comments on the page and its blocks
//   reply <discussion> <text>   reply in a comment thread (markdown)
//   create                      stdin {properties, markdown} → a new row
//   props <id>                  stdin {properties} → update a row
//   body <id>                   stdin markdown → replace a row's body
//   edit <id>                   stdin [{old_str, new_str}] → targeted edits
//   caption <block> <text>      set an image block's caption (the site's alt)
//
// Properties go in and come out flat, the way frontmatter holds them:
// { Name, Slug, Kind, Status, Date, Description, Canonical, Source, Summary,
//   Work: [page ids] }. Writing is Work's mirror and is never written.

const API = "https://api.notion.com/v1"
const VERSION = "2026-03-11"
const CMS = "3db7c7c9-1f1f-80bb-9733-000bfae3237f"

const token = process.env.NOTION_TOKEN
if (!token) {
  console.error("NOTION_TOKEN is not set. Run with --env-file=.env.local.")
  process.exit(1)
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const call = async (method, path, body, attempt = 0) => {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  // Notion allows about three requests a second; back off when told to.
  if (res.status === 429 && attempt < 5) {
    await sleep(Number(res.headers.get("retry-after") ?? 1) * 1000)
    return call(method, path, body, attempt + 1)
  }
  const json = await res.json()
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status} ${json.code}: ${json.message}`)
  }
  return json
}

// Follows next_cursor until the list ends.
const paginate = async (fetchPage, cursor, acc = []) => {
  const page = await fetchPage(cursor)
  const all = [...acc, ...page.results]
  return page.has_more ? paginate(fetchPage, page.next_cursor, all) : all
}

// One request at a time, in order: comments are listed per block, and a
// long post has a hundred of them.
const sequential = (items, fn) =>
  items.reduce(
    async (acc, item) => [...(await acc), await fn(item)],
    Promise.resolve([])
  )

const cursorParam = cursor => (cursor ? `&start_cursor=${cursor}` : "")

const plain = richText => richText.map(t => t.plain_text).join("")

// A Notion property value as the flat value frontmatter uses.
const flatten = prop => {
  switch (prop.type) {
    case "title":
      return plain(prop.title)
    case "rich_text":
      return plain(prop.rich_text)
    case "select":
      return prop.select ? prop.select.name : null
    case "date":
      return prop.date ? prop.date.start : null
    case "url":
      return prop.url
    case "relation":
      return prop.relation.map(r => r.id)
    default:
      return null
  }
}

const row = page => ({
  id: page.id,
  url: page.url,
  lastEdited: page.last_edited_time,
  ...Object.fromEntries(
    Object.entries(page.properties).map(([name, prop]) => [name, flatten(prop)])
  ),
})

// The CMS schema, for turning flat values back into Notion's shapes.
const TYPES = {
  Name: "title",
  Slug: "rich_text",
  Kind: "select",
  Status: "select",
  Date: "date",
  Description: "rich_text",
  Canonical: "url",
  Source: "rich_text",
  Summary: "rich_text",
  Work: "relation",
}

const unflatten = (type, value) => {
  switch (type) {
    case "title":
      return { title: [{ text: { content: value } }] }
    case "rich_text":
      return { rich_text: value ? [{ text: { content: value } }] : [] }
    case "select":
      return { select: value ? { name: value } : null }
    case "date":
      return { date: value ? { start: value } : null }
    case "url":
      return { url: value || null }
    case "relation":
      return { relation: value.map(id => ({ id })) }
  }
}

const toNotion = props =>
  Object.fromEntries(
    Object.entries(props).map(([name, value]) => {
      if (!TYPES[name]) throw new Error(`Unknown or read-only property: ${name}`)
      return [name, unflatten(TYPES[name], value)]
    })
  )

const stdin = async () =>
  Buffer.concat(await process.stdin.toArray()).toString("utf8")

// Every block under a page, depth first, with its text for context.
const descendants = async id => {
  const children = await paginate(cursor =>
    call("GET", `/blocks/${id}/children?page_size=100${cursorParam(cursor)}`)
  )
  const nested = await sequential(
    children.filter(block => block.has_children),
    block => descendants(block.id)
  )
  return [
    ...children.map(block => ({
      id: block.id,
      text: plain(block[block.type]?.rich_text ?? []),
    })),
    ...nested.flat(),
  ]
}

const commands = {
  rows: async () =>
    (
      await paginate(cursor =>
        call("POST", `/data_sources/${CMS}/query`, {
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        })
      )
    ).map(row),

  page: async id => {
    const page = await call("GET", `/pages/${id}`)
    const body = await call("GET", `/pages/${id}/markdown`)
    return {
      ...row(page),
      markdown: body.markdown,
      truncated: body.truncated,
      unknownBlocks: body.unknown_block_ids,
    }
  },

  comments: async id => {
    const anchors = [{ id, text: "(page)" }, ...(await descendants(id))]
    const threads = await sequential(anchors, async anchor => {
      const comments = await paginate(cursor =>
        call("GET", `/comments?block_id=${anchor.id}&page_size=100${cursorParam(cursor)}`)
      )
      return comments.map(comment => ({
        discussion: comment.discussion_id,
        anchor: anchor.text,
        author: comment.created_by.id,
        created: comment.created_time,
        text: plain(comment.rich_text),
      }))
    })
    return threads.flat()
  },

  reply: (discussion, markdown) =>
    call("POST", "/comments", { discussion_id: discussion, markdown }),

  create: async () => {
    const { properties, markdown } = JSON.parse(await stdin())
    const page = await call("POST", "/pages", {
      parent: { data_source_id: CMS },
      properties: toNotion(properties),
      markdown,
    })
    return { id: page.id, url: page.url }
  },

  props: async id => {
    const { properties } = JSON.parse(await stdin())
    return row(await call("PATCH", `/pages/${id}`, { properties: toNotion(properties) }))
  },

  body: async id => {
    const markdown = await stdin()
    const result = await call("PATCH", `/pages/${id}/markdown`, {
      type: "replace_content",
      replace_content: { new_str: markdown },
    })
    return { id: result.id, truncated: result.truncated }
  },

  // Search-and-replace inside the body, leaving every other block (images
  // included) untouched. Each old_str must match exactly once.
  edit: async id => {
    const updates = JSON.parse(await stdin())
    const result = await call("PATCH", `/pages/${id}/markdown`, {
      type: "update_content",
      update_content: { content_updates: updates },
    })
    return { id: result.id, truncated: result.truncated }
  },

  caption: async (block, text) => {
    const result = await call("PATCH", `/blocks/${block}`, {
      image: { caption: [{ text: { content: text } }] },
    })
    return { id: result.id, caption: plain(result.image.caption) }
  },
}

const [command, ...args] = process.argv.slice(2)
const run = commands[command]
if (!run) {
  console.error(`Usage: notion.mjs <${Object.keys(commands).join("|")}> [args]`)
  process.exit(1)
}

run(...args)
  .then(out => process.stdout.write(`${JSON.stringify(out, null, 2)}\n`))
  .catch(error => {
    console.error(error.message)
    process.exit(1)
  })
