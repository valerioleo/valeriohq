import Link from "next/link"
import type { Metadata } from "next"
import { allPosts } from "content-collections"

import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on confidential money, applied cryptography, and building in the open.",
}

export default function WritingPage() {
  const posts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="pb-8 pt-10">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
          Writing
        </h1>
        <p className="mt-3 max-w-[54ch] font-serif italic leading-relaxed text-muted-foreground">
          Notes on confidential money, applied cryptography, and building in
          the open.
        </p>
      </header>

      <ul className="mt-10">
        {posts.map((post) => (
          <li key={post.url}>
            <Link
              href={post.url}
              className="group flex flex-col gap-1 border-b border-border/70 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="font-serif transition-colors group-hover:text-brand">
                {post.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden> · </span>
                {post.readingTime} min
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
