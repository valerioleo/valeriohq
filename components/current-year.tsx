"use client"

import * as React from "react"

// The copyright year, resolved on the client so it can never go stale —
// this page is static HTML, so anything computed server-side is frozen at
// build time and would read "2026" forever until the next deploy.
//
// `initial` is the build-time year and exists only so the static HTML ships
// a complete line (crawlers and no-JS readers see a year, and there's no
// layout shift on hydration). The effect then corrects it if the real year
// has moved on since the last deploy.
export function CurrentYear({ initial }: { initial: number }) {
  const [year, setYear] = React.useState(initial)

  React.useEffect(() => {
    const actual = new Date().getFullYear()
    if (actual !== initial) setYear(actual)
  }, [initial])

  return <>{year}</>
}
