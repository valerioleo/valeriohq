import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts } from "content-collections"

import { Mdx } from "@/components/mdx-components"
import { formatDate } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    // Point search engines at the original when this was published elsewhere.
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <article className="py-10">
      <header>
        <div className="font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden> · </span>
          <span>{post.readingTime} min</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-medium leading-[1.2] tracking-[-0.01em] sm:text-[2.125rem]">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        )}
        {post.canonical && (
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Originally on{" "}
            <a
              href={post.canonical}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              {post.sourceLabel ?? "X"} ↗
            </a>
          </p>
        )}
        <hr className="mb-10 mt-8 w-10 border-t border-brand/50" />
      </header>

      <div className="prose max-w-none">
        <Mdx code={post.mdx} />
      </div>

      <footer className="mt-14">
        <p
          aria-hidden
          className="text-center font-serif text-muted-foreground/80"
        >
          ⁂
        </p>
        <p className="mt-8 font-mono text-xs">
          <Link
            href="/writing"
            className="text-muted-foreground transition-colors hover:text-brand"
          >
            ← writing
          </Link>
        </p>
      </footer>
    </article>
  )
}
