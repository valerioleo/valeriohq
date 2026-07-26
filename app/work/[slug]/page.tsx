import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allProjects } from "content-collections"
import { Code, Globe } from "lucide-react"

import { Mdx } from "@/components/mdx-components"
import { ProjectLogo } from "@/components/project-logo"

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = allProjects.find((p) => p.slug === slug)
  if (!project || project.tier === 2) notFound()

  return (
    <article className="py-10">
      <header>
        <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted-foreground">
          {project.role ? <span>{project.role}</span> : <span />}
          {project.year && <span className="shrink-0">{project.year}</span>}
        </div>
        <h1 className="mt-3 flex items-center gap-3 font-serif text-3xl font-medium leading-[1.2] tracking-[-0.01em] sm:text-[2.125rem]">
          <ProjectLogo
            slug={project.slug}
            className="h-[0.72em] w-auto shrink-0 text-brand"
          />
          {project.title}
        </h1>
        {project.description && (
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}
        {(project.link || project.repo) && (
          <div className="mt-5 flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title}: ${project.linkLabel ?? "website"}`}
                title={project.linkLabel ?? "Website"}
                className="text-muted-foreground transition-colors hover:text-brand"
              >
                <Globe className="size-[18px]" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                title="Source"
                className="text-muted-foreground transition-colors hover:text-brand"
              >
                <Code className="size-[18px]" />
              </a>
            )}
          </div>
        )}
        <hr className="mb-10 mt-8 w-10 border-t border-brand/50" />
      </header>

      <div className="prose max-w-none">
        <Mdx code={project.mdx} />
      </div>

      <footer className="mt-14">
        <p className="font-mono text-xs">
          <Link
            href="/work"
            className="text-muted-foreground transition-colors hover:text-brand"
          >
            ← work
          </Link>
        </p>
      </footer>
    </article>
  )
}
