export const siteConfig = {
  // Brand of the company being built. When Raycash → Coincierge lands, this
  // single value is the only thing that changes across the whole site.
  company: "Raycash",

  name: "Valerio Leo",
  handle: "valeriohq",

  // Where he is. Used by the footer clock, the hero line, the OG cards and
  // llms.txt, so moving is a two-line change here rather than a grep.
  location: "Italy",
  timeZone: "Europe/Rome",
  // TODO(confirm): production domain (valeriohq.com assumed).
  url: "https://valeriohq.com",
  title: "Valerio Leo",
  description:
    "Founder & engineer building confidential money on Ethereum: digital dollars with balances only their owner can see.",

  // Hero one-liner (straight version, per the brief).
  tagline:
    "Founder & engineer. I build confidential money on Ethereum: digital dollars with balances only their owner can see.",
  // Substring of the tagline set in italic in the hero. Purely presentational;
  // if it stops matching the tagline it is simply ignored.
  taglineEmphasis: "only their owner can see",

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
