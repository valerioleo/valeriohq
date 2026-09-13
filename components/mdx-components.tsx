import Image from "next/image"
import { MDXContent } from "@content-collections/mdx/react"

import { CrowdDiagram } from "@/components/post/crowd-diagram"
import { DemoFrame } from "@/components/demos/demo-frame"
import { DecoyDial } from "@/components/demos/decoy-dial"
import { RevealToggle } from "@/components/demos/reveal-toggle"
import { RaycashProduct } from "@/components/work/raycash-product"
import { ReleaseFlow } from "@/components/work/release-flow"

const components = {
  Image,
  CrowdDiagram,
  // Interactive demos. Registered here → usable by name in any post's MDX.
  DemoFrame,
  DecoyDial,
  RevealToggle,
  RaycashProduct,
  ReleaseFlow,
}

export function Mdx({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}
