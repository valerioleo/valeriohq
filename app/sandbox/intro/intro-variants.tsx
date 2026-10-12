"use client"

import Link from "next/link"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"
import { WorkPill } from "@/components/work-pill"

// Four ways to keep the bio short and let a reader ask for more. Every
// variant is followed by the real "writing" section rule, because the
// complaint is about that boundary: the current mono `expand` handle shares
// the section-label register and sits where a section label sits, so it
// reads as a toolbar item rather than the bio's last word.

const Raycash = () => <WorkPill slug="raycash" label={siteConfig.company} />
const Zama = () => <WorkPill slug="zama" label="Zama" />
const Deployoor = () => <WorkPill slug="deployoor" label="deployoor" />
const Primitives = () => (
  <WorkPill slug="confidential-primitives" label="Confidential Primitives" />
)

const COPY_CLASS = "space-y-4 text-base leading-6 tracking-[-0.00625rem]"

const Short = () => (
  <p>
    Product engineer. Tireless autodidact. Working at <Raycash />, ex{" "}
    <Zama />. Creator of <Deployoor /> and <Primitives />.
  </p>
)

const Lead = ({ children }: { children?: React.ReactNode }) => (
  <p>
    I’m a founder and engineer. I like making complicated things feel simple.
    Currently building confidential money at <Raycash />. Previously at{" "}
    <Zama />. When a tool is missing I tend to build it: that’s <Deployoor />{" "}
    and <Primitives />.{children}
  </p>
)

// The detail. Written to follow Lead without repeating it.
const More = () => (
  <>
    <p>
      I’m an avid autodidact, and AI is giving me the time of my life. I build
      my own harnesses, orchestration and skills, getting my hands dirty in
      things that used to feel out of reach. Writing is how I make sense of
      what I learn and share it clearly.
    </p>
    <p>
      At Zama I worked directly with the CEO and leaders in protocol and
      cryptography to shape what came next. With AI, I’m following the same
      instinct: experimenting with how agents work together, what context they
      need, and where human judgment matters most.
    </p>
    <p>
      I like small teams because the conversations stay connected: what someone
      needs, what the business can support, and what we can actually ship. I
      want to be close enough to all three to make good tradeoffs.
    </p>
  </>
)

const INLINE_LINK =
  "underline decoration-brand/40 underline-offset-[3px] transition-colors hover:text-brand hover:decoration-brand"

// The real boundary, reproduced: section label, rule, two rows.
const MockSection = () => (
  <div className="mt-12 sm:mt-16">
    <div className="flex items-center gap-4">
      <h3 className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
        writing
      </h3>
      <div aria-hidden className="h-px flex-1 bg-border/80" />
    </div>
    <ul className="mt-5 divide-y divide-border/70 text-muted-foreground/70">
      <li className="py-3 text-sm">Part 2 — AsyncWrapper: non-custodial deposit screening</li>
      <li className="py-3 text-sm">Deployoor. No-headaches deployments.</li>
    </ul>
  </div>
)

// A · Inline "more". The control is the last word of the sentence, in the
// body's own register. Reveal appends; nothing ever sits between the bio and
// the rule except paragraph spacing.
const InlineMore = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className={COPY_CLASS}>
      <Lead>
        {!open && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn("cursor-pointer", INLINE_LINK)}
            >
              More about me
            </button>
            .
          </>
        )}
      </Lead>
      {open && (
        <div className={cn(COPY_CLASS, "intro-copy")}>
          <More />
        </div>
      )}
    </div>
  )
}

// B · Clamp and fade. Everything is rendered; the block is clamped to three
// lines behind a gradient, and the affordance sits on the fade itself, so it
// visibly belongs to the text it uncovers.
const ClampFade = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <div
        className={cn(
          COPY_CLASS,
          !open &&
            "max-h-[4.5rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)]"
        )}
      >
        <Lead />
        <More />
      </div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "absolute bottom-0 left-0 cursor-pointer text-base leading-6",
            INLINE_LINK
          )}
        >
          Keep reading
        </button>
      )}
    </div>
  )
}

// C · No interaction. The bio stays short; the long version already lives on
// /about. The only "control" is a link, in prose register, at sentence end.
const LinkToAbout = () => (
  <div className={COPY_CLASS}>
    <Lead>
      {" "}
      <Link href="/about" className={INLINE_LINK}>
        More about me →
      </Link>
    </Lead>
  </div>
)

// D · Length picker. Keeps the original idea — several rewrites at different
// lengths — but names it as a choice of length and moves the control to the
// top, out of the rule's neighbourhood. Replacing the text is expected here
// because the reader asked for a different length, not "more".
const LENGTHS = ["short", "medium", "long"] as const
type Length = (typeof LENGTHS)[number]

const LengthPicker = () => {
  const [length, setLength] = useState<Length>("short")
  return (
    <div>
      <div
        role="group"
        aria-label="Bio length"
        className="mb-3 flex justify-end gap-2 font-mono text-xs text-muted-foreground"
      >
        {LENGTHS.map((l, i) => (
          <span key={l} className="flex gap-2">
            {i > 0 && <span aria-hidden>·</span>}
            <button
              type="button"
              aria-pressed={length === l}
              onClick={() => setLength(l)}
              className={cn(
                "cursor-pointer transition-colors hover:text-brand",
                length === l && "text-foreground"
              )}
            >
              {l}
            </button>
          </span>
        ))}
      </div>
      <div key={length} className={cn(COPY_CLASS, "intro-copy")}>
        {length === "short" && <Short />}
        {length === "medium" && <Lead />}
        {length === "long" && (
          <>
            <Lead />
            <More />
          </>
        )}
      </div>
    </div>
  )
}

const VARIANTS = [
  {
    id: "a",
    name: "A · inline more",
    pitch:
      "The control is the last word of the sentence, set in the body's own register. One click appends the detail; the text you already read stays put. Nothing sits between bio and rule.",
    Component: InlineMore,
  },
  {
    id: "b",
    name: "B · clamp and fade",
    pitch:
      "All of it is rendered, clamped to three lines behind a gradient. The affordance sits on the fade, so it visibly belongs to the text it uncovers rather than to the section below.",
    Component: ClampFade,
  },
  {
    id: "c",
    name: "C · no interaction",
    pitch:
      "The short bio ends with a link to /about, which already holds the long version. Zero client JS. The most literal answer to simplifying the site.",
    Component: LinkToAbout,
  },
  {
    id: "d",
    name: "D · length picker",
    pitch:
      "Your original idea kept honest: three rewrites at three lengths, named as such, with the control at the top where it can never meet the rule. Replacing the text feels right when the reader asked for a length.",
    Component: LengthPicker,
  },
]

export const IntroVariants = () => (
  <div className="mt-14 space-y-24">
    {VARIANTS.map(({ id, name, pitch, Component }) => (
      <section key={id} id={id} className="scroll-mt-8">
        <div className="flex items-baseline gap-4 border-b border-border pb-2">
          <h2 className="font-mono text-xs uppercase tracking-wider text-brand">
            {name}
          </h2>
        </div>
        <p className="mb-10 mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
          {pitch}
        </p>
        <Component />
        <MockSection />
      </section>
    ))}
  </div>
)
