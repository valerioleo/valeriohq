import { allProjects } from "content-collections"

type Project = (typeof allProjects)[number]

function byOrder(projects: Project[]) {
  return [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

// Homepage open source: tools plus Pinkwhale. Raycash and Zama stay in the
// hero; they belong on /work, not in this list.
export function listedOpenSource(projects: Project[]) {
  return byOrder(
    projects.filter(
      (project) =>
        project.tier === 1 &&
        (project.kind === "tool" || project.slug === "pinkwhale")
    )
  )
}

// /work: current product work, then the tools and experiments worth a page.
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
