import Link from "next/link"

import { formatDate } from "@/lib/utils"

type Post = {
  url: string
  title: string
  date: string
  description?: string
  readingTime: number
}

export function PostList({
  posts,
  descriptions = false,
}: {
  posts: Post[]
  descriptions?: boolean
}) {
  return (
    <ul className="divide-y divide-border/70">
      {posts.map((post) => (
        <li key={post.url}>
          <Link
            href={post.url}
            className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div className="min-w-0">
              <span className="font-serif text-[1.0625rem] leading-relaxed transition-colors group-hover:text-brand">
                {post.title}
              </span>
              {descriptions && post.description && (
                <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              )}
            </div>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {descriptions && (
                <span className="sm:mt-1 sm:block sm:text-right">
                  <span aria-hidden className="sm:hidden"> · </span>
                  {post.readingTime} min read
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
