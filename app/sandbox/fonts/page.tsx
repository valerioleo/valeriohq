import type { Metadata } from "next"
import {
  Bitter,
  Fraunces,
  Geist,
  Literata,
  Newsreader,
  Petrona,
  Source_Serif_4,
  Spectral,
} from "next/font/google"

// Font bake-off. Lives here and not in lib/fonts.ts on purpose: declaring the
// candidates in this file means they only load on this route, so trying six
// extra serifs costs the real site nothing.
//
// The brief: Literata's `1` reads as an `l`. "This is a v1" looks like "vl",
// which is bad for a blog full of v1, tx0 → tx1, ERC-7984 and euint64. What
// separates a good `1` from a bad one is the flag — the diagonal stroke at the
// top left. A short flag on a narrow stem converges on `l`; a long flag, or a
// slab, never does.

const literata = Literata({ subsets: ["latin"], axes: ["opsz"] })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], axes: ["opsz"] })
const newsreader = Newsreader({ subsets: ["latin"], axes: ["opsz"] })
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"] })
const petrona = Petrona({ subsets: ["latin"] })
const bitter = Bitter({ subsets: ["latin"] })
const spectral = Spectral({ subsets: ["latin"], weight: ["400", "500"] })
const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fonts",
  robots: { index: false, follow: false },
}

type Candidate = {
  name: string
  font: { style: { fontFamily: string } }
  verdict: string
  note: string
}

const CANDIDATES: Candidate[] = [
  {
    name: "Literata",
    font: literata,
    verdict: "the original bug",
    note: "Kept here as the control. Short flag on the 1, and a base serif almost exactly as wide as the l's. That's the collision that started all this.",
  },
  {
    name: "Geist",
    font: geist,
    verdict: "tried, reverted",
    note: "Vercel's, drawn for developer interfaces — so an unambiguous 1 is a design goal, not luck. It fixes the digits and loses the room: the page stops reading as an essay and starts reading as a product surface.",
  },
  {
    name: "Source Serif 4",
    font: sourceSerif,
    verdict: "closest swap",
    note: "Adobe, screen-first, same opsz axis Literata has — so it drops in without retuning sizes. Longer, steeper flag on the 1. The safe pick.",
  },
  {
    name: "Newsreader",
    font: newsreader,
    verdict: "most editorial",
    note: "Sharper and more magazine than Literata, with real personality in the italic. Open counters keep it readable small.",
  },
  {
    name: "Spectral",
    font: spectral,
    verdict: "screen-native",
    note: "Production Type, drawn for screens rather than adapted to them. Slightly narrower, so lines hold more words at the same measure.",
  },
  {
    name: "Petrona",
    font: petrona,
    verdict: "shipped",
    note: "Softer and more humanist. Reads friendly rather than technical — the furthest from a whitepaper of this set, and what the site now uses.",
  },
  {
    name: "Bitter",
    font: bitter,
    verdict: "zero ambiguity",
    note: "A slab. The 1 is unmistakable because every terminal is a block. Costs you some bookishness for total clarity.",
  },
  {
    name: "Fraunces",
    font: fraunces,
    verdict: "most character",
    note: "Variable on SOFT and WONK — genuinely distinctive, nobody else's blog looks like this. Strong flavour; best if you want the type to be part of the brand.",
  },
]

const AMBIGUITY = "Il1 · v1 vl · tx0 tx1 · 0O · rn m"
const TECHNICAL = "ERC-7984 · euint64 · 5M USDC · v0.5.0 · 11155111"
const PROSE =
  "Once you're holding an ERC-7984 token, your balance is effectively encrypted. That part is solved. But how those tokens come into existence matters just as much, and there are two ways it happens."

export default function FontsPage() {
  return (
    <div className="pb-16 pt-10">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
          Fonts
        </h1>
        <p className="mt-3 max-w-[60ch] font-serif italic leading-relaxed text-muted-foreground">
          Candidates for the reading face. The row that matters is the second
          one in each block — that&apos;s where <span>v1</span> either reads as{" "}
          <span>v1</span> or as <span>vl</span>.
        </p>
      </header>

      <div className="mt-12 space-y-14">
        {CANDIDATES.map((c) => (
          <section key={c.name}>
            <div className="flex items-baseline justify-between gap-4 border-b border-border/70 pb-2">
              <h2 className="font-mono text-xs uppercase tracking-wider">
                {c.name}
              </h2>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {c.verdict}
              </span>
            </div>

            <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              {c.note}
            </p>

            {/* The test. Big, because the confusion is a shape problem. */}
            <p
              className="mt-6 text-4xl"
              style={{ fontFamily: c.font.style.fontFamily }}
            >
              This is a v1
            </p>

            <p
              className="mt-4 text-2xl"
              style={{ fontFamily: c.font.style.fontFamily }}
            >
              {AMBIGUITY}
            </p>

            <p
              className="mt-3 text-lg text-muted-foreground"
              style={{ fontFamily: c.font.style.fontFamily }}
            >
              {TECHNICAL}
            </p>

            {/* Body copy at the real size, on the real measure. */}
            <p
              className="mt-6 max-w-[68ch] text-[1.0625rem] leading-relaxed"
              style={{ fontFamily: c.font.style.fontFamily }}
            >
              {PROSE}
            </p>

            <p
              className="mt-3 max-w-[68ch] text-[1.0625rem] italic leading-relaxed text-muted-foreground"
              style={{ fontFamily: c.font.style.fontFamily }}
            >
              {PROSE}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
