"use client"

import { cn } from "@/lib/utils"
import { DemoFrame } from "./demo-frame"
import { Sequence, reveal } from "./sequence"
import { Status, Step, Steps, Window, type StepStatus } from "./ui"

// One idea: an agent gets a task, works through it as visible steps, answers,
// and later the claim arrives as a new step it can act on.
// States: 0 prompt · 1–3 the three thinking steps go live in turn · 4 Done and
// the reply · 5 the claim arrives as an update · 6 the agent acts on it (hold).
const DURATIONS = [1200, 1000, 1100, 1000, 1500, 1300, 0]

// Status of the step that goes live at state `at`.
const statusAt = (step: number, at: number): StepStatus =>
  step > at ? "complete" : step === at ? "active" : "pending"

const Line = ({ who, on, children }: { who: string; on: boolean; children: React.ReactNode }) => (
  <div className={cn("grid grid-cols-[3.25rem_1fr] items-baseline gap-3", reveal(on))}>
    <Status>{who}</Status>
    <div className="text-sm">{children}</div>
  </div>
)

export const AgentMoneyLoop = () => (
  <DemoFrame
    kind="diagram"
    title="Agent · payment link"
    caption="Ask, and the link is made. The claim comes back as a fact the agent can act on."
  >
    <Sequence
      durations={DURATIONS}
      label="You ask an agent to send Acme the invoice with a payment link. It reads the invoice, creates a confidential payment link for $1,200, attaches it to the email and replies. Later the claim arrives as an update and the agent marks the invoice settled."
    >
      {({ step }) => (
        <Window title="Agent" className="min-h-[19rem]">
          <div className="space-y-4">
            <Line who="you" on>
              Send Acme the invoice with a payment link.
            </Line>

            <div className={cn("pl-[3.25rem]", reveal(step >= 1))}>
              <Steps header="Thinking" done={step >= 4}>
                <Step
                  status={statusAt(step, 1)}
                  label="Read the invoice"
                  details={["invoice-acme.pdf", "acme-contact.md"]}
                />
                <Step
                  status={statusAt(step, 2)}
                  label="Create a payment link"
                  description="$1,200.00 · confidential"
                />
                <Step
                  status={statusAt(step, 3)}
                  label="Attach the link to the email"
                  description="To: Acme Co."
                  last
                />
              </Steps>
            </div>

            <Line who="agent" on={step >= 4}>
              Sent. Acme has the invoice and a link to pay it.
            </Line>

            <div className={cn("pl-[3.25rem]", reveal(step >= 5))}>
              <Steps header="Update" done={step >= 6}>
                <Step
                  status={statusAt(step, 5)}
                  label="Payment link claimed"
                  description="$1,200.00 · received"
                  last
                />
              </Steps>
            </div>

            <Line who="agent" on={step >= 6}>
              Acme paid. Marked the invoice settled.
            </Line>
          </div>
        </Window>
      )}
    </Sequence>
  </DemoFrame>
)
