import type { MetadataRoute } from "next"
import { allPosts, allProjects } from "content-collections"

import { siteConfig } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = ["", "/writing", "/work", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }))

  const posts = allPosts
    .filter((p) => !p.draft)
    .map((post) => ({
      url: `${siteConfig.url}${post.url}`,
      lastModified: new Date(post.date),
    }))

  // Tier-2 entries are mentions without pages — never advertise their URLs.
  const projects = allProjects
    .filter((project) => project.tier === 1)
    .map((project) => ({
      url: `${siteConfig.url}${project.url}`,
      lastModified: now,
    }))

  return [...routes, ...posts, ...projects]
}
