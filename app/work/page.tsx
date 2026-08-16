import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import { WorkPill } from "@/components/work-pill"

// The Work page is prose: the story is the structure, the pills are the
// wayfinding. A reader reads it; a scanner hops pill to pill. Copy is
// Valerio's own (rewritten 2026-08), humanized — no em dashes, his
// punctuation, his slang.
//
// Open source is a chapter, not a badge. Its three paragraphs are bracketed
// the way you'd annotate a book, in filigrana ink: a watermark you notice,
// not text you read. At xl (the container is max-w-2xl, so ~300px of true
// margin from 1280px up) the bracket and the ~/open-source note sit in the
// right margin, tilted like a hand-note. Below xl there is no margin, so the
// bracket flips to the left edge and hangs in the page's px-5 gutter with the
// label at its top.
//
// Geist Mono is the annotation's voice only, declared here so it loads on
// this route alone. Pills stay in the site serif: a second font inside the
// chip broke the Petrona-tuned baseline, so the annotation carries the OSS
// register by itself.
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Work",
  description: "Shipped products, protocols, and open source.",
}

// The chapter heading in the OSS voice: rust ~/ plus Geist Mono, filigrana
// tones. Used below xl, where the margin note has nowhere to live.
function ChapterLabel() {
  return (
    <span
      className="text-xs tracking-[0.08em] text-muted-foreground/65"
      style={geistMono.style}
    >
      <span aria-hidden className="text-brand/50">
        ~/
      </span>
      open-source
    </span>
  )
}

// External links share the quiet rust underline the prose uses site-wide.
function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-brand/40 underline-offset-[3px] transition-colors hover:text-brand hover:decoration-brand"
    >
      {children}
    </a>
  )
}

export default function WorkPage() {
  return (
    <div className="pb-8 pt-10">
      <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
        Work
      </h1>

      <div className="mt-8 space-y-5 font-serif text-lg leading-relaxed">
        <p>
          My name is Valerio, a founder, engineer and advisor living at the
          intersection of AI and crypto for more than ten years. I thrive in
          zero-to-one projects, leading small and medium-sized teams to achieve
          their goals.
        </p>
        <p>
          Today I&apos;m CEO at{" "}
          <span className="whitespace-nowrap">
            <WorkPill slug="raycash" label="Raycash" />:
          </span>{" "}
          an app to receive, hold and grow your stablecoins confidentially.
          It&apos;s the first of its kind running on FHE, and it&apos;s
          available on the App Store and Play Store. Give it a try!
        </p>
        <p>
          Before Raycash I worked at{" "}
          <span className="whitespace-nowrap">
            <WorkPill slug="zama" label="Zama" />,
          </span>{" "}
          the French unicorn that makes FHE possible for everyone. My brief was
          clear: work out what FHE is good for at the scale of ordinary people.
          The answer turned out to be stablecoins, and I left to build it. Zama
          also owns a stake in Raycash.
        </p>

        <div className="relative">
          {/* ≥xl: bracket + note in the right margin */}
          <span
            aria-hidden
            className="absolute -right-7 top-1 bottom-1 hidden w-2 rounded-[2px] border-y border-r border-muted-foreground/35 xl:block"
          />
          <span
            aria-hidden
            className="absolute left-full top-1/2 hidden w-44 -translate-y-1/2 -rotate-2 pl-12 text-xs leading-relaxed text-muted-foreground/65 xl:block"
            style={geistMono.style}
          >
            <span className="text-brand/50">~/</span>open-source
          </span>
          {/* <xl: the bracket flips to the left edge */}
          <span
            aria-hidden
            className="absolute -left-3 top-1 bottom-1 w-2 rounded-[2px] border-y border-l border-muted-foreground/35 xl:hidden"
          />
          <div className="mb-2 xl:hidden">
            <ChapterLabel />
          </div>
          <p>
            When what I want doesn&apos;t exist, I build it and open the
            source. <WorkPill slug="deployoor" label="deployoor" /> made it
            easy to manage deployments in my development flow: deploy, manage
            and verify your contracts from any Hardhat or Foundry project,
            using any viem wallet, whether a local private key or a hosted one
            like Privy or Turnkey.
          </p>
          <p className="mt-5">
            With my{" "}
            <WorkPill
              slug="confidential-primitives"
              label="confidential-primitives"
            />{" "}
            library (audited by Burrasec) I introduced new FHEVM patterns we
            kept reusing at Raycash and thought could be useful to the whole
            industry.
          </p>
          <p className="mt-5">
            I&apos;m also passionate about NFT engineering as a tool for
            creativity. I created{" "}
            <span className="whitespace-nowrap">
              <WorkPill slug="pinkwhale" label="pinkwhale" />,
            </span>{" "}
            a fully open-source NFT lending protocol built on the goated
            Seaport. I think the design was pretty neat. Too bad I
            couldn&apos;t release it before the market went to zero! Lesson
            learned: you can never ship fast enough. I then came up with{" "}
            <WorkPill slug="chain-double" label="chain-double" /> to push the
            limits of dynamic, fully on-chain NFTs. It uses cross-chain message
            passing to let an L1 NFT read its URI from L2 storage, with IPFS as
            transport! It won me an award at HackFS in 2021.
          </p>
        </div>

        <p>
          Before my two wonderful twin daughters arrived, I&apos;d been hacking
          around the world for fun, winning various awards. Honorable mentions:{" "}
          <Ext href="https://ethglobal.com/showcase/zenny-ynkim">Zenny</Ext>{" "}
          (first prize for the 1inch integration),{" "}
          <Ext href="https://ethglobal.com/showcase/taptrust-12smv">
            TapTrust
          </Ext>{" "}
          (grand finalist, plus the Arx and Base prizes) and{" "}
          <Ext href="https://ethglobal.com/showcase/supernft-p2ahe">
            SuperNFT
          </Ext>{" "}
          (the Superfluid and EPNS prizes). Those years were among the most fun
          of my life and helped me bump into the most talented engineers, who
          became long-term friends and colleagues. Hopefully, I&apos;ll be back
          hitting the road again soon.
        </p>
        <p className="text-muted-foreground">
          Before all of this there was Dappflow (2020–21), one of the earliest
          platforms for managing your smart contracts, which shut down in 2021.
          Maybe we were just too early! In 2020 I also got a grant from the UK
          Government (via{" "}
          <Ext href="https://gtr.ukri.org/projects?ref=77464">Innovate UK</Ext>
          ) to build a DID-powered jobs board.
        </p>
      </div>
    </div>
  )
}
