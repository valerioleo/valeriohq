"use client"

import { useState } from "react"

// A frameless, shrunk teaser of the decoy dial — small enough to live on a
// homepage card and still be touchable, so an interactive post reads as more
// than a title before you even open it.
export function MiniDial() {
  const [n, setN] = useState(6)
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[11px] text-muted-foreground">
        <span>drag me</span>
        <span className="tabular-nums text-foreground">
          1 in {n} ({(100 / n).toFixed(0)}%)
        </span>
      </div>
      <input
        type="range"
        min={2}
        max={16}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        aria-label="Decoy batch size (drag me)"
        className="mt-2 w-full accent-brand"
      />
      <div className="mt-2 flex flex-wrap gap-1" aria-hidden>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="size-1.5 rounded-full bg-foreground/30" />
        ))}
      </div>
    </div>
  )
}
