import { allPosts, allProjects } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  return (
    <div className="prose dark:prose-invert prose-a:underline-offset-4 mt-6 prose-hr:border-gray-300 prose-hr:dark:border-gray-700">
      <p>
        Spearheading transformative innovation for over a decade, I merge award-winning hacking prowess with entrepreneurial acumen, leading some of the smartest teams in the crypto domain and beyond.
        More in my <Link href="/about">about page</Link>.
      </p>

      {/* Posts section */}
      <hr />
      <h2>Posts</h2>
      {allPosts.map((post) => (
        <article key={post._id} className="my-6">
          <span className="text-sm text-gray-500">12/12/12</span>
          <Link href={post.slug}>
            <h4 className="my-0">{post.title}</h4>
          </Link>
        </article>
      ))}

      {/* Projects section */}
      <hr />
      <h2>Projects</h2>
      {allProjects.map((post) => (
        <article key={post._id} className="my-6">
          <Link href={post.slug}>
            <h4 className="my-0">{post.title}</h4>
          </Link>
          {post.description && <p className="mt-0 text-gray-500">{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
