"use client"

import * as React from "react"

// The "live element" signature touch — Valerio is in London; readers are
// everywhere. Tiny client island, updates every 30s. Renders "London" until
// hydrated so there's no server/client mismatch.
export function LondonClock() {
  const [time, setTime] = React.useState<string | null>(null)

  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/London",
      }).format(new Date())

    setTime(format())
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-xs tabular-nums" suppressHydrationWarning>
      {time ? `London ${time}` : "London"}
    </span>
  )
}
