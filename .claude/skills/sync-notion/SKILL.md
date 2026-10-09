---
name: sync-notion
description: Sync site content from the Notion CMS database into content/*.mdx and act on Notion comments. Use when Valerio says "sync Notion", "check Notion", or asks what changed in the CMS.
---

# Sync Notion → MDX

Notion is the source of truth for prose. MDX is generated from it. Never
change prose in the repo without making the same change in Notion.

## How to reach Notion

Use the REST client, never the Notion MCP connector. The connector follows
whichever workspace Valerio last signed in to (often Raycash, where the CMS
doesn't exist and the content is confidential); the client authenticates
with an internal integration token that only sees the personal workspace.

```bash
node --env-file=.env.local .claude/skills/sync-notion/notion.mjs <command>
```

`rows`, `page <id>`, `comments <id>`, `reply <discussion> <text>`, `create`,
`props <id>`, `body <id>`, `edit <id>`, `caption <block> <text>`: the usage
header in `notion.mjs` says what each takes. Properties go in and come out
flat, the way frontmatter holds them. Page bodies are the same Notion
markdown the connector used. The token is `NOTION_TOKEN` in `.env.local`
(gitignored): never open, print or commit that file. If a call returns 401
or 404, the integration has lost access to the "valeriohq.com" page; ask
Valerio to reconnect it (page ••• → Connections).

## Where things are

- Database: `CMS` under the page "valeriohq.com" —
  https://app.notion.com/p/3db7c7c91f1f8046b7b0d49342dbb68c
- Data source: `3db7c7c9-1f1f-80bb-9733-000bfae3237f` (built into `notion.mjs`)
- Properties = frontmatter: `Name` (title), `Slug`, `Kind` (post | project |
  page),
  `Status` (Draft → Review → Ready → Published), `Date`, `Description`,
  `Canonical`, `Source`, `Summary` (→ `summary`, the words beside a project
  in work lists), `Work` (a post's relation to project rows → `work:
  [<slug>, …]`, in the relation's order).
- `Writing` is `Work`'s two-way mirror on project rows. It is for browsing
  in Notion only: the site derives a project's related writing from the
  posts' `work`, so never write it to frontmatter.
- `Kind` decides the file: `content/posts/<slug>.mdx`,
  `content/projects/<slug>.mdx`, or `content/pages/<slug>.mdx`. Pages (only
  About so far) take `title` and the body; their route owns the layout, so a
  new page row also needs a route before it can go live.
- Binding: each synced MDX carries `notion: <page-id>` and
  `notionSynced: <ISO timestamp>` in frontmatter. `Slug` on the row must
  match the file name.

## The rule that overrides everything

**If anything in a page is unclear — an unknown sign, an ambiguous edit, a
comment you could read two ways, a link you can't resolve, a claim that
looks factually off, a block type with no site equivalent — stop and ask
Valerio before writing MDX.** Never guess and never "do the safe thing"
silently. Ask in chat, listing each doubt with the page and the sentence.
Doubts about one page don't block syncing another.

## Procedure

1. **Find what changed.** `rows` lists every row. For each row with a bound
   MDX, compare its `lastEdited` against `notionSynced`. The API rounds
   `lastEdited` down to the minute, so treat a row as changed when
   `lastEdited` is at or after the minute of `notionSynced`; the worst case
   is a re-sync that changes nothing. Rows with no bound MDX are new content. Rows
   with `Status` other than Ready/Published are drafts: read them, don't
   publish them (a post gets `draft: true`). Also compare every post's
   `Work` with its `work` frontmatter, whatever the timestamps say: a link
   added from a project's `Writing` column changes the post's `Work`
   without moving its last-edited time.
2. **Read comments.** `comments <id>` returns the unresolved threads on a
   page and every block in it, each with the text it anchors to. Check
   every row, not just the changed ones. Unresolved threads are the queue;
   your own earlier sync notes are not.
3. **Translate** (see below) and write the MDX. Stamp `notionSynced` with
   the current UTC time, after the run's last Notion write. Run `node_modules/.bin/tsc --noEmit` and `next build`.
4. **Reply in-thread** on every comment you acted on, saying what changed.
   Valerio resolves; you can't. If a comment asks a question, answer it in
   the thread.
5. **Report** in chat: pages synced, comments handled, doubts raised.

## Translation

- **Headings start at `#`.** The page renders the title outside the body, so the body is its own document: top-level sections are `#`, then `##`, `###`. Never `##` for a top-level section. (Rule set 2026-09-15.)
- Paragraphs, headings (Notion Heading 1–3 → `#`–`###`, 1:1), lists, quotes, code
  blocks (keep the language), tables, dividers: straight to Markdown.
- **Code languages.** Notion renames fences on save. Map them back so the
  MDX keeps its short names: `typescript` → `ts`, `javascript` → `js`,
  `plain text` → `text`, `shell` → `bash`, and a `json` block with `//`
  comments or trailing commas → `jsonc`.
- **Signs.** `{{ ... }}` in the prose is a message to you, never content.
  Notion returns them escaped (`\{\{ ... \}\}`); unescape first. Three
  families, agreed 2026-09-15:
  - `{{ note: ... }}` — context for you. Read it, act on it, drop it.
  - `{{ todo: ... }}` — write this. Draft it in Valerio's voice from the
    brief he gives (ask for the brief if the sign doesn't carry one), write
    the result INTO THE NOTION PAGE in place of the sign, then sync. Never
    invent product facts; never let internal material (names, dates,
    roadmap, partners, GTM) into the prose even in a draft.
  - Widgets and pills, replaced by components on sync:
    - `{{widget raycash-product}}` → `<RaycashProduct />`
    - `{{widget payment-link-flow}}` → `<PaymentLinkFlow />`
    - `{{widget agent-money-loop}}` → `<AgentMoneyLoop />`
    - `{{widget decoy-dial}}` → `<DecoyDial />`
    - `{{diagram crowd}}` → `<figure className="my-8"><CrowdDiagram /></figure>`;
      `{{diagram crowd: <caption>}}` adds
      `<figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground"><caption></figcaption>`
    - `{{pill <slug>}}` → `<WorkPill slug="<slug>" label="<Title>" />` inline
    - `{{note-margin: text}}` → the filigrana margin annotation (see /work)
  - Anything you can't classify → **stop and ask**. A sign that reaches MDX
    unresolved breaks the build (MDX reads `{{` as an expression); that is
    the safety net, not a failure mode.
- **Links.** `https://valeriohq.com/...` → relative (`/work/...`,
  `/writing/...`). External links unchanged.
- **Punctuation.** Notion auto-inserts em dashes from `--` and curls
  quotes. Valerio's rule is no em dashes: convert to his punctuation
  (comma, period, colon, parentheses by fit). Straight quotes in code only;
  prose keeps typographic apostrophes (’).
- **Images.** Notion file URLs expire within an hour. Download each image
  into `public/images/<slug>/` with a descriptive file name, scaled to
  1200px wide and stripped of EXIF (it can carry GPS), and reference the
  local path, never the Notion URL. The Notion caption is the site's alt
  text. An image without one: describe only what is visible, write it into
  Notion with `caption`, and say so in the report.
- **Frontmatter** comes from properties, never from the body. Fields the
  properties don't carry (`interactive`, `featured`, `order`, `stack`,
  `link`, `repo`, `linkLabel`, `kind`, `tier`, `year`, `role`) are
  repo-owned: keep the existing values.
- **Blocks with no site equivalent** (callout, toggle, columns, synced
  block, embed) → stop and ask.
- Hard-wrap the resulting prose at ~78 characters like the neighbouring
  files.

## Reverse direction (seeding MDX → Notion)

When a repo-first piece needs a Notion page: unwrap hard-wrapped paragraphs
into single lines (Notion makes a block per line), components → signs,
relative links → full `https://valeriohq.com` URLs, escape `{ } [ ] < > | ^
$ * ~ \`` outside code, set properties from frontmatter, create the row
to get its page id, then write `notion` and
`notionSynced` into the MDX.

`python3 .claude/skills/sync-notion/mdx2notion.py <file.mdx>` prints the
body in Notion markdown and does all of the above. MDX comments become
`{{ note: … }}` signs; a component it doesn't know stops it. Pipe
`{properties, markdown}` into `notion.mjs create`. Set `Work` to the project
rows' page ids, so seed projects before the posts that name them.
Stamp `notionSynced` only after the last Notion write of the run: every
direct property edit moves a page's last-edited time.

## What the confidential wall still means

Notion is private; drafts may say anything. The public-site wall applies at
sync time exactly as it does to any other content.
