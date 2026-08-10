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
    "Valerio Leo, founder & engineer. I believe technology is how humans do good. I build private money on Ethereum, plus experiments in AI, NFTs, and developer tooling.",

  // Hero. Not a slogan — a statement of belief. Every problem is, underneath,
  // a technical one; finding the solutions is the whole point.
  tagline:
    "I believe technology is how humans do good: that every problem, underneath, is a technical one. Nerding out on the solutions is my life's work.",
  // Substring of the tagline set in italic in the hero. Purely presentational;
  // if it stops matching the tagline it is simply ignored.
  taglineEmphasis: "how humans do good",

  links: {
    x: "https://x.com/valeriohq",
    github: "https://github.com/valerioleo",
    linkedin: "https://www.linkedin.com/in/valeriohq",
  },

  // Writing lives on the homepage; Work is reached from the hero. The nav
  // stays thin — About is the only page that isn't already on the home path.
  nav: [{ title: "About", href: "/about" }],
} as const

export type SiteConfig = typeof siteConfig
