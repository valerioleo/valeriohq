import Link from "next/link"

import { formatDate } from "@/lib/utils"

type Post = {
  url: string
  title: string
  date: string
  description?: string
}

export function PostList({
  posts,
  descriptions = false,
}: {
  posts: Post[]
  descriptions?: boolean
}) {
  return (
    <ul className="group/list">
      {posts.map((post) => (
        <li key={post.url}>
          <Link
            href={post.url}
            className="group flex flex-col gap-0.5 py-2.5 opacity-100 transition-opacity duration-150 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:group-hover/list:opacity-30 sm:hover:!opacity-100"
          >
            <span className="min-w-0 transition-colors group-hover:text-brand">
              {post.title}
            </span>
            <time
              dateTime={post.date}
              className="shrink-0 text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
          </Link>
          {descriptions && post.description && (
            <p className="-mt-1 mb-2.5 text-muted-foreground">
              {post.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
