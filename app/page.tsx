import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { formatDate } from "@/lib/utils"
import { WorkPill } from "@/components/work-pill"
import { InteractiveStrip } from "@/components/writing/interactive-strip"

export default function Home() {
  const nonDraft = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  // Essays stay a quiet title list; interactive posts get their own strip.
  const essays = nonDraft.filter((p) => !p.interactive).slice(0, 5)
  const interactive = nonDraft.filter((p) => p.interactive)

  // Experiments grow as a homepage list — not hero pills. Newest / highest
  // priority first via `order`, then year as a tiebreak readers can scan.
  const experiments = allProjects
    .filter((p) => p.kind === "experiment")
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className="pb-8 pt-14 sm:pt-20">
      {/* Hero — one paragraph. The work isn't a separate section; it's woven
          into the sentence as inline pills, so the belief and the résumé read
          as one thought. */}
      <section>
        <h1 className="max-w-[50ch] font-serif text-lg leading-relaxed">
          I believe technology is <em>how humans do good</em> — that every
          problem, underneath, is a technical one. I worked at{" "}
          <span className="whitespace-nowrap">
            <WorkPill slug="zama" label="Zama" />,
          </span>{" "}
          created{" "}
          <span className="whitespace-nowrap">
            <WorkPill slug="deployoor" label="deployoor" />,
          </span>{" "}
          and now I&apos;m building{" "}
          <WorkPill slug="raycash" label="Raycash" />{" "}
          from Italy —{" "}
          <Link
            href="/work"
            className="underline decoration-border underline-offset-[3px] transition-colors hover:text-brand hover:decoration-brand"
          >
            and much more
          </Link>
          . Nerding out on the solutions is my life&apos;s work.
        </h1>
      </section>

      {/* Experiments — the growing pile of weekend builds, failed starts, and
          learning repos. Same quiet list voice as writing; mono ~/ mark so
          they read as things you can open, not résumé lines. */}
      {experiments.length > 0 && (
        <Section title="experiments" href="/work#experiments">
          <ul>
            {experiments.map((project) => (
              <li key={project.url}>
                <Link
                  href={project.url}
                  className="group flex items-baseline justify-between gap-4 border-b border-border/70 py-3.5"
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

      {/* Writing */}
      <Section title="writing" href="/writing">
        <ul>
          {essays.map((post) => (
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

      {/* Interactive writeups — surfaced richer than a title: the featured one
          carries a live, touchable teaser, the rest are poster cards. */}
      {interactive.length > 0 && (
        <Section title="interactive" href="/writing">
          <InteractiveStrip posts={interactive} />
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
