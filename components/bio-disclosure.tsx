"use client"

import { useRef, type ReactNode } from "react"
import { track } from "@vercel/analytics"

// Native disclosure keeps the biography readable without JavaScript. Only
// the first expansion in this page visit is counted, including keyboard use.
export function BioDisclosure({ children }: { children: ReactNode }) {
  const tracked = useRef(false)

  return (
    <details
      className="group mt-6"
      onToggle={(event) => {
        if (!event.currentTarget.open || tracked.current) return
        tracked.current = true
        track("bio_expanded", { placement: "home" })
      }}
    >
      <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        A little more about me
        <span aria-hidden className="inline-block transition-transform group-open:rotate-90">→</span>
      </summary>
      <div className="space-y-6 pt-4 font-serif text-lg leading-relaxed">
        {children}
      </div>
    </details>
  )
}
