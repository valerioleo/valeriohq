export const siteConfig = {
  // Brand of the company being built. When Raycash → Coincierge lands, this
  // single value is the only thing that changes across the whole site.
  company: "Raycash",

  name: "Valerio Leo",
  handle: "valeriohq",

  // Shown on the OG card.
  location: "Italy",
  // TODO(confirm): production domain (valeriohq.com assumed).
  url: "https://valeriohq.com",
  title: "Valerio Leo",
  description:
    "Valerio Leo, founder, engineer and team leader building confidential money at Raycash. Previously at Zama. Product thinking, AI, open source and learning by building.",

  // The homepage reads this directly, so the introduction has one source.
  tagline:
    "Founder, product engineer, tireless autodidact. I like making complicated things feel simple: the business behind a product, the people using it, and the details that make it feel right. I ship fast, and I build the checks that keep it safe.",

  links: {
    x: "https://x.com/valeriohq",
    github: "https://github.com/valerioleo",
    linkedin: "https://www.linkedin.com/in/valeriohq",
  },

  // Writing and work are already on the homepage path. About is the
  // only page that isn't, so it is the only thing in the nav.
  nav: [{ title: "About", href: "/about" }],
} as const

export type SiteConfig = typeof siteConfig
