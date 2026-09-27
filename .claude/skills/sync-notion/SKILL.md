---
name: sync-notion
description: Sync site content from the Notion CMS database into content/*.mdx and act on Notion comments. Use when Valerio says "sync Notion", "check Notion", or asks what changed in the CMS.
---

# Sync Notion → MDX

Notion is the source of truth for prose. MDX is generated from it. Never
change prose in the repo without making the same change in Notion.

## Where things are

- Database: `CMS` under the page "valeriohq.com" —
  https://app.notion.com/p/3db7c7c91f1f8046b7b0d49342dbb68c
- Data source: `collection://3db7c7c9-1f1f-80bb-9733-000bfae3237f`
- Properties = frontmatter: `Name` (title), `Slug`, `Kind` (post | project),
  `Status` (Draft → Review → Ready → Published), `Date`, `Description`,
  `Canonical`, `Source`.
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

1. **Find what changed.** Query the data source for all rows. For each row
   with a bound MDX, compare Notion's `page_last_edited_at` (from `fetch`)
   against `notionSynced`. Rows with no bound MDX are new content. Rows
   with `Status` other than Ready/Published are drafts: read them, don't
   publish them (a post gets `draft: true`).
2. **Read comments.** `fetch` with `include_discussions: true` shows where
   each thread anchors; `get-comments` with `include_all_blocks: true`
   returns the threads. Unresolved threads are the queue.
3. **Translate** (see below) and write the MDX. Stamp `notionSynced` with
   the fetch time. Run `node_modules/.bin/tsc --noEmit` and `next build`.
4. **Reply in-thread** on every comment you acted on, saying what changed.
   Valerio resolves; you can't. If a comment asks a question, answer it in
   the thread.
5. **Report** in chat: pages synced, comments handled, doubts raised.

## Translation

- **Headings start at `#`.** The page renders the title outside the body, so the body is its own document: top-level sections are `#`, then `##`, `###`. Never `##` for a top-level section. (Rule set 2026-09-15.)
- Paragraphs, headings (Notion Heading 1–3 → `#`–`###`, 1:1), lists, quotes, code
  blocks (keep the language), tables, dividers: straight to Markdown.
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
    - `{{diagram crowd}}` → `<figure className="my-8"><CrowdDiagram /></figure>`
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
  into `public/images/<slug>/`, reference the local path, never the Notion
  URL.
- **Frontmatter** comes from properties, never from the body. Fields the
  properties don't carry (`interactive`, `featured`, `order`, `stack`,
  `link`, `repo`, `linkLabel`, `kind`, `tier`) are repo-owned: keep the
  existing values.
- **Blocks with no site equivalent** (callout, toggle, columns, synced
  block, embed) → stop and ask.
- Hard-wrap the resulting prose at ~78 characters like the neighbouring
  files.

## Reverse direction (seeding MDX → Notion)

When a repo-first piece needs a Notion page: unwrap hard-wrapped paragraphs
into single lines (Notion makes a block per line), components → signs,
relative links → full `https://valeriohq.com` URLs, escape `{ } [ ] < > | ^
$ * ~ \`` outside code, set properties from frontmatter, create with
`allow_async: false` to get the page id, then write `notion` and
`notionSynced` into the MDX.

## What the confidential wall still means

Notion is private; drafts may say anything. The public-site wall applies at
sync time exactly as it does to any other content.
