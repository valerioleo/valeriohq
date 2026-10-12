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
// Disc is 1.15em of the 16px reading size (~18px). The chip is nudged 2px
// down so it sits on the surrounding Inter line instead of floating above it.
export function WorkPill({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      href={`/work/${slug}`}
      className="inline-flex translate-y-[2px] items-center gap-[0.2em] whitespace-nowrap rounded-full bg-muted/60 py-[0.12em] pl-[0.12em] pr-[0.3em] align-baseline leading-none transition-colors hover:text-brand"
    >
      <BrandIcon slug={slug} className="size-[1.15em]" />
      <span>{label}</span>
    </Link>
  )
}
