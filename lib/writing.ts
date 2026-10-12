import { allPosts } from "content-collections"

type Post = (typeof allPosts)[number]

// Readers only ever see published posts, newest first.
export const publishedPosts = (posts: Post[]) =>
  posts
    .filter(post => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

// A project's related writing: the published posts that name it in `work`.
export const relatedWriting = (slug: string, posts: Post[]) =>
  publishedPosts(posts.filter(post => post.work?.includes(slug)))
