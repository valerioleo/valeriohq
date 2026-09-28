import Link from "next/link"

import { cn } from "@/lib/utils"
import { BrandIcon } from "@/components/project-logo"
import { ROW, ROWS } from "@/components/rows"

type Item = {
  url: string
  slug: string
  title: string
  summary?: string
}

// Icon, name, and the few words that place it. The summary wraps under the
// name on narrow screens rather than squeezing it.
export const WorkList = ({ projects }: { projects: Item[] }) => (
  <ul className={ROWS}>
    {projects.map(project => (
      <li key={project.url}>
        <Link href={project.url} className={cn(ROW, "flex items-start gap-2.5")}>
          <BrandIcon slug={project.slug} className="mt-px size-[18px]" />
          <span className="flex min-w-0 flex-wrap gap-x-3">
            <span className="transition-colors group-hover:text-brand">
              {project.title}
            </span>
            {project.summary && (
              <span className="text-muted-foreground">{project.summary}</span>
            )}
          </span>
        </Link>
      </li>
    ))}
  </ul>
)
