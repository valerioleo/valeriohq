import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { postTeasers } from "@/components/demos/post-media"

type Item = {
  slug: string
  url: string
  title: string
  description?: string
  date: string
}

// The one interactive writeup the homepage surfaces as more than a title: a
// card carrying a live, touchable teaser. Posts register a teaser in
// post-media.tsx; without one the card still reads fine as text. The
// "interactive" eyebrow is the only place the word appears, since the card
// now lives inside the writing section.
export function FeaturedInteractive({ post }: { post: Item }) {
  const Teaser = postTeasers[post.slug]

  return (
    <div className="rounded-lg border border-border/70 bg-muted/30 p-5">
      <div className="flex items-center gap-2">
        <span aria-hidden className="size-1.5 rounded-full bg-brand/70" />
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          interactive
        </span>
        <time
          dateTime={post.date}
          className="ml-auto font-mono text-xs text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <Link href={post.url} className="group">
            <h3 className="font-serif text-lg transition-colors group-hover:text-brand">
              {post.title}
            </h3>
          </Link>
          {post.description && (
            <p className="mt-1 max-w-[46ch] font-sans text-sm text-muted-foreground">
              {post.description}
            </p>
          )}
          <Link
            href={post.url}
            className="mt-3 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            read the writeup →
          </Link>
        </div>
        {Teaser && (
          <div className="w-full sm:w-52">
            <Teaser />
          </div>
        )}
      </div>
    </div>
  )
}
