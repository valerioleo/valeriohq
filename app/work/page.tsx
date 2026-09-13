import Link from "next/link"
import type { Metadata } from "next"

import { siteConfig } from "@/lib/config"
import { BrandIcon } from "@/components/project-logo"

export const metadata: Metadata = {
  title: "Work",
  description: "Product and engineering at Raycash, previously at Zama, and the open source tools built along the way.",
}

function ProjectHeading({ slug, name, role }: { slug: string; name: string; role: string }) {
  return (
    <div>
      <h2 className="font-serif text-xl font-medium">
        <Link href={`/work/${slug}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-brand">
          <BrandIcon slug={slug} className="size-5" />
          {name}
        </Link>
      </h2>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{role}</p>
    </div>
  )
}

export default function WorkPage() {
  return (
    <div className="pb-8 pt-8 sm:pt-10">
      <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">Work</h1>
      <p className="mt-5 font-serif text-lg leading-relaxed">
        I like working where product and engineering meet: deciding what
        is worth building, understanding the people it’s for, and getting
        the details right. Most of my work is in confidential money and the
        tools that make it possible.
      </p>

      <section className="mt-12 sm:mt-16">
        <ProjectHeading slug="raycash" name={siteConfig.company} role="Co-founder & principal engineer · now" />
        <div className="prose mt-5 max-w-none">
          <p>
            An app to receive, hold and use stablecoins confidentially.
            I work across the product and lead the engineering practice:
            what we build, how it should work, and how a small team gets
            it into people’s hands.
          </p>
          <p>
            That means connecting the business and the experience people
            have with the contracts, web and mobile apps underneath. AI is
            part of how we build, with BDD-first tests and release gates
            keeping the feedback useful.
          </p>
        </div>
        <Link href="/work/raycash" className="mt-3 inline-flex min-h-8 items-center gap-2 font-mono text-xs text-brand transition-colors hover:text-foreground">
          How we build it <span aria-hidden>→</span>
        </Link>
        <p className="mt-5 font-serif text-base leading-relaxed text-muted-foreground">
          Previously at <Link href="/work/zama" className="text-link">Zama</Link>,
          I worked directly with the CEO and leaders in protocol and
          cryptography to shape future products. That work led to{" "}
          {siteConfig.company}.
        </p>
      </section>

      <section className="relative mt-16 sm:mt-24">
        <h2 className="mb-8 font-mono text-xs tracking-[0.04em] text-muted-foreground">open source</h2>
        <div className="relative space-y-10 sm:space-y-12">
          <span aria-hidden className="absolute -right-7 inset-y-1 hidden w-2 rounded-[2px] border-y border-r border-muted-foreground/35 xl:block" />
          <span aria-hidden className="absolute left-full top-1/2 hidden w-36 -translate-y-1/2 pl-12 font-mono text-xs leading-relaxed text-muted-foreground xl:block">
            tools over<br />headcount
          </span>
          <div>
            <ProjectHeading slug="deployoor" name="deployoor" role="Deployment tooling · open source" />
            <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed">
              I got tired of wiring contract addresses into every app and test.
              Deployoor gives you one typed contract object to share everywhere,
              across Hardhat, Foundry and viem. Its testing package runs the same
              deployments against an in-memory EVM.
            </p>
          </div>
          <div>
            <ProjectHeading slug="confidential-primitives" name="confidential-primitives" role="FHEVM contracts · audited by Burrasec" />
            <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed">
              The patterns we kept needing at {siteConfig.company}, collected
              into an open source library. Reusable pieces for confidential
              contracts, so each new feature starts with less groundwork.
            </p>
          </div>
        </div>
      </section>

      <section id="earlier" className="mt-16 scroll-mt-8 sm:mt-24">
        <h2 className="font-mono text-xs tracking-[0.04em] text-muted-foreground">earlier work & experiments</h2>
        <div className="prose mt-5 max-w-none">
          <p>
            I also like NFT engineering as a tool for creativity.
            <Link href="/work/pinkwhale"> Pinkwhale</Link> is an open source
            lending protocol built on Seaport.
            <Link href="/work/chain-double"> Chain-double</Link> lets an L1
            NFT read its URI from L2 storage, with IPFS as transport. It won
            an award at HackFS in 2021.
          </p>
          <p>
            Before my twin daughters arrived, I spent a lot of time hacking
            around the world. A few favorites: <a href="https://ethglobal.com/showcase/zenny-ynkim">Zenny</a>,{" "}
            <a href="https://ethglobal.com/showcase/taptrust-12smv">TapTrust</a> and{" "}
            <a href="https://ethglobal.com/showcase/supernft-p2ahe">SuperNFT</a>.
            Those weekends introduced me to engineers who became long-term
            friends and colleagues. Hopefully I’ll be back on the road soon.
          </p>
          <p className="text-muted-foreground">
            Earlier still: Dappflow, a platform for managing smart contracts,
            and a UK Government grant via{" "}
            <a href="https://gtr.ukri.org/projects?ref=77464">Innovate UK</a>{" "}
            to build a jobs board using decentralized identity.
          </p>
        </div>
      </section>
      <p aria-hidden className="mt-14 text-center font-serif text-muted-foreground">⁂</p>
    </div>
  )
}
