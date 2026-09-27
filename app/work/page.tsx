import Link from "next/link"
import type { Metadata } from "next"
import { allProjects } from "content-collections"

import { listedWork } from "@/lib/work"
import { WorkList } from "@/components/work/work-list"

export const metadata: Metadata = {
  title: "Work",
  description: "Product and engineering at Raycash, previously at Zama, and the open source tools built along the way.",
}

export default function WorkPage() {
  const projects = listedWork(allProjects)

  return (
    <div className="pb-8 pt-8 sm:pt-10">
      <h1 className="text-[1.1875rem] font-medium tracking-[-0.01875rem]">Work</h1>
      <div className="prose mt-4 max-w-none">
        <p>
          I like working where product and engineering meet: deciding what
          is worth building, understanding the people it’s for, and getting
          the details right. Most of my work is in confidential money and the
          tools that make it possible.
        </p>
        <p>
          Before my twin daughters arrived, I spent a lot of time hacking
          around the world. A few favorites: <a href="https://ethglobal.com/showcase/zenny-ynkim">Zenny</a>,{" "}
          <a href="https://ethglobal.com/showcase/taptrust-12smv">TapTrust</a> and{" "}
          <a href="https://ethglobal.com/showcase/supernft-p2ahe">SuperNFT</a>.
          Those weekends introduced me to engineers who became long-term
          friends and colleagues. Hopefully I’ll be back on the road soon.
        </p>
        <p>
          I also like NFT engineering as a tool for creativity.
          <Link href="/work/chain-double"> Chain-double</Link> lets an L1
          NFT read its URI from L2 storage, with IPFS as transport. It won
          an award at HackFS in 2021.
        </p>
      </div>

      <div className="mt-12 sm:mt-16">
        <WorkList projects={projects} />
      </div>
      <p aria-hidden className="mt-14 text-center font-serif text-muted-foreground">⁂</p>
    </div>
  )
}
