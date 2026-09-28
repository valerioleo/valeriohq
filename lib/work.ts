import { allProjects } from "content-collections"

type Project = (typeof allProjects)[number]

function byOrder(projects: Project[]) {
  return [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

// Open source only: tools plus Pinkwhale.
export function listedOpenSource(projects: Project[]) {
  return byOrder(
    projects.filter(
      (project) =>
        project.tier === 1 &&
        (project.kind === "tool" || project.slug === "pinkwhale")
    )
  )
}

// Everything worked on, in one list: the product and the role first, then
// the tools and experiments worth a page. The homepage and /work both use it.
export function listedWork(projects: Project[]) {
  return byOrder(
    projects.filter(
      (project) =>
        project.tier === 1 &&
        (project.kind === "product" ||
          project.kind === "role" ||
          project.kind === "tool" ||
          project.slug === "pinkwhale")
    )
  )
}

// A post's related work, in the order its `work` frontmatter lists it. Only
// projects with a page can be linked, so a slug that doesn't resolve to one
// fails the build instead of rendering a dead link.
export function relatedWork(slugs: string[], projects: Project[]) {
  return slugs.map((slug) => {
    const project = projects.find((p) => p.slug === slug && p.tier === 1)
    if (!project) throw new Error(`Unknown work "${slug}" in post frontmatter`)
    return project
  })
}
