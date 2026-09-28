import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts, allProjects } from "content-collections"

import { relatedWriting } from "@/lib/writing"
import { Mdx } from "@/components/mdx-components"
import { META_LINK, PageMeta } from "@/components/page-meta"
import { BrandIcon } from "@/components/project-logo"
import { Section } from "@/components/section"
import { PostList } from "@/components/writing/post-list"

interface Props {
  params: Promise<{ slug: string }>
}

// Tier-2 entries are mentions on /work only — they get no page of their own.
export function generateStaticParams() {
  return allProjects
    .filter((project) => project.tier === 1)
    .map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "")

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project || project.tier === 2) notFound()
  const writing = relatedWriting(project.slug, allPosts)

  return (
    <div className="py-10">
      <article>
        <header>
          {/* The original brand disc, as on the pills and lists — never a
              recoloured mark. */}
          <h1 className="flex items-center gap-2 text-[1.1875rem] font-medium tracking-[-0.01875rem]">
            <BrandIcon slug={project.slug} className="size-5 shrink-0" />
            {project.title}
          </h1>
          {(project.link || project.repo) && (
            <PageMeta>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={META_LINK}
                >
                  {(project.linkLabel ?? host(project.link)).toLowerCase()} ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={META_LINK}
                >
                  source ↗
                </a>
              )}
            </PageMeta>
          )}
        </header>

        <div className="prose mt-8 max-w-none">
          <Mdx code={project.mdx} />
        </div>
      </article>

      {writing.length > 0 && (
        <Section title="related writing">
          <PostList posts={writing} />
        </Section>
      )}
    </div>
  )
}
