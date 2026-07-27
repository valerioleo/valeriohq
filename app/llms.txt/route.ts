import { allPosts, allProjects } from "content-collections"

import { siteConfig } from "@/lib/config"

export const dynamic = "force-static"

// A clean, machine-readable index of the site — the cheap hedge on
// LLM-mediated discovery. See https://llmstxt.org.
export function GET() {
  const posts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  const byOrder = (a: { order?: number }, b: { order?: number }) =>
    (a.order ?? 99) - (b.order ?? 99)
  const projects = allProjects.filter((p) => p.tier === 1).sort(byOrder)
  // Tier-2 entries have no page, so they're listed as plain text, not links.
  const mentions = allProjects.filter((p) => p.tier === 2).sort(byOrder)

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Founder of ${siteConfig.company} (confidential money on Ethereum). Based in ${siteConfig.location}.`,
    "",
    "## Writing",
    ...posts.map(
      (p) =>
        `- [${p.title}](${siteConfig.url}${p.url})${p.description ? `: ${p.description}` : ""}`
    ),
    "",
    "## Work",
    ...projects.map(
      (p) =>
        `- [${p.title}](${siteConfig.url}${p.url})${p.description ? `: ${p.description}` : ""}`
    ),
    ...(mentions.length > 0
      ? [
          "",
          "## Also",
          ...mentions.map(
            (p) =>
              `- ${p.link ? `[${p.title}](${p.link})` : p.title}${p.description ? `: ${p.description}` : ""}`
          ),
        ]
      : []),
    "",
    "## Links",
    `- X: ${siteConfig.links.x}`,
    `- GitHub: ${siteConfig.links.github}`,
    `- LinkedIn: ${siteConfig.links.linkedin}`,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
