import Link from "next/link"

import { cn } from "@/lib/utils"
import { BrandIcon } from "@/components/project-logo"

// The "everything else" pill: a stacked row of marks standing in for the work
// that doesn't get named in the hero sentence, linking to /work.
//
// Three real marks (pinkwhale, chain-double, Innovate UK) and two gradient
// placeholders still waiting for their logos. A slug entry renders BrandIcon
// inside the disc; a css entry renders the gradient. The wrapper disc carries
// an opaque muted ground so transparent marks (the whale) don't let the
// neighbour show through the overlap.
//
// Order is the stacking order. There's no z-index, so paint order follows the
// DOM (later paints on top) and the negative margin makes each disc overlap
// the one to its left — so the *last* entry is the rightmost and the top of
// the stack. The gradient placeholders go first (bottom-left, behind) and the
// real marks last (top-right, fully visible), so a recognisable logo always
// crowns the stack.
//
// Gradient palette is drawn from the site's own colours (sand, sage) rather
// than arbitrary hues. Written as inline CSS gradients, not Tailwind gradient
// utilities, because v3 (`bg-gradient-to-br`) and v4 (`bg-linear-to-br`) spell
// them differently and this shouldn't break on an upgrade.
const MARKS: { name: string; slug?: string; css?: string }[] = [
  { name: "sage", css: "linear-gradient(135deg, #9dbaa6 0%, #3f5d4e 100%)" },
  { name: "sand", css: "linear-gradient(135deg, #e3c483 0%, #b07d3a 100%)" },
  { name: "innovate-uk", slug: "innovate-uk" },
  { name: "chain-double", slug: "chain-double" },
  { name: "pinkwhale", slug: "pinkwhale" },
]

export function MorePill({
  label,
  logoPosition = "left",
}: {
  label: string
  // Which side the stacked marks sit on. The tight inset always goes against
  // the marks and the roomier inset against the text, so both layouts read as
  // "discs tucked concentrically into the rounded end."
  logoPosition?: "left" | "right"
}) {
  const marks = (
    <span className="flex shrink-0 items-center">
      {MARKS.map((m, i) => (
        <span
          key={m.name}
          aria-hidden="true"
          className={cn(
            "grid size-[1.15em] place-items-center overflow-hidden rounded-full bg-muted",
            // The ring is the page ground showing through, which is what
            // makes overlapping discs read as separate objects rather than
            // one blob. Follows the theme, so it works light and dark.
            "ring-[0.075em] ring-background",
            // Overlap by roughly a third. The first disc keeps its full
            // inset; every one after slides back under its neighbour.
            i > 0 && "-ml-[0.38em]"
          )}
          style={m.css ? { backgroundImage: m.css } : undefined}
        >
          {m.slug && (
            // Every brand mark is a self-grounded disc, so it fills the
            // slot edge to edge.
            <BrandIcon slug={m.slug} className="size-full" />
          )}
        </span>
      ))}
    </span>
  )

  // Matches WorkPill's baseline correction for Petrona — see the note there.
  // Both pills must carry the same nudge or they misalign against each other on
  // the same line.
  const text = (
    <span className="-translate-y-[0.065em] pt-[3px]">{label}</span>
  )

  const logosRight = logoPosition === "right"

  return (
    <Link
      href="/work"
      // Geometry is copied from WorkPill on purpose so the two chips sit on the
      // same line identically: the 0.09em drop onto the line's optical centre,
      // the 0.065em lift that puts the label back on the baseline, and the
      // asymmetric padding (even inset on the marks' side so the end disc reads
      // concentric inside the rounded end, more on the text side).
      className={cn(
        "inline-flex -translate-y-[0.09em] items-center gap-1 whitespace-nowrap rounded-full bg-muted/60 py-[0.16em] align-middle leading-none transition-colors hover:text-brand",
        logosRight ? "pl-[0.3em] pr-[0.16em]" : "pl-[0.16em] pr-[0.3em]"
      )}
    >
      {logosRight ? (
        <>
          {text}
          {marks}
        </>
      ) : (
        <>
          {marks}
          {text}
        </>
      )}
    </Link>
  )
}
