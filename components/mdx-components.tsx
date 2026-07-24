import Image from "next/image"
import { MDXContent } from "@content-collections/mdx/react"

const components = {
  Image,
}

export function Mdx({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}
