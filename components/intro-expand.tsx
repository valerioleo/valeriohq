"use client"

import Link from "next/link"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

// The bio at five lengths. Each step swaps the copy for the next, longer
// rewrite — a change of length the reader asked for, not an append.
//
// The control is the last words of the current copy, set in prose register
// (the site's rust-underlined link) with the glare running over it. It is
// never a standalone element under the bio: a mono handle there shares the
// section-label register and reads as a toolbar item against the rule below.
// At full length the slot becomes the invitation to talk.

// Prose-register link, in the full-strength ink so it stands out from the
// softer body.
const LINK =
  "text-ink underline decoration-brand/40 underline-offset-[3px] transition-colors hover:decoration-brand"

// Work names are plain links: the work list right below carries the logos,
// so the bio doesn't repeat them.
const Work = ({ slug, children }: { slug: string; children: React.ReactNode }) => (
  <Link href={`/work/${slug}`} className={cn(LINK, "hover:text-brand")}>
    {children}
  </Link>
)

const Raycash = () => <Work slug="raycash">{siteConfig.company}</Work>
const Zama = () => <Work slug="zama">Zama</Work>
const Deployoor = () => <Work slug="deployoor">deployoor</Work>
const Primitives = () => (
  <Work slug="confidential-primitives">Confidential Primitives</Work>
)

// One entry per length; each entry is its paragraphs. The control is appended
// to the last paragraph at render time.
const LEVELS: React.ReactNode[][] = [
  [
    <>
      Product engineer. Team leader. Tireless autodidact. Building{" "}
      <Raycash />, ex{" "}
      <Zama />. Creator of <Deployoor /> and <Primitives />.
    </>,
  ],
  [
    <>
      I’m a founder, engineer and team leader. I like making complicated things feel
      simple. Currently building confidential money at <Raycash />.
      Previously at <Zama />. When a tool is missing I tend to build it:
      that’s <Deployoor /> and <Primitives />.
    </>,
  ],
  [
    <>
      I’m a founder, engineer and team leader. I like making complicated things feel
      simple: the business behind a product, the people using it, and the
      details that make it feel right.
    </>,
    <>
      I’m an avid autodidact. Currently building confidential money at{" "}
      <Raycash />. Previously at <Zama />, working directly with the CEO and
      leaders in protocol and cryptography. When a tool is missing, I tend to
      build it. That’s where <Deployoor /> came from.
    </>,
  ],
  [
    <>
      I’m a founder, engineer and team leader. I like making complicated things feel
      simple: the business behind a product, the people using it, and the
      details that make it feel right.
    </>,
    <>
      I’m an avid autodidact, and AI is giving me the time of my life. I build
      my own harnesses, orchestration and skills. Writing is how I make sense
      of what I learn and share it clearly.
    </>,
    <>
      Currently building confidential money at <Raycash />. Previously at{" "}
      <Zama />. When a tool is missing, I tend to build it. That’s where{" "}
      <Deployoor /> came from. With AI, I’m following the same instinct:
      experimenting with how agents work together, what context they need,
      and where human judgment matters most.
    </>,
  ],
  [
    <>
      I’m a founder, engineer and team leader. I like making complicated things feel
      simple. That means caring about the whole product: the business behind
      it, the people using it, and the details that make it feel right.
    </>,
    <>
      I’m an avid autodidact, and AI is giving me the time of my life. I build
      my own harnesses, orchestration and skills, getting my hands dirty in
      things that used to feel out of reach. Writing is how I make sense of
      what I learn and share it clearly.
    </>,
    <>
      Currently building confidential money at <Raycash />. Previously at{" "}
      <Zama />, where I worked directly with the CEO and leaders in protocol
      and cryptography to shape what came next. When a tool is missing, I
      tend to build it. That’s where <Deployoor /> came from. With AI, I’m
      following the same instinct: experimenting with how agents work
      together, what context they need, and where human judgment matters
      most.
    </>,
    <>
      I like small teams because the conversations stay connected: what
      someone needs, what the business can support, and what we can actually
      ship. I want to be close enough to all three to make good tradeoffs.
    </>,
  ],
]
const LAST = LEVELS.length - 1

export const IntroExpand = () => {
  const [level, setLevel] = useState(0)
  const atEnd = level === LAST
  const paragraphs = LEVELS[level]

  return (
    <section aria-labelledby="introduction">
      <h1 id="introduction" className="sr-only">
        {siteConfig.name}, founder, engineer and team leader
      </h1>
      <div
        key={level}
        id="intro-copy"
        // Body text size, like benji.org: 14px on a 20px line, 16px between
        // paragraphs.
        className={cn("space-y-4", level > 0 && "intro-copy")}
        aria-live="polite"
      >
        {paragraphs.map((content, i) => (
          <p key={i}>
            {content}
            {i === paragraphs.length - 1 &&
              (atEnd ? (
                <>
                  {" "}
                  <a
                    href={siteConfig.links.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(LINK, "hover:text-brand")}
                  >
                    Talk to me →
                  </a>
                </>
              ) : (
                <>
                  {" "}
                  {/* A caption, not a link: smaller, semibold, faint and
                      never underlined, so it can't be mistaken for the work
                      links in the sentence before it. */}
                  <button
                    type="button"
                    onClick={() => setLevel(n => Math.min(n + 1, LAST))}
                    aria-label={`Show a longer introduction, ${level + 2} of ${LEVELS.length}`}
                    className="intro-expand-handle cursor-pointer text-[0.8125rem] font-semibold"
                  >
                    <span className="intro-shimmer">More about me</span>
                  </button>
                </>
              ))}
          </p>
        ))}
      </div>
    </section>
  )
}
