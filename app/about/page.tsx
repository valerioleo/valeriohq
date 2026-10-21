import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPages } from "content-collections"

import { siteConfig } from "@/lib/config"
import { Mdx } from "@/components/mdx-components"

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
}

// The prose lives in content/pages/about.mdx, synced from Notion.
export default function AboutPage() {
  const page = allPages.find((p) => p.slug === "about")
  if (!page) notFound()

  return (
    <div className="pb-8 pt-8 sm:pt-10">
      <h1 className="text-title">
        {page.title}
      </h1>

      <div className="prose mt-8 max-w-none">
        <Mdx code={page.mdx} />
      </div>

      {/* An asterism closes the page. */}
      <p
        aria-hidden
        className="mt-14 text-center font-serif text-muted-foreground/80"
      >
        ⁂
      </p>
    </div>
  )
}
