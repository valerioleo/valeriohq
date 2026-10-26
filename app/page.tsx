import { allPosts, allProjects } from "content-collections"

import { listedWork } from "@/lib/work"
import { publishedPosts } from "@/lib/writing"
import { Intro } from "@/components/intro"
import { Section } from "@/components/section"
import { WorkList } from "@/components/work/work-list"
import { PostList } from "@/components/writing/post-list"

export default function Home() {
  const work = listedWork(allProjects)
  const posts = publishedPosts(allPosts)

  return (
    <div className="pb-4 pt-8 sm:pt-12">
      <Intro />

      <Section title="work">
        <WorkList projects={work} />
      </Section>

      <Section title="writing">
        <PostList posts={posts} />
      </Section>
    </div>
  )
}
