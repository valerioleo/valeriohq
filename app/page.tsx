import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { formatDate } from "@/lib/utils"
import { MorePill } from "@/components/more-pill"
import { BrandIcon } from "@/components/project-logo"
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

  // Open source closes the page: the tools and the NFT-era builds, one list.
  // Charming, but it must not outrank the essays. Complete in itself — every
  // entry is listed right here, so the section carries no "all →" link.
  const openSource = allProjects
    .filter((p) => p.kind === "tool" || p.kind === "experiment")
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className="pb-8 pt-14 sm:pt-20">
      {/* Hero — a standing line, then the résumé. The work isn't a separate
          section; it's woven into the sentence as inline pills. The visible
          copy is <p>s on purpose: a long <h1> reads as the page title to
          screen readers and search engines, so the real heading is short and
          visually hidden. */}
      <section>
        <h1 className="sr-only">Valerio Leo, founder and engineer</h1>
        <div className="space-y-5 font-serif text-lg leading-relaxed">
          <p>
            I&apos;m a founder, engineer and advisor living at the intersection
            of AI and crypto.
          </p>
          {/* Punctuation after a pill sits at natural spacing — the old
              -ml tuck pulled it into the chip and the glyphs touched. The
              nowrap wrappers stay so a comma can't wrap alone. */}
          <p>
            Currently CEO at{" "}
            <span className="whitespace-nowrap">
              <WorkPill slug="raycash" label="Raycash" />.
            </span>{" "}
            Previously I worked at{" "}
            <span className="whitespace-nowrap">
              <WorkPill slug="zama" label="Zama" />,
            </span>{" "}
            I created <WorkPill slug="deployoor" label="deployoor" /> and
            contributed to{" "}
            <span className="whitespace-nowrap">
              <MorePill label="many other projects" logoPosition="right" />.
            </span>
          </p>
        </div>
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

      {/* Open source — mono titles with the brand mark. No ~/ prefix and no
          year: the marks identify, the section label already says what these
          are, and dates are résumé detail that belongs on /work. */}
      {openSource.length > 0 && (
        <Section title="open source">
          <ul className="divide-y divide-border/70">
            {openSource.map((project) => (
              <li key={project.url}>
                <Link
                  href={project.url}
                  className="group block py-3.5"
                >
                  <span className="inline-flex items-center gap-2 font-mono text-sm transition-colors group-hover:text-brand">
                    <BrandIcon slug={project.slug} className="size-[1.15em]" />
                    {project.title}
                  </span>
                  {project.description && (
                    <span className="mt-1 block font-sans text-sm leading-relaxed text-muted-foreground">
                      {project.description}
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

// `href` is optional: a section that lists everything it has (open source)
// carries no "all →" — the link is only for sections that truncate (writing).
function Section({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-20">
      <div className="flex items-baseline gap-4">
        <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
          {title}
        </h2>
        <div aria-hidden className="h-px flex-1 self-center bg-border/70" />
        {href && (
          <Link
            href={href}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            all →
          </Link>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}
