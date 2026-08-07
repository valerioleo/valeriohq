import { MiniDial } from "./mini-dial"
import { CrowdDiagram } from "@/components/post/crowd-diagram"

// Per-post visuals for the homepage "interactive" strip, keyed by slug.
//
// - postTeasers: a live, touchable widget for the featured card (variant C).
// - postPosters: a static visual for the other cards (variant B). Falls back
//   to DefaultPoster when a post hasn't registered one.
//
// A new interactive post appears in the strip on its `interactive: true` flag
// alone; registering media here is optional polish, not a requirement.
export const postTeasers: Record<string, React.ComponentType> = {
  "asyncwrapper-anonymous-on-ramp": MiniDial,
}

export const postPosters: Record<string, React.ComponentType> = {
  "asyncwrapper-anonymous-on-ramp": function AsyncWrapperPoster() {
    return <CrowdDiagram className="mx-auto max-w-[60%]" />
  },
}

// A minimal "interactive" motif — a knob on a track — for posts without a
// registered poster.
export function DefaultPoster() {
  return (
    <svg
      viewBox="0 0 200 40"
      role="img"
      aria-hidden="true"
      className="mx-auto h-10 w-full max-w-[70%]"
    >
      <line
        x1={20}
        y1={20}
        x2={180}
        y2={20}
        className="stroke-foreground/25"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={124} cy={20} r={7} className="fill-brand/70" />
    </svg>
  )
}
