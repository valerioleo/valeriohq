import Link from "next/link"

import { cn } from "@/lib/utils"
import { BrandIcon } from "@/components/project-logo"
import { ROW, ROW_TITLE, ROWS } from "@/components/rows"

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
          {/* The icon fades with its row; a brand mark carries no text, so
              it can drop further than the title does. */}
          <BrandIcon
            slug={project.slug}
            className="mt-px size-[18px] transition-opacity sm:group-hover/list:opacity-50 group-hover:!opacity-100"
          />
          <span className="flex min-w-0 flex-wrap gap-x-3">
            <span className={ROW_TITLE}>{project.title}</span>
            {project.summary && (
              <span className="text-muted-foreground">{project.summary}</span>
            )}
          </span>
        </Link>
      </li>
    ))}
  </ul>
)
