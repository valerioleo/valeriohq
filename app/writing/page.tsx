import type { Metadata } from "next"
import { allPosts } from "content-collections"

import { publishedPosts } from "@/lib/writing"
import { PostList } from "@/components/writing/post-list"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on confidential money, applied cryptography, and building in the open.",
}

export default function WritingPage() {
  const posts = publishedPosts(allPosts)

  return (
    <div className="pb-8 pt-8 sm:pt-10">
      <header>
        <h1 className="text-[1.1875rem] font-medium tracking-[-0.01875rem]">Writing</h1>
        <p className="mt-2 italic text-muted-foreground">
          Notes on confidential money, applied cryptography, and building in
          the open.
        </p>
      </header>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </div>
  )
}
