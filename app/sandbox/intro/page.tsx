import type { Metadata } from "next"

import { IntroVariants } from "./intro-variants"

export const metadata: Metadata = {
  title: "Intro variants",
  robots: { index: false, follow: false },
}

const IntroSandboxPage = () => (
  <div className="pb-24 pt-8 sm:pt-12">
    <header>
      <h1 className="text-[1.1875rem] font-medium tracking-[-0.01875rem]">
        Intro — four ways to ask for more
      </h1>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
        The same bio, four disclosure patterns, each followed by the real
        section rule so the boundary can be judged. Click around.
      </p>
    </header>
    <IntroVariants />
  </div>
)

export default IntroSandboxPage
