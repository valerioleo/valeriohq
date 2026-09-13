import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import remarkGfm from "remark-gfm"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
import { z } from "zod"

// Syntax highlighting happens at build time (shiki) — zero client JS.
// Both themes are emitted per token; globals.css picks the right one.
const prettyCode: Options = {
  theme: { light: "vitesse-light", dark: "vitesse-dark" },
  keepBackground: false,
  defaultLang: "plaintext",
}

const mdxOptions: Parameters<typeof compileMDX>[2] = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [[rehypePrettyCode, prettyCode]],
}

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    draft: z.boolean().optional(),
    // Interactive demos live inside articles. `featured` selects the
    // homepage's reading recommendation independently of presentation.
    interactive: z.boolean().optional(),
    featured: z.boolean().optional(),
    // For pieces first published elsewhere (X, etc.). When set, the post
    // page shows a quiet "Originally on X" line and emits rel=canonical so
    // the original gets the search credit while readers get this design.
    canonical: z.string().url().optional(),
    sourceLabel: z.string().optional(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, mdxOptions)
    const slug = doc._meta.path
    const words = doc.content.trim().split(/\s+/).length
    const readingTime = Math.max(1, Math.round(words / 220))
    return { ...doc, slug, url: `/writing/${slug}`, mdx, readingTime }
  },
})

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    year: z.string().optional(),
    role: z.string().optional(),
    stack: z.array(z.string()).optional(),
    link: z.string().optional(),
    // What `link` actually points at, for the icon's tooltip and its
    // accessible name. Defaults to "Website"; set it when the link is
    // something else, e.g. a writeup.
    linkLabel: z.string().optional(),
    repo: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    // Groups the Work page by intent, not by license. "product" = shipped &
    // stood behind; "tool" = reusable open source; "experiment" = built to
    // learn or play; "role" = worked somewhere. Openness stays an attribute
    // (the source icon), never a category. Defaults to "product".
    kind: z.enum(["product", "tool", "experiment", "role"]).optional(),
    // 1 = a full entry with its own page (the work worth reading about).
    // 2 = a one-line mention only; no page is generated, so tier-2 entries
    //     must not be linked internally. Defaults to 1.
    tier: z.union([z.literal(1), z.literal(2)]).optional(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, mdxOptions)
    const slug = doc._meta.path
    const tier = doc.tier ?? 1
    const kind = doc.kind ?? "product"
    return { ...doc, slug, tier, kind, url: `/work/${slug}`, mdx }
  },
})

export default defineConfig({
  content: [posts, projects],
})
