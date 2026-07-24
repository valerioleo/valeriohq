import type { Metadata } from "next"

import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
}

export default function AboutPage() {
  return (
    <div className="pb-8 pt-10">
      <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
        About
      </h1>

      <div className="prose mt-8 max-w-none">
        <p>
          I&apos;m a founder and full-stack engineer working on
          privacy-preserving finance, based in London.
        </p>
        <p>
          The question I keep coming back to is why everything you do with money
          is visible to everyone, forever. My answer is confidential money on
          Ethereum: digital dollars whose balances and transfers are encrypted
          on-chain with fully homomorphic encryption, so a contract can settle a
          payment it cannot read.
        </p>
        <p>
          I went looking for that answer at{" "}
          <a href="https://www.zama.org" target="_blank" rel="noopener noreferrer">
            Zama
          </a>
          , the cryptography company making FHE fast enough to ship, where I was
          Entrepreneur in Residence. The brief I set myself was to find what FHE
          is good for at the scale of ordinary people. It turned out to be
          banking, which is now {siteConfig.company}, where I co-founded and
          build full time.
        </p>
        <p>
          I work across the whole stack. On-chain that means confidential
          ERC-7984 token contracts on Zama&apos;s FHEVM, tested BDD-first with
          viem and Hardhat. Off-chain it&apos;s the Next.js and React Native apps
          people actually touch. When the tooling doesn&apos;t exist I write it,
          which is where{" "}
          <a
            href="https://deployoor.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            deployoor
          </a>{" "}
          came from.
        </p>
        <p>
          Before any of this I studied food science at the University of
          Gastronomic Sciences in Pollenzo. Fermentation and cryptography have
          more in common than you&apos;d think: both are processes you have to
          trust without watching.
        </p>
        <p>
          Find me on{" "}
          <a href={siteConfig.links.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          ,{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , and{" "}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  )
}
