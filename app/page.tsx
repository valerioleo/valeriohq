import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { siteConfig } from "@/lib/config"
import { BioDisclosure } from "@/components/bio-disclosure"
import { BrandIcon } from "@/components/project-logo"
import { WorkPill } from "@/components/work-pill"
import { FeaturedPost } from "@/components/writing/featured-post"
import { PostList } from "@/components/writing/post-list"

export default function Home() {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  const featured = posts.find((post) => post.featured)
  const essays = posts.filter((post) => post.slug !== featured?.slug).slice(0, 3)
  const openSource = allProjects
    .filter((project) => project.kind === "tool" && project.tier === 1)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className="pb-4 pt-8 sm:pt-12">
      <section aria-labelledby="introduction">
        <h1 id="introduction" className="sr-only">
          {siteConfig.name}, founder and engineer
        </h1>
        <div className="space-y-6 font-serif text-lg leading-relaxed sm:space-y-7">
          <p>
            {siteConfig.tagline} That means caring about the whole product:
            the business behind it, the people using it, and the details
            that make it feel right.
          </p>
          <p>
            Currently building confidential money at{" "}
            <span className="whitespace-nowrap">
              <WorkPill slug="raycash" label={siteConfig.company} />.
            </span>{" "}
            Previously at{" "}
            <span className="whitespace-nowrap">
              <WorkPill slug="zama" label="Zama" />,
            </span>{" "}
            where I worked directly with the CEO and leaders in protocol
            and cryptography to shape what came next.
          </p>
          <p>
            I’m an avid autodidact, and AI is giving me the time of my life.
            I build my own harnesses, orchestration and skills, getting my
            hands dirty in things that used to feel out of reach. Writing
            is how I make sense of what I learn and share it clearly.
          </p>
        </div>
        <BioDisclosure>
          <p>
            I like small teams because the conversations stay connected:
            what someone needs, what the business can support, and what we
            can actually ship. I want to be close enough to all three to
            make good tradeoffs.
          </p>
          <p>
            When a tool is missing, I tend to build it. That’s where{" "}
            <WorkPill slug="deployoor" label="deployoor" /> came from.
            With AI, I’m following the same instinct: experimenting with
            how agents work together, what context they need, and where
            human judgment matters most.
          </p>
        </BioDisclosure>
      </section>

      <Section title="writing" href="/writing" linkLabel="all writing">
        {featured && <FeaturedPost post={featured} />}
        <PostList posts={essays} />
      </Section>

      {openSource.length > 0 && (
        <Section title="open source">
          <ul className="divide-y divide-border/70">
            {openSource.map((project) => (
              <li key={project.url} className="py-6 first:pt-0">
                <Link href={project.url} className="group block">
                  <span className="inline-flex items-center gap-2 font-mono text-sm transition-colors group-hover:text-brand">
                    <BrandIcon slug={project.slug} className="size-[1.15em]" />
                    {project.title}
                  </span>
                  {project.description && (
                    <span className="mt-2.5 block max-w-[62ch] font-sans text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/work#earlier"
            className="mt-6 inline-flex min-h-8 items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            Earlier projects & experiments <span aria-hidden>→</span>
          </Link>
        </Section>
      )}
    </div>
  )
}

function Section({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string
  href?: string
  linkLabel?: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
          {title}
        </h2>
        <div aria-hidden className="h-px flex-1 bg-border/80" />
        {href && (
          <Link
            href={href}
            className="inline-flex min-h-8 items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            {linkLabel} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      <div className="mt-7">{children}</div>
    </section>
  )
}
