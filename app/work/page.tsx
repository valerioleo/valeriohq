import Link from "next/link"
import type { Metadata } from "next"
import { allProjects } from "content-collections"
import { Code, Globe } from "lucide-react"

import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Work",
  description: "Shipped products, protocols, and open source.",
}

// The Work page reads like `ls ~/` — grouped by intent, each entry prefixed
// with a terminal path mark. Openness is shown by the source icon, not by a
// separate section. Empty groups (e.g. no experiments yet) simply don't render.
type Kind = "product" | "tool" | "experiment" | "role"

const GROUPS: { kind: Kind; label: string }[] = [
  { kind: "product", label: "products & protocols" },
  { kind: "tool", label: "open source & tools" },
  { kind: "experiment", label: "experiments" },
  { kind: "role", label: "roles" },
]

export default function WorkPage() {
  const byOrder = (a: { order?: number }, b: { order?: number }) =>
    (a.order ?? 99) - (b.order ?? 99)

  const tier1 = allProjects.filter((p) => p.tier === 1)
  const mentions = allProjects.filter((p) => p.tier === 2).sort(byOrder)

  return (
    <div className="pb-8 pt-10">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
          Work
        </h1>
        <p className="mt-3 max-w-[54ch] font-serif italic leading-relaxed text-muted-foreground">
          Things I&apos;ve built — products I stand behind, tools I keep
          reaching for, and the odd experiment. Most of the code is public, so
          you can check rather than take my word for it.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-14">
        {GROUPS.map(({ kind, label }) => {
          const group = tier1.filter((p) => p.kind === kind).sort(byOrder)
          if (group.length === 0) return null
          return (
            <section
              key={kind}
              id={kind === "experiment" ? "experiments" : undefined}
              className={kind === "experiment" ? "scroll-mt-8" : undefined}
            >
              <div className="flex items-baseline gap-4">
                <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
                  {label}
                </h2>
                <div
                  aria-hidden
                  className="h-px flex-1 self-center bg-border/70"
                />
              </div>

              <ul className="mt-4 flex flex-col divide-y divide-border/70">
                {group.map((project) => {
                  // Tools & experiments get the terminal register: monospace,
                  // prefixed with ~/ (no space). Products & roles stay in the
                  // editorial serif.
                  const terminal =
                    project.kind === "tool" || project.kind === "experiment"
                  return (
                    <li key={project.url} className="py-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3
                          className={cn(
                            "flex items-center gap-2.5 font-medium",
                            terminal
                              ? "font-mono text-sm"
                              : "font-serif text-lg"
                          )}
                        >
                          <Link
                            href={project.url}
                            className="transition-colors hover:text-brand"
                          >
                            {terminal && (
                              <span aria-hidden className="text-brand/70">
                                ~/
                              </span>
                            )}
                            {project.title}
                          </Link>
                          {/* Outbound links as icons; the title already goes to
                              the detail page, so these are the only text-free
                              links. */}
                          <span className="flex items-center gap-2">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title}: ${project.linkLabel ?? "website"}`}
                                title={project.linkLabel ?? "Website"}
                                className="text-muted-foreground transition-colors hover:text-brand"
                              >
                                <Globe className="size-[14px]" />
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
                                <Code className="size-[14px]" />
                              </a>
                            )}
                          </span>
                        </h3>
                        {project.year && (
                          <span className="shrink-0 font-mono text-xs text-muted-foreground">
                            {project.year}
                          </span>
                        )}
                      </div>

                      {project.description && (
                        <p className="mt-2 max-w-[60ch] font-sans text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      {/* Second tier: mentions only. No detail pages, so no internal links —
          the name links out when there's somewhere to send people. */}
      {mentions.length > 0 && (
        <section className="mt-16">
          <div className="flex items-baseline gap-4">
            <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
              also
            </h2>
            <div aria-hidden className="h-px flex-1 self-center bg-border/70" />
          </div>

          <ul className="mt-5 flex flex-col gap-4">
            {mentions.map((m) => (
              <li
                key={m.slug}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <p className="font-sans text-sm leading-relaxed">
                  {m.link ? (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif transition-colors hover:text-brand"
                    >
                      {m.title} ↗
                    </a>
                  ) : (
                    <span className="font-serif">{m.title}</span>
                  )}
                  {m.description && (
                    <span className="text-muted-foreground">
                      {". "}
                      {m.description}
                    </span>
                  )}
                </p>
                {m.year && (
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {m.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
