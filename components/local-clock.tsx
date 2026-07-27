"use client"

import * as React from "react"

import { siteConfig } from "@/lib/config"

// The "live element" signature touch. Valerio is in one place, readers are
// everywhere. Tiny client island, updates every 30s. Renders the place name
// on its own until hydrated so there's no server/client mismatch.
export function LocalClock() {
  const [time, setTime] = React.useState<string | null>(null)

  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: siteConfig.timeZone,
      }).format(new Date())

    setTime(format())
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-xs tabular-nums" suppressHydrationWarning>
      {time ? `${siteConfig.location} ${time}` : siteConfig.location}
    </span>
  )
}
