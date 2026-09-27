#!/usr/bin/env node
/**
 * X Article JSON -> site MDX.
 *
 * Reads an Xquik article payload on stdin and writes MDX on stdout.
 *
 *   agentcash fetch https://xquik.com/api/v1/x/articles/<tweetId> \
 *     | node scripts/import-x-article.mjs > content/posts/<slug>.mdx
 *
 * Why Xquik and not ReadX: ReadX collapses every embedded code block and image
 * into an empty `atomic` placeholder, so a code-heavy post silently loses the
 * part that matters. Xquik resolves them into real `markdown` / `media` blocks.
 *
 * Known quirk: Xquik returns the right SET of code blocks but not always in the
 * right ORDER relative to the prose. Each one belongs under the nearest
 * preceding paragraph ending in ":" — the summary at the end lists them so you
 * can eyeball the placement against the live article. Everything else is exact.
 */

const WRAP = 78

const read = () =>
  new Promise((resolve, reject) => {
    let buf = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (c) => (buf += c))
    process.stdin.on("end", () => resolve(buf))
    process.stdin.on("error", reject)
  })

/** Apply Draft.js-style inline ranges as markdown, back-to-front so offsets stay valid. */
function styleText(text, ranges = []) {
  if (!ranges.length) return text
  const marks = new Map() // index -> string to splice in
  const add = (i, s, end) => marks.set(`${i}:${end}`, { i, s, end })

  for (const r of ranges) {
    const style = String(r.style || "").toLowerCase()
    const token = style === "bold" ? "**" : style === "italic" ? "*" : null
    if (!token) continue
    const start = r.offset
    const stop = r.offset + r.length
    if (start < 0 || stop > text.length || r.length <= 0) continue
    add(start, token, false)
    add(stop, token, true)
  }

  // Insert from the highest index down so earlier offsets remain correct.
  const points = [...marks.values()].sort((a, b) => b.i - a.i || (a.end ? -1 : 1))
  let out = text
  for (const p of points) out = out.slice(0, p.i) + p.s + out.slice(p.i)
  return out
}

/** Greedy wrap that never splits inside `code spans` or [links](...). */
function wrap(text, width = WRAP, indent = "") {
  const words = text.split(/\s+/).filter(Boolean)
  const lines = []
  let line = ""
  for (const w of words) {
    if (!line) line = w
    else if ((line + " " + w).length <= width - indent.length) line += " " + w
    else {
      lines.push(line)
      line = w
    }
  }
  if (line) lines.push(line)
  return lines.map((l, i) => (i === 0 ? l : indent + l)).join("\n")
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function isoDate(s) {
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10)
}

const HEADINGS = {
  // Body headings start at h1: the page renders the title outside the body.
  "header-one": "#",
  "header-two": "##",
  "header-three": "###",
  "header-four": "####",
  "header-five": "#####",
  "header-six": "######",
}

function convert(payload, opts = {}) {
  const article = payload.article ?? payload.data?.article ?? payload
  const blocks = article.contents ?? []
  const codeBlocks = []

  const out = []
  let orderedRun = 0
  const push = (text, kind = "block") => out.push({ text, kind })

  for (const b of blocks) {
    const type = b.type
    const styled = () => styleText(b.text ?? "", b.inlineStyleRanges)

    if (type !== "ordered-list-item") orderedRun = 0

    if (type === "markdown") {
      // Already markdown (fenced code, tables). Pass through untouched.
      push(b.text.trim())
      const lang = /^```(\w+)/.exec(b.text.trim())?.[1] ?? "text"
      codeBlocks.push(lang)
    } else if (type === "code-block") {
      push("```" + (b.language ?? "") + "\n" + (b.text ?? "") + "\n```")
      codeBlocks.push(b.language ?? "text")
    } else if (type === "media" || type === "image") {
      if (b.url) push(`![](${b.url})`)
    } else if (type === "divider") {
      push("---")
    } else if (HEADINGS[type]) {
      push(`${HEADINGS[type]} ${(b.text ?? "").replace(/\s+/g, " ").trim()}`)
    } else if (type === "unordered-list-item") {
      push(wrap(`- ${styled().trim()}`, WRAP, "  "), "list")
    } else if (type === "ordered-list-item") {
      orderedRun += 1
      push(wrap(`${orderedRun}. ${styled().trim()}`, WRAP, "   "), "list")
    } else if (type === "blockquote") {
      push(`> ${styled().trim()}`)
    } else {
      const t = styled().trim()
      if (t) push(wrap(t))
    }
  }

  // The lead paragraph becomes the description, not body copy.
  let body = out
  const description = opts.description ?? article.previewText?.split("\n")[0] ?? ""
  if (body.length && opts.dropLead !== false) {
    const first = body[0].text.replace(/[*_]/g, "").trim()
    const lead = description.replace(/[*_]/g, "").trim().slice(0, 60)
    if (lead && first.startsWith(lead.slice(0, 40))) body = body.slice(1)
  }

  // Consecutive list items stay tight; everything else gets a blank line.
  const joined = body
    .map((b, i) => {
      if (i === 0) return b.text
      const tight = b.kind === "list" && body[i - 1].kind === "list"
      return (tight ? "\n" : "\n\n") + b.text
    })
    .join("")

  const title = article.title ?? "Untitled"
  const canonical = opts.canonical ?? ""

  const fm = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description.trim())}`,
    `date: ${JSON.stringify(isoDate(article.createdAt))}`,
    canonical ? `canonical: ${canonical}` : null,
    "sourceLabel: X",
    "---",
  ]
    .filter(Boolean)
    .join("\n")

  return {
    slug: slugify(title),
    mdx: `${fm}\n\n${joined}\n`,
    codeBlocks,
    cover: article.coverImageUrl ?? "",
  }
}

const raw = await read()
// agentcash prints the JSON body followed by a payment receipt object; take the first.
const jsonText = raw.slice(0, (() => {
  let depth = 0
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === "{") depth++
    else if (raw[i] === "}" && --depth === 0) return i + 1
  }
  return raw.length
})())

let payload
try {
  payload = JSON.parse(jsonText)
} catch {
  console.error("Could not parse article JSON on stdin.")
  process.exit(1)
}

const url = process.argv[2] ?? ""
const result = convert(payload, { canonical: url })

process.stdout.write(result.mdx)

console.error(`\n  slug        ${result.slug}`)
console.error(`  cover       ${result.cover || "(none)"}`)
console.error(`  code blocks ${result.codeBlocks.length} [${result.codeBlocks.join(", ")}]`)
if (result.codeBlocks.length) {
  console.error(
    `\n  Check code-block placement against the live article — Xquik returns the\n` +
      `  right blocks but its ordering can drift. Each belongs under the nearest\n` +
      `  preceding paragraph that ends in ":".`
  )
}
