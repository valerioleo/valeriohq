import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { formatDate } from "@/lib/utils"
import { WorkPill } from "@/components/work-pill"
import { FeaturedInteractive } from "@/components/writing/featured-interactive"

export default function Home() {
  const nonDraft = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  // Writing is the centerpiece, so it leads. One interactive post is surfaced
  // as a live, touchable card; every other post is a quiet title row, and a
  // non-featured interactive post simply takes its place in the list.
  const featured =
    nonDraft.find((p) => p.interactive && p.featured) ??
    nonDraft.find((p) => p.interactive)
  const essays = nonDraft.filter((p) => p.slug !== featured?.slug).slice(0, 5)

  // Experiments close the page: the growing pile of weekend builds and
  // learning repos. Charming, but they must not outrank the essays.
  const experiments = allProjects
    .filter((p) => p.kind === "experiment")
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className="pb-8 pt-14 sm:pt-20">
      {/* Hero — one paragraph. The work isn't a separate section; it's woven
          into the sentence as inline pills, so the belief and the résumé read
          as one thought. The visible paragraph is a <p> on purpose: a 40-word
          <h1> reads as the page title to screen readers and search engines,
          so the real heading is short and visually hidden. */}
      <section>
        <h1 className="sr-only">Valerio Leo, founder and engineer</h1>
        <p className="max-w-[50ch] font-serif text-lg leading-relaxed">
          I believe technology is <em>how humans do good</em>: that every
          problem, underneath, is a technical one. I worked at{" "}
          <span className="whitespace-nowrap">
            <WorkPill slug="zama" label="Zama" />
            <span className="-ml-[0.15em]">,</span>
          </span>{" "}
          created{" "}
          <span className="whitespace-nowrap">
            <WorkPill slug="deployoor" label="deployoor" />
            <span className="-ml-[0.15em]">,</span>
          </span>{" "}
          and now I&apos;m building{" "}
          <WorkPill slug="raycash" label="Raycash" /> from Italy,{" "}
          <Link
            href="/work"
            className="underline decoration-brand/40 underline-offset-[3px] transition-colors hover:text-brand hover:decoration-brand"
          >
            and much more
          </Link>
          . Nerding out on the solutions is my life&apos;s work.
        </p>
      </section>

      {/* Writing — the centerpiece: the live card first, then the list. */}
      <Section title="writing" href="/writing">
        {featured && (
          <div className="mb-6">
            <FeaturedInteractive post={featured} />
          </div>
        )}
        {/* divide-y, not per-row border-b: rules sit between rows only, so
            the list doesn't close with a stray line. */}
        <ul className="divide-y divide-border/70">
          {essays.map((post) => (
            <li key={post.url}>
              <Link
                href={post.url}
                className="group flex items-baseline justify-between gap-4 py-3.5"
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

      {/* Experiments — mono ~/ mark so they read as things you can open, not
          résumé lines. */}
      {experiments.length > 0 && (
        <Section title="experiments" href="/work#experiments">
          <ul className="divide-y divide-border/70">
            {experiments.map((project) => (
              <li key={project.url}>
                <Link
                  href={project.url}
                  className="group flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="min-w-0">
                    <span className="font-mono text-sm transition-colors group-hover:text-brand">
                      <span aria-hidden className="text-brand/70">
                        ~/
                      </span>
                      {project.title}
                    </span>
                    {project.description && (
                      <span className="mt-1 block max-w-[52ch] font-sans text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </span>
                    )}
                  </span>
                  {project.year && (
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
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
