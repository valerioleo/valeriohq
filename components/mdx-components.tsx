import Image from "next/image"
import { MDXContent } from "@content-collections/mdx/react"

import { CrowdDiagram } from "@/components/post/crowd-diagram"
import { DemoFrame } from "@/components/demos/demo-frame"
import { DecoyDial } from "@/components/demos/decoy-dial"
import { RevealToggle } from "@/components/demos/reveal-toggle"
import { PaymentLinkFlow } from "@/components/demos/payment-link-flow"
import { AgentMoneyLoop } from "@/components/demos/agent-money-loop"
import { RaycashProduct } from "@/components/work/raycash-product"
import { WorkPill } from "@/components/work-pill"
import { AutoplayVideo } from "@/components/autoplay-video"

// A wide table scrolls inside its own box instead of pushing the page
// sideways on a narrow screen.
const Table = (props: React.ComponentProps<"table">) => (
  <div className="my-8 overflow-x-auto [&>table]:my-0">
    <table {...props} />
  </div>
)

// A comparison table's empty corner is a plain cell, not a header with no
// name for the column of row labels beneath it.
const Th = ({ children, ...props }: React.ComponentProps<"th">) =>
  children ? <th {...props}>{children}</th> : <td {...props} />

const components = {
  Image,
  table: Table,
  th: Th,
  CrowdDiagram,
  // Interactive demos. Registered here → usable by name in any post's MDX.
  DemoFrame,
  DecoyDial,
  RevealToggle,
  // Animated interface diagrams (CLAUDE.md → Article illustrations).
  PaymentLinkFlow,
  AgentMoneyLoop,
  RaycashProduct,
  // Inline work bubble; Notion's {{pill <slug>}} sign becomes one on sync.
  WorkPill,
  // Demo videos synced from Notion: play once in view, rest on the poster.
  AutoplayVideo,
}

export function Mdx({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}
