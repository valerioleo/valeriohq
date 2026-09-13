import type { Metadata } from "next"

import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
}

export default function AboutPage() {
  return (
    <div className="pb-8 pt-8 sm:pt-10">
      <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
        About
      </h1>

      <div className="prose mt-8 max-w-none">
        <p>
          I’m a founder and engineer. I like being involved in the whole
          product: understanding who it’s for, how the business works, what
          to build, and how it should feel to use. Taste and technical
          judgment belong in the same conversation.
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
          , where I worked directly with the CEO and leaders in protocol and
          cryptography to shape future products. We explored what FHE could
          make possible for ordinary people. That work led to{" "}
          {siteConfig.company}, which I co-founded and now build full time.
        </p>
        <p>
          I still spend a lot of my time writing software: confidential
          contracts on Zama’s FHEVM, Next.js and React Native apps, and the
          tools that connect them. When a tool is missing, I tend to build
          it, which is where{" "}
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
          I’m an avid autodidact. Before software, I studied food science at
          the University of Gastronomic Sciences in Pollenzo. I’ve always
          liked following a question into a field I know little about and
          learning enough to make something with it.
        </p>
        <p>
          AI is giving me the time of my life as a learner. I’m getting my
          hands dirty in things that used to feel out of reach, and building
          my own harnesses, agent orchestration and skills to find out how
          much these tools can do. Learning how to work with AI is now part
          of how I approach a new problem.
        </p>
        <p>
          On a small team, that curiosity has to turn into useful work.
          At {siteConfig.company}, I connect product decisions with the
          engineering practice: clear behavior, BDD-first tests and release
          gates. Writing helps me think through the tradeoffs and explain
          them to the people I work with. The public essays are part of
          that habit.
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

      {/* Same asterism close as articles, so every page ends the same way. */}
      <p
        aria-hidden
        className="mt-14 text-center font-serif text-muted-foreground/80"
      >
        ⁂
      </p>
    </div>
  )
}
