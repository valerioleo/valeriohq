import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { siteConfig } from "@/lib/config"
import { cn, formatDate } from "@/lib/utils"
import { ProjectLogo, hasProjectLogo } from "@/components/project-logo"

// Sets the tagline's key clause in Literata italic. Falls back to the plain
// string if the configured emphasis no longer matches the copy.
function Tagline() {
  const { tagline, taglineEmphasis } = siteConfig
  const at = taglineEmphasis ? tagline.indexOf(taglineEmphasis) : -1
  if (at === -1) return <>{tagline}</>
  return (
    <>
      {tagline.slice(0, at)}
      <em>{taglineEmphasis}</em>
      {tagline.slice(at + taglineEmphasis.length)}
    </>
  )
}

export default function Home() {
  const posts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5)

  const projects = allProjects
    .filter((p) => p.featured && p.tier === 1)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className="pb-8 pt-14 sm:pt-20">
      {/* Hero */}
      <section>
        <h1 className="max-w-[26ch] font-serif text-[1.75rem] font-medium leading-[1.35] tracking-[-0.01em] sm:text-[2rem]">
          <Tagline />
        </h1>
        <p className="mt-5 font-sans text-sm text-muted-foreground">
          Founder of {siteConfig.company}, in {siteConfig.location}.
        </p>
      </section>

      {/* Writing */}
      <Section title="writing" href="/writing">
        <ul>
          {posts.map((post) => (
            <li key={post.url}>
              <Link
                href={post.url}
                className="group flex items-baseline justify-between gap-4 border-b border-border/70 py-3.5"
              >
                <span className="font-serif transition-colors group-hover:text-brand">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Selected work. Each one leads with its brand mark on a quiet banner,
          so the logos carry the section rather than a wall of text. */}
      <Section title="selected work" href="/work">
        <ul className="grid gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            // The lead project takes the full width, so the row below it
            // never leaves a hole when the count is odd.
            <li key={project.url} className={i === 0 ? "sm:col-span-2" : undefined}>
              <Link href={project.url} className="group block">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-md border border-border/70 bg-muted/40 px-6 transition-colors group-hover:border-brand/40 group-hover:bg-muted/70",
                    i === 0 ? "h-32" : "h-24"
                  )}
                >
                  {hasProjectLogo(project.slug) ? (
                    <ProjectLogo
                      slug={project.slug}
                      className={cn(
                        "text-foreground/75 transition-colors group-hover:text-foreground",
                        i === 0 ? "h-10" : "h-8"
                      )}
                    />
                  ) : (
                    // No brand mark: set the name instead, so the banner
                    // still reads as a wordmark rather than an empty box.
                    <span className="font-serif text-xl text-foreground/70 transition-colors group-hover:text-foreground">
                      {project.title}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif transition-colors group-hover:text-brand">
                    {project.title}
                  </h3>
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
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

function Section({
  title,
  href,
  children,
}: {
  title: string
  href: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-20">
      <div className="flex items-baseline gap-4">
        <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
          {title}
        </h2>
        <div aria-hidden className="h-px flex-1 self-center bg-border/70" />
        <Link
          href={href}
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
        >
          all →
        </Link>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}
