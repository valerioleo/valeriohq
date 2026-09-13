export const siteConfig = {
  // Brand of the company being built. When Raycash → Coincierge lands, this
  // single value is the only thing that changes across the whole site.
  company: "Raycash",

  name: "Valerio Leo",
  handle: "valeriohq",

  // The footer's local-time detail and the OG card location.
  location: "Italy",
  timeZone: "Europe/Rome",
  // TODO(confirm): production domain (valeriohq.com assumed).
  url: "https://valeriohq.com",
  title: "Valerio Leo",
  description:
    "Valerio Leo, founder and engineer building confidential money at Raycash. Previously at Zama. Product thinking, AI, open source and learning by building.",

  // The homepage reads this directly, so the introduction has one source.
  tagline:
    "I’m a founder and engineer. I like making complicated things feel simple.",

  links: {
    x: "https://x.com/valeriohq",
    github: "https://github.com/valerioleo",
    linkedin: "https://www.linkedin.com/in/valeriohq",
  },

  nav: [
    { title: "Writing", href: "/writing" },
    { title: "Work", href: "/work" },
    { title: "About", href: "/about" },
  ],
} as const

export type SiteConfig = typeof siteConfig
