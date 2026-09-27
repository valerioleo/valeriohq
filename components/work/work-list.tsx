import Link from "next/link"

import { BrandIcon } from "@/components/project-logo"

type Item = {
  url: string
  slug: string
  title: string
  description?: string
}

export function WorkList({ projects }: { projects: Item[] }) {
  return (
    <ul className="divide-y divide-border/70">
      {projects.map((project) => (
        <li key={project.url} className="py-3.5 first:pt-0">
          <Link href={project.url} className="group block">
            <span className="inline-flex items-center gap-2 transition-colors group-hover:text-brand">
              <BrandIcon slug={project.slug} className="size-[max(1.15em,18px)]" />
              {project.title}
            </span>
            {project.description && (
              <span className="mt-1.5 block text-muted-foreground">
                {project.description}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
