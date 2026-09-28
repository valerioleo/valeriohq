import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts, allProjects } from "content-collections"

import { relatedWork } from "@/lib/work"
import { formatDate } from "@/lib/utils"
import { Mdx } from "@/components/mdx-components"
import { META_LINK, PageMeta } from "@/components/page-meta"
import { Section } from "@/components/section"
import { WorkList } from "@/components/work/work-list"

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
  const work = relatedWork(post.work ?? [], allProjects)

  return (
    <div className="py-10">
      <article>
        <header>
          <h1 className="text-[1.1875rem] font-medium tracking-[-0.01875rem]">
            {post.title}
          </h1>
          <PageMeta>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.canonical && (
              <a
                href={post.canonical}
                target="_blank"
                rel="noopener noreferrer"
                className={META_LINK}
              >
                Originally on {post.sourceLabel ?? "X"} ↗
              </a>
            )}
          </PageMeta>
        </header>

        <div className="prose mt-8 max-w-none">
          <Mdx code={post.mdx} />
        </div>
      </article>

      {work.length > 0 && (
        <Section title="related work">
          <WorkList projects={work} />
        </Section>
      )}
    </div>
  )
}
