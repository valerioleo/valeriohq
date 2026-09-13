import type { Metadata } from "next"
import { allPosts } from "content-collections"

import { PostList } from "@/components/writing/post-list"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on confidential money, applied cryptography, and building in the open.",
}

export default function WritingPage() {
  const posts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="pb-8 pt-8 sm:pt-10">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
          Writing
        </h1>
        <p className="mt-3 max-w-[54ch] font-serif italic leading-relaxed text-muted-foreground">
          Notes on confidential money, applied cryptography, and building in
          the open.
        </p>
      </header>
      <div className="mt-10 sm:mt-12">
        <PostList posts={posts} descriptions />
      </div>
    </div>
  )
}
