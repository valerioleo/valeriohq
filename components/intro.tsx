import { siteConfig } from "@/lib/config"

// The homepage introduction: one fixed paragraph about who, not where. The
// work list right below names the companies and tools, so the bio doesn't
// repeat them, and the longer story is one click away in the nav's About.
export const Intro = () => (
  <section aria-labelledby="introduction">
    <h1 id="introduction" className="sr-only">
      {siteConfig.name}, founder, engineer and team leader
    </h1>
    <p className="text-pretty">{siteConfig.tagline}</p>
  </section>
)
