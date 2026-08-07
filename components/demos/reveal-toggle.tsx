"use client"

import { useState } from "react"
import { Lock, LockOpen } from "lucide-react"

import { DemoFrame } from "./demo-frame"

// A tiny, on-brand demo: a confidential balance is ciphertext on chain; only
// the key-holder can turn it back into a number. Shows how a demo can carry a
// product idea in two lines of interaction.
export function RevealToggle() {
  const [open, setOpen] = useState(false)

  return (
    <DemoFrame
      title="Confidential balance"
      caption="On-chain it's a ciphertext handle. Only the key-holder can read it as a number."
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-2xl tabular-nums">
            {open ? "2,000.00" : "••••••••"}{" "}
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
          aria-pressed={open}
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs transition-colors hover:border-brand hover:text-brand"
        >
          {open ? (
            <LockOpen className="size-3.5" />
          ) : (
            <Lock className="size-3.5" />
          )}
          {open ? "hide" : "decrypt"}
        </button>
      </div>
    </DemoFrame>
  )
}
