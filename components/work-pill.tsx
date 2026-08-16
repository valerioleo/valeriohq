import Link from "next/link"

import { BrandIcon } from "@/components/project-logo"

// An inline work reference that reads as part of the sentence.
//
// The mark is the full-colour brand icon on purpose (Valerio's call, after a
// monochrome-SVG pass was tried): the three coloured discs are deliberate
// variance in an otherwise near-monochrome page. No border, matching the
// navbar rule: outlines are for buttons, and this is a link — the tinted
// surface alone marks it as a reference. Hover feedback is colour-only, on
// the label.
//
// Vertical alignment is the fiddly part, three constraints at once: the pill
// must look centred on the line, its padding must be even top and bottom, and
// the label must sit on the surrounding baseline. They conflict because the
// label's line box has more dead space above the caps (ascent − cap height)
// than below the baseline (descent), so centring the icon on that box lifts
// the whole pill. Measured at 18px/1.625 the gap is 0.065em: the pill drops
// 0.065em onto the line's optical centre, and the label is lifted back by the
// same amount to land on the baseline. A further ~1px of lift keeps the round
// icon from reading a touch low against the letters. Kept in em so it holds
// if the type size changes.
export function WorkPill({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      href={`/work/${slug}`}
      // Padding is asymmetric on purpose: the LEFT inset equals the vertical
      // inset (0.16em), so the round icon sits concentric inside the chip's
      // rounded end — even left padding is what makes the pill read as
      // homogeneous. The RIGHT side gets more (0.3em) because that edge
      // borders text, and the trailing comma tucks into its corner radius.
      // Surface is muted at 60%: card/70 sat too close to the page in both
      // themes and the chips nearly vanished. Muted is the step the palette
      // already reserves for "slightly apart from the page," without a border.
      className="inline-flex -translate-y-[0.09em] items-center gap-1 whitespace-nowrap rounded-full bg-muted/60 py-[0.16em] pl-[0.16em] pr-[0.3em] align-middle leading-none transition-colors hover:text-brand"
    >
      <BrandIcon slug={slug} className="size-[1.15em]" />
      {/* The 3px top padding is a correction for the Petrona swap: the em-based
          lift above was measured against Literata's ascent/descent, and
          Petrona sits the label higher in its line box. Kept in px because it
          is a fixed optical nudge, not a proportional one — revisit if the
          pills ever appear at a size other than the hero's 18px. */}
      <span className="-translate-y-[0.065em] pt-[3px]">{label}</span>
    </Link>
  )
}
