"use client"

import * as React from "react"

// The copyright year, resolved on the client so it can never go stale —
// this page is static HTML, so anything computed server-side is frozen at
// build time and would read "2026" forever until the next deploy.
//
// `initial` is the build-time year and exists only so the static HTML ships
// a complete line (crawlers and no-JS readers see a year, and there's no
// layout shift on hydration). Once hydrated, the client's year takes over
// if it has moved on since the last deploy.
const subscribeNever = () => () => undefined
const thisYear = () => new Date().getFullYear()

export function CurrentYear({ initial }: { initial: number }) {
  const year = React.useSyncExternalStore(
    subscribeNever,
    thisYear,
    () => initial
  )

  return <>{year}</>
}
