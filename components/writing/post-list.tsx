import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"
import { ROW, ROWS } from "@/components/rows"

type Post = {
  url: string
  title: string
  date: string
}

export const PostList = ({ posts }: { posts: Post[] }) => (
  <ul className={ROWS}>
    {posts.map(post => (
      <li key={post.url}>
        <Link
          href={post.url}
          className={cn(
            ROW,
            "flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          )}
        >
          <span className="min-w-0 transition-colors group-hover:text-brand">
            {post.title}
          </span>
          <time
            dateTime={post.date}
            className="shrink-0 font-mono text-xs text-muted-foreground"
          >
            {formatDate(post.date)}
          </time>
        </Link>
      </li>
    ))}
  </ul>
)
