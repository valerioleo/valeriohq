import Link from "next/link"

// An inline work reference that reads as part of the sentence.
//
// Vertical alignment is the fiddly part, and it's three constraints at once:
// the pill must look centred on the line, its padding must be even top and
// bottom, and the label must sit on the surrounding baseline. They conflict
// because the label's line box has more dead space above the caps (ascent −
// cap height) than below the baseline (descent), so centring the icon on that
// box lifts the whole pill. Measured at 18px/1.625 the gap is 0.065em, so:
// the pill drops 0.065em onto the line's optical centre, and the label is
// lifted back by the same amount to land on the baseline. Transforms don't
// affect layout, so the icon stays centred in even padding.
//
// The pill then carries a further ~1px (at 18px) of lift on top of that
// computed position — the round icon reads a touch low against the letters
// without it. Kept in em so it holds if the type size changes.
export function WorkPill({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      href={`/work/${slug}`}
      className="inline-flex -translate-y-[0.09em] items-center gap-1 whitespace-nowrap rounded-full border border-border/60 bg-card/70 p-1 align-middle leading-none transition-colors hover:border-foreground/30"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brands/${slug}.png`}
        alt=""
        className="size-[1.05em] shrink-0 rounded-full bg-white object-cover"
      />
      <span className="-translate-y-[0.065em]">{label}</span>
    </Link>
  )
}
