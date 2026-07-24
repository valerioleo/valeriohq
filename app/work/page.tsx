import Link from "next/link"
import type { Metadata } from "next"
import { allProjects } from "content-collections"

import { ProjectLogo } from "@/components/project-logo"

export const metadata: Metadata = {
  title: "Work",
  description: "Shipped products, protocols, and open source.",
}

export default function WorkPage() {
  const byOrder = (a: { order?: number }, b: { order?: number }) =>
    (a.order ?? 99) - (b.order ?? 99)

  const projects = allProjects.filter((p) => p.tier === 1).sort(byOrder)
  const mentions = allProjects.filter((p) => p.tier === 2).sort(byOrder)

  return (
    <div className="pb-8 pt-10">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
          Work
        </h1>
        <p className="mt-3 max-w-[54ch] font-serif italic leading-relaxed text-muted-foreground">
          Things I&apos;ve built. Most of the code is public, so you can check
          rather than take my word for it.
        </p>
      </header>

      <ul className="mt-10 flex flex-col gap-10">
        {projects.map((project) => (
          <li key={project.url}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="flex items-center gap-2.5 font-serif text-lg font-medium">
                {/* Brand mark in the current ink, sized to the cap height. */}
                <ProjectLogo
                  slug={project.slug}
                  className="h-[0.8em] w-auto shrink-0 text-muted-foreground"
                />
                <Link
                  href={project.url}
                  className="transition-colors hover:text-brand"
                >
                  {project.title}
                </Link>
              </h2>
              {project.year && (
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              )}
            </div>

            {project.description && (
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            )}

            {project.stack && project.stack.length > 0 && (
              <p className="mt-2.5 font-mono text-xs text-muted-foreground/90">
                {project.stack.join(" · ")}
              </p>
            )}

            <div className="mt-3 flex gap-5 font-mono text-xs">
              <Link
                href={project.url}
                className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
              >
                details
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  live ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  source ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

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
