---
name: import-x-article
description: Import an X (Twitter) Article into content/posts as MDX, with code blocks intact. Use when the user gives an x.com article URL to port, syndicate, or pull onto the site.
---

# Import an X Article

Turns `https://x.com/<handle>/article/<id>` into a ready `content/posts/<slug>.mdx`.

## Use Xquik, not ReadX

**ReadX (`readx.sh`) silently drops every code block and image.** It returns them
as empty `atomic` placeholders with no entity map:

```json
{"type":"atomic","text":" ","entityRanges":[{"key":3}]}
```

A code-heavy post imported from ReadX looks complete and is missing the part
that matters. Use **Xquik**, which resolves them into real `markdown` blocks:

```
https://xquik.com/api/v1/x/articles/<tweetId>
```

$0.0008/article via MPP, no API key, no X session cookie. (ReadX is $0.01 and
worse; `x402.twit.sh` is deprecated; the free routes — fxtwitter, the
syndication CDN — return an empty body for Articles and are useless here.)

## Steps

1. Take the numeric id from the URL. `x.com/valerioHQ/article/2087905625044852813`
   → `2087905625044852813`. Both the `/article/` and `/status/` forms work.

2. Fetch it with the **agentcash** MCP `fetch` tool:

   ```
   url: https://xquik.com/api/v1/x/articles/<id>
   maxAmount: 0.25
   ```

3. Pipe the JSON body through the converter:

   ```bash
   node scripts/import-x-article.mjs "<the original x.com URL>" \
     < article.json > content/posts/<slug>.mdx
   ```

   It emits frontmatter (`title`, `description`, `date`, `canonical`,
   `sourceLabel: X`), hard-wraps prose at 78 chars, keeps lists tight, applies
   bold/italic ranges, and passes fenced code and tables through untouched. It
   prints the suggested slug, the cover URL, and a code-block count to stderr.

4. **Check code-block placement.** Xquik returns the right *set* of code blocks
   but its *ordering* drifts — a block can land under the wrong paragraph. Each
   one belongs under the nearest preceding paragraph ending in `:`. Match them
   up against the live article; the lead-in sentence always makes it obvious.

5. Apply house style, matching neighbouring posts in `content/posts/`:
   - `@mentions` → internal links: `@zama` → `[Zama](/work/zama)`,
     Raycash → `/work/raycash`, deployoor → `/work/deployoor`
   - Cross-link related posts (part 1 ↔ part 2)
   - Tag code fences by real language (`solidity`, `ts`, `bash`, `jsonc`) —
     X often mislabels everything `javascript`
   - Fix obvious typos, and tell the user which ones you changed

6. Run `pnpm build` to confirm the MDX compiles.

## Don't invent missing blocks

If a block still can't be recovered, leave a marked comment rather than writing
plausible code — these posts go out under Valerio's name and describe real
systems:

```mdx
{/* TODO(port): snippet from the X article — <what belongs here>. */}
```

For open-source subjects the real snippets are usually in the repo README
(e.g. `raycashxyz/deployoor`), which is a better source than guessing. Raycash
contract internals are not public — ask rather than reconstruct.

## Better still: write here first

This whole path is a backfill. For new pieces, write the MDX in
`content/posts/` first and publish *from* the site to X (see the
`write-x-article` skill). The code blocks never leave the repo, nothing needs
recovering, and the canonical lives on the site.
