import Image from "next/image"
import { MDXContent } from "@content-collections/mdx/react"

import { CrowdDiagram } from "@/components/post/crowd-diagram"
import { DemoFrame } from "@/components/demos/demo-frame"
import { DecoyDial } from "@/components/demos/decoy-dial"
import { RevealToggle } from "@/components/demos/reveal-toggle"
import { PaymentLinkFlow } from "@/components/demos/payment-link-flow"
import { AgentMoneyLoop } from "@/components/demos/agent-money-loop"
import { RaycashProduct } from "@/components/work/raycash-product"

const components = {
  Image,
  CrowdDiagram,
  // Interactive demos. Registered here → usable by name in any post's MDX.
  DemoFrame,
  DecoyDial,
  RevealToggle,
  // Animated interface diagrams (CLAUDE.md → Article illustrations).
  PaymentLinkFlow,
  AgentMoneyLoop,
  RaycashProduct,
}

export function Mdx({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}
