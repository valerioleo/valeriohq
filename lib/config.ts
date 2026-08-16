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
    "Valerio Leo, founder & engineer. A nerd at heart, building mostly in AI, crypto and open source — currently confidential money on Ethereum at Raycash.",

  // Hero. Not a slogan — a statement of temperament: the problems worth having
  // are the ones that stay technical the whole way down.
  //
  // NOTE: nothing reads these two today — the hero in app/page.tsx sets its own
  // copy as JSX so it can weave the work pills into the sentence. Kept in sync
  // so they don't drift into a lie if something starts consuming them.
  tagline:
    "I'm a nerd at heart: the problems I like stay technical all the way down. Most of what I build is AI, crypto, and open source.",
  // Substring of the tagline set in italic in the hero. Purely presentational;
  // if it stops matching the tagline it is simply ignored.
  taglineEmphasis: "nerd at heart",

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
