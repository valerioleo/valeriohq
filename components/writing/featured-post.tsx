import Link from "next/link"

type Post = {
  url: string
  title: string
  description?: string
}

// The full interactive explanation lives in the article, with its context.
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      className="group mb-8 block"
    >
      <h3 className="font-serif text-xl leading-snug transition-colors group-hover:text-brand">
        {post.title}
        <span aria-hidden className="ml-2 inline-block text-base text-brand">→</span>
      </h3>
      {post.description && (
        <p className="mt-3 max-w-[60ch] font-sans text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      )}
    </Link>
  )
}
