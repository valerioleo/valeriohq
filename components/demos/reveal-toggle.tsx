"use client"

import { useState } from "react"
import { Lock, LockOpen } from "lucide-react"

import { DemoFrame } from "./demo-frame"

// A tiny, on-brand demo: a confidential balance is ciphertext on chain; only
// the key-holder can turn it back into a number. Shows how a demo can carry a
// product idea in two lines of interaction.
//
// The button's label says what it will do next, so it carries no pressed
// state on top. The balance is a polite live region: a screen reader hears
// the number arrive, and the dots read as "encrypted" rather than bullets.
export function RevealToggle() {
  const [open, setOpen] = useState(false)

  return (
    <DemoFrame
      title="Confidential balance"
      caption="On-chain it’s a ciphertext handle. Only the key-holder can read it as a number."
    >
      <div className="flex items-center justify-between gap-4">
        <div aria-live="polite">
          <div className="font-mono text-2xl tabular-nums">
            {open ? (
              "2,000.00"
            ) : (
              <>
                <span aria-hidden>••••••••</span>
                <span className="sr-only">Encrypted</span>
              </>
            )}{" "}
            <span className="text-sm text-muted-foreground">rUSDC</span>
          </div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">
            {open
              ? "decrypted locally · only you can do this"
              : "encrypted on-chain · euint64 handle"}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-w-[6.5rem] shrink-0 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs lowercase transition-colors hover:border-brand hover:text-brand"
        >
          {/* Both glyphs share one cell and cross-fade (.swap-icon in
              globals.css), at the theme toggle's 1.5px stroke. */}
          <span aria-hidden data-animate="" className="grid">
            <Lock
              size={14}
              strokeWidth={1.5}
              absoluteStrokeWidth
              data-hidden={open ? "" : undefined}
              className="swap-icon"
            />
            <LockOpen
              size={14}
              strokeWidth={1.5}
              absoluteStrokeWidth
              data-hidden={open ? undefined : ""}
              className="swap-icon"
            />
          </span>
          {open ? "Hide" : "Decrypt"}
        </button>
      </div>
    </DemoFrame>
  )
}
