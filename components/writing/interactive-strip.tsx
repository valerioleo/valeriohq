import Link from "next/link"

import { formatDate } from "@/lib/utils"
import {
  postTeasers,
  postPosters,
  DefaultPoster,
} from "@/components/demos/post-media"

type Item = {
  slug: string
  url: string
  title: string
  description?: string
  date: string
  featured?: boolean
}

// The homepage "interactive" strip. The featured post gets a live, touchable
// teaser (variant C); the rest are poster cards (variant B). Falls back
// gracefully: one interactive post → just the teaser; none → nothing.
export function InteractiveStrip({ posts }: { posts: Item[] }) {
  if (posts.length === 0) return null

  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)
  const Teaser = postTeasers[featured.slug]

  return (
    <div className="flex flex-col gap-4">
      {/* Featured — live teaser (C) */}
      <div className="rounded-lg border border-border/70 bg-muted/30 p-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-brand/70" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            interactive
          </span>
          <time className="ml-auto font-mono text-xs text-muted-foreground">
            {formatDate(featured.date)}
          </time>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <Link href={featured.url} className="group">
              <h3 className="font-serif text-lg transition-colors group-hover:text-brand">
                {featured.title}
              </h3>
            </Link>
            {featured.description && (
              <p className="mt-1 max-w-[46ch] font-sans text-sm text-muted-foreground">
                {featured.description}
              </p>
            )}
            <Link
              href={featured.url}
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

      {/* The rest — poster cards (B) */}
      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((p) => {
            const Poster = postPosters[p.slug] ?? DefaultPoster
            return (
              <Link
                key={p.slug}
                href={p.url}
                className="group rounded-lg border border-border/70 bg-muted/30 p-4 transition-colors hover:border-brand/40"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-brand/70"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    interactive
                  </span>
                  <time className="ml-auto font-mono text-xs text-muted-foreground">
                    {formatDate(p.date)}
                  </time>
                </div>
                <div className="mt-3 flex min-h-[48px] items-center justify-center">
                  <Poster />
                </div>
                <h4 className="mt-3 font-serif transition-colors group-hover:text-brand">
                  {p.title}
                </h4>
                {p.description && (
                  <p className="mt-1 font-sans text-sm text-muted-foreground">
                    {p.description}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
