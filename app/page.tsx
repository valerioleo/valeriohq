import Link from "next/link"
import { allPosts, allProjects } from "content-collections"

import { listedOpenSource } from "@/lib/work"
import { IntroExpand } from "@/components/intro-expand"
import { WorkList } from "@/components/work/work-list"
import { PostList } from "@/components/writing/post-list"

export default function Home() {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  const openSource = listedOpenSource(allProjects)

  return (
    <div className="pb-4 pt-8 sm:pt-12">
      <IntroExpand />

      <Section title="writing">
        <PostList posts={posts} />
      </Section>

      {openSource.length > 0 && (
        <Section title="open source">
          <WorkList projects={openSource} />
          <Link
            href="/work"
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
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 sm:mt-16">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
          {title}
        </h2>
        <div aria-hidden className="h-px flex-1 bg-border/80" />
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}
