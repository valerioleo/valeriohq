import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts } from "content-collections"

import { Mdx } from "@/components/mdx-components"
import { META_LINK, MetaDot, PageMeta } from "@/components/page-meta"
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
        <h1 className="text-[1.1875rem] font-medium tracking-[-0.01875rem]">
          {post.title}
        </h1>
        <PageMeta>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.canonical && (
            <>
              <MetaDot />
              <a
                href={post.canonical}
                target="_blank"
                rel="noopener noreferrer"
                className={META_LINK}
              >
                Originally on {post.sourceLabel ?? "X"} ↗
              </a>
            </>
          )}
        </PageMeta>
        {post.description && (
          <p className="mt-4 text-muted-foreground">{post.description}</p>
        )}
      </header>

      <div className="prose mt-8 max-w-none">
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
