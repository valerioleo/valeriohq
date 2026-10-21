"use client"

import { useId, useState } from "react"

import { DemoFrame } from "./demo-frame"

const plural = new Intl.PluralRules("en-GB")
const decoys = (count: number) =>
  `${count} ${plural.select(count) === "one" ? "decoy" : "decoys"}`

// A concept explainer that ties to the AsyncWrapper post: the decoy count is a
// dial the finalizer controls. More decoys = a weaker deposit→recipient link,
// but more gas. Pure state, no canvas — the simplest kind of demo.
//
// The odds are the best case. The post explains that implausible decoys
// shrink the effective crowd below its nominal size, so the label says so.
export function DecoyDial() {
  const [n, setN] = useState(8)
  const id = useId()
  const linkPct = 100 / n

  return (
    <DemoFrame
      title="Decoy dial"
      caption="Bigger crowd, weaker link, more gas. The finalizer sets the dial."
    >
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted-foreground">
        <label htmlFor={id}>batch size</label>
        <span className="tabular-nums text-foreground">
          {n} notes · {decoys(n - 1)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={2}
        max={32}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        // The slider speaks the whole trade-off, not just the number.
        aria-valuetext={`${n} notes, ${decoys(n - 1)}. At best a 1 in ${n} chance of linking your note, for ${n} times the gas.`}
        className="mt-3 w-full accent-brand"
      />

      {/* The anonymity set: n identical notes. Yours is one of them, and
          nothing on chain says which. */}
      <div className="mt-5 flex flex-wrap gap-1.5" aria-hidden>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="size-2 rounded-full bg-foreground/60" />
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
            best-case chance of linking your note
          </dt>
          <dd className="mt-1 font-mono text-lg tabular-nums">
            1 in {n}{" "}
            <span className="text-sm text-muted-foreground">
              ({linkPct.toFixed(1)}%)
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
            relative gas
          </dt>
          <dd className="mt-1 font-mono text-lg tabular-nums">
            ×{n}
            {/* No transition: the bar keeps pace with the slider. */}
            <div aria-hidden className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${(n / 32) * 100}%` }}
              />
            </div>
          </dd>
        </div>
      </dl>
    </DemoFrame>
  )
}
