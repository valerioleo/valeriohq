# valeriohq.com — conventions

## Content (`content/**/*.mdx`)

- **Body headings start at `#`.** Pages render the title outside the MDX
  body, so the body is its own document: top-level sections are `#`, then
  `##`, `###`. Never `##` for a top-level section. `.prose h1` is styled at
  page-title size for exactly this.
- **Notion is the source of truth for prose.** Entries bound with `notion:`
  in frontmatter sync from the Notion `CMS` database via the `sync-notion`
  skill. Never change bound prose in the repo without the same change in
  Notion.
- **No em dashes in prose.** Commas, periods, colons, parentheses.
- Hard-wrap prose at ~78 characters like neighbouring files.
- X articles come in through the `import-x-article` skill.

## Article illustrations and animation

Use **animated interface diagrams** as the default style for explanatory
article visuals. The reference is the simple UI demonstrations on
[Benji Taylor's Agentation page](https://benji.org/agentation): quiet,
skeleton-like interfaces that make an action and its consequence obvious.

**Abstract the surroundings; keep the important behavior explicit.**
Skeleton-like means selectively simplified UI, not a loading state. A reader
should understand the idea through a few familiar components and one clear
sequence. Use a static diagram in the same style when motion adds no meaning.

### Visual language

- Build scenes from a small, consistent vocabulary: windows, rows, fields,
  buttons, notes, status indicators, selections, and an occasional cursor.
  Include only the components the explanation needs. Do not invent a whole
  dashboard to explain one action.
- Render incidental content as muted bars or simple shapes. Use real, short
  labels for the important amount, action, object, or result. Essential
  information must never be an unreadable placeholder.
- Reuse the site's tokens in `styles/globals.css`: warm paper and ink in light
  mode, deep teal in dark mode, and the rust/apricot `--brand` accent. Keep
  most of the scene neutral; reserve the accent for the current focus or
  meaningful change. Do not copy the reference's blue branding.
- Use thin borders, restrained corners, consistent spacing and stroke
  weights, and generous empty space. Reuse the site's sans and mono fonts.
  Let diagrams breathe between paragraphs; keep labels legible on mobile.
- No decorative colored left borders, including on callouts or cards.
  Avoid ornamental gradients, glows, heavy shadows, loading shimmer, and
  decorative particles in these diagrams.
- Preserve the existing inline bubbles with brand logos. They are a separate,
  memorable part of the site's identity; this style complements them.

### Motion and storytelling

- Explain one idea per sequence. Sketch three states before implementing:
  **establish the scene → perform one action → hold the result**. The result
  should remain visible long enough to read and understand.
- Motion must explain cause and effect: a selection, a transfer, a state
  change, or feedback returning to an earlier step. Keep one focus at a time.
  Use a cursor only when a person's action is part of the explanation.
- Favor short movements, gentle easing, and deliberate pauses. Avoid springy
  entrances, constant pulsing, rapid typing, and several simultaneous actions.
- Default to playing once when visible, then resting on a meaningful result,
  with a discreet **Replay** button. Avoid endless loops while people read.
  Provide pause for longer sequences and suspend work while offscreen.
- Respect `prefers-reduced-motion`: show a meaningful still state or provide
  manual steps. Never replace the explanation with a blank or unfinished UI.
- Add a short caption that communicates the takeaway without requiring the
  animation. Use text or shape as well as color to distinguish states.

### Implementation

- Use real HTML/React components and SVG, with CSS for motion. Keep JavaScript
  for sequence state, visibility, and controls. These should stay crisp,
  responsive, and theme-aware; avoid GIFs, videos, or generated bitmap UIs as
  the default implementation. Do not add an animation library unnecessarily.
- Follow the existing `components/demos/` structure, reuse shared primitives
  where useful, and register MDX components in `components/mdx-components.tsx`.
  Reuse the visual vocabulary across articles, not an identical composition.
- Decorative mock controls and cursors must not create fake keyboard targets.
  Actual replay, pause, or step controls must be keyboard accessible and
  clearly labeled. Keep the explanation available to assistive technology
  without announcing every animation frame.
- Verify light and dark themes, narrow screens, replay behavior, and reduced
  motion. Avoid layout shifts as the sequence advances.
- Keep every transition faithful to the article. Simplification must not
  invent product behavior, security guarantees, or quantitative claims.

### Example storyboards

- **Payment links:** enter an amount → create and share a link → the recipient
  opens it and claims the funds. Keep unrelated app content abstract.
- **Deployoor:** deploy a contract → produce a typed contract object → show
  the app and tests consuming it.
- **Deposit privacy:** show a public deposit → introduce a group of notes →
  explain which relationships an observer can see. Label the observer's view
  explicitly and preserve the article's privacy caveats.
- **AI orchestration:** a task receives context and tools → a change is
  produced → a check returns feedback. Make the feedback path tangible.

The quality bar: a reader can describe what changed and why it matters after
one viewing, and still understand the takeaway with animation disabled.

## When unsure about content

Stop and ask. Unknown `{{ sign }}`, ambiguous edit or comment, a claim that
looks off, a block with no site equivalent: ask before writing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
