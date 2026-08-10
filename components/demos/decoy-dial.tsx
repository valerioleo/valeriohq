"use client"

import { useState } from "react"

import { DemoFrame } from "./demo-frame"

// A concept explainer that ties to the AsyncWrapper post: the decoy count is a
// dial the finalizer controls. More decoys = a weaker deposit→recipient link,
// but more gas. Pure state, no canvas — the simplest kind of demo.
export function DecoyDial() {
  const [n, setN] = useState(8)
  const linkPct = 100 / n

  return (
    <DemoFrame
      title="Decoy dial"
      caption="Bigger crowd, weaker link, more gas. The finalizer sets the dial."
    >
      <label className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted-foreground">
        <span>batch size</span>
        <span className="tabular-nums text-foreground">
          {n} notes · {n - 1} decoys
        </span>
      </label>
      <input
        type="range"
        min={2}
        max={32}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        aria-label="Batch size"
        className="mt-3 w-full accent-brand"
      />

      {/* The anonymity set: n identical notes. Yours is one of them, and
          nothing on chain says which. */}
      <div className="mt-5 flex flex-wrap gap-1.5" aria-hidden>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="size-2 rounded-full bg-foreground/30" />
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            chance of linking your note
          </dt>
          <dd className="mt-1 font-mono text-lg tabular-nums">
            1 in {n}{" "}
            <span className="text-sm text-muted-foreground">
              ({linkPct.toFixed(1)}%)
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            relative gas
          </dt>
          <dd className="mt-1 font-mono text-lg tabular-nums">×{n}</dd>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-brand/70 transition-[width] duration-200"
              style={{ width: `${(n / 32) * 100}%` }}
            />
          </div>
        </div>
      </dl>
    </DemoFrame>
  )
}
