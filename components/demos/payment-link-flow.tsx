"use client"

import { cn } from "@/lib/utils"
import { DemoFrame } from "./demo-frame"
import { Sequence, reveal } from "./sequence"
import { Bar, Btn, Bubble, Chip, Cursor, Field, Status, Window } from "./ui"

// One idea: a payment becomes a link, travels through the app the sender
// already uses, and the recipient claims it in Raycash without setting
// anything up first.
// States: 0 establish · 1 tap Create · 2 link exists · 3 share sheet, pick
// WhatsApp · 4 link lands in the chat · 5 tap Claim in the chat · 6 Raycash
// opens on the claim screen, tap Claim · 7 hold on the balance.
const DURATIONS = [1300, 900, 1200, 1400, 1300, 1000, 1100, 0]

const APPS = ["Messages", "WhatsApp", "Mail", "More"]

// A screen that slides up over a window's body, like an app opening.
const sheet = (open: boolean) =>
  cn(
    "absolute -inset-3 sm:-inset-4 bg-background px-3 pb-3 pt-3 sm:px-4 motion-safe:transition-all motion-safe:duration-400",
    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
  )

export const PaymentLinkFlow = () => (
  <DemoFrame
    kind="diagram"
    title="Payment link"
    caption="A link holds the money. Whoever opens it, has it. No address to ask for, no account to open first."
  >
    <Sequence
      durations={DURATIONS}
      label="In the Raycash app a sender enters $50, creates a payment link and shares it through WhatsApp. The recipient opens the chat, taps Claim, the Raycash app opens on the claim screen, and their balance shows plus $50."
    >
      {({ step }) => (
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Sender, inside Raycash */}
          <Window title="You · Raycash" className="min-h-[13.5rem]">
            <div className="relative">
              <Field label="Send" value="$50.00" />
              <div className="mt-3 space-y-2">
                <Bar w="55%" />
                <Bar w="40%" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Btn active={step === 1}>Create link</Btn>
                <Chip accent={step >= 2 && step < 7} className={reveal(step >= 2)}>
                  <span aria-hidden>⛓</span>
                  {step >= 7 ? "link · claimed" : "Copy link"}
                </Chip>
              </div>

              {/* Share sheet over the sender's screen at state 3 */}
              <div
                className={cn(
                  "absolute inset-x-0 -bottom-3 sm:-bottom-4 -mx-3 sm:-mx-4 rounded-t-lg border-t border-border bg-background px-3 pb-3 pt-2.5 motion-safe:transition-all motion-safe:duration-400",
                  step === 3 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
                )}
              >
                <Status>Share link</Status>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {APPS.map(app => (
                    <div key={app} className="flex flex-col items-center gap-1">
                      <span
                        aria-hidden
                        className={cn(
                          "size-8 rounded-lg border transition-colors",
                          app === "WhatsApp" && step === 3
                            ? "border-brand bg-brand/10"
                            : "border-border bg-muted"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[10px]",
                          app === "WhatsApp" ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {app}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Cursor
              x={step === 1 ? 22 : step === 3 ? 39 : 80}
              y={step === 1 ? 68 : step === 3 ? 78 : 88}
              visible={step === 1 || step === 3}
            />
          </Window>

          {/* Recipient: WhatsApp, then Raycash opens over it */}
          <Window
            title={step >= 6 ? "Recipient · Raycash" : "Recipient · WhatsApp"}
            className="min-h-[13.5rem]"
          >
            <div className="relative">
              <div className="space-y-2">
                <Bubble>
                  <Bar w="7rem" />
                </Bubble>
                <Bubble mine>
                  <Bar w="5rem" />
                </Bubble>
                <Bubble className={cn("border-brand/40", reveal(step >= 4))}>
                  <Chip accent={step >= 4 && step < 6}>
                    <span aria-hidden>⛓</span>
                    Payment link · $50.00
                  </Chip>
                  <div className="mt-2">
                    <Btn active={step === 5}>Claim</Btn>
                  </div>
                </Bubble>
              </div>

              {/* The Raycash app, opened from the chat at state 6 */}
              <div className={sheet(step >= 6)}>
                <Field label="Payment link" value="$50.00" />
                <Status className="mt-1 block">from a link shared in WhatsApp</Status>
                <div className="mt-4">
                  <Btn active={step === 6}>{step >= 7 ? "Claimed" : "Claim"}</Btn>
                </div>
                <div
                  className={cn(
                    "mt-4 flex items-center justify-between border-t border-border pt-2",
                    reveal(step >= 7)
                  )}
                >
                  <Status>Balance</Status>
                  <span className="font-mono text-sm tabular-nums text-brand">+ $50.00</span>
                </div>
              </div>
            </div>
            <Cursor
              x={step === 5 ? 22 : 18}
              y={step === 5 ? 64 : 56}
              visible={step === 5 || step === 6}
            />
          </Window>
        </div>
      )}
    </Sequence>
  </DemoFrame>
)
