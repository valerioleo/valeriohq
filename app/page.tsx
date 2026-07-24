import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { siteConfig } from "@/lib/config"
import { formatDate } from "@/lib/utils"

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
          Founder of {siteConfig.company}, in London.{" "}
          <Link
            href="/about"
            className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
          >
            More about me →
          </Link>
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

      {/* Selected work */}
      <Section title="selected work" href="/work">
        <ul className="flex flex-col gap-7">
          {projects.map((project) => (
            <li key={project.url}>
              <Link href={project.url} className="group block">
                <div className="flex items-baseline justify-between gap-4">
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
