import Link from "next/link"
import type { Metadata } from "next"
import { allPosts } from "content-collections"

import { formatDate } from "@/lib/utils"

// The design frontier's front door. Every draft post — the sample essays that
// exercise the prose styles, and the demo showcase where new widgets are
// tried — is reachable but unlisted, and this page is the one place that
// lists them so nobody has to remember URLs. Deliberately kept out of the
// nav, the sitemap and search engines; it exists for whoever is building the
// site, not for readers.
export const metadata: Metadata = {
  title: "Sandbox",
  robots: { index: false, follow: false },
}

export default function SandboxPage() {
  const drafts = allPosts
    .filter((p) => p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="pb-8 pt-10">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
          Sandbox
        </h1>
        <p className="mt-3 max-w-[54ch] font-serif italic leading-relaxed text-muted-foreground">
          The design frontier. Unlisted drafts and demo pages where new
          patterns get tried before they ship in a real writeup. Not linked
          from anywhere, not indexed.
        </p>
      </header>

      <ul className="mt-10 divide-y divide-border/70">
        {drafts.map((post) => (
          <li key={post.url}>
            <Link
              href={post.url}
              className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="font-serif transition-colors group-hover:text-brand">
                {post.interactive && (
                  <span
                    aria-hidden
                    className="mr-2 inline-block size-1.5 -translate-y-[0.15em] rounded-full bg-brand/70"
                  />
                )}
                {post.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.interactive && (
                  <>
                    <span aria-hidden> · </span>
                    interactive
                  </>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {drafts.length === 0 && (
        <p className="mt-10 font-mono text-xs text-muted-foreground">
          Nothing in the sandbox right now.
        </p>
      )}
    </div>
  )
}
