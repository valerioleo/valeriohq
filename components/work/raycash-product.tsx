import Image from "next/image"

import { siteConfig } from "@/lib/config"

// Public product artwork from raycash.xyz/images/landing/phone-home.png.
// Kept locally with its original dimensions; next/image serves smaller sizes.
export function RaycashProduct() {
  return (
    <figure className="not-prose my-10 grid gap-6 border-y border-border/80 py-8 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-10">
      <Image
        src="/work/raycash-home.png"
        alt={`${siteConfig.company} mobile app showing a balance, pending deposits and payment controls`}
        width={854}
        height={1781}
        preload
        sizes="(min-width: 640px) 200px, 180px"
        className="mx-auto h-auto w-[180px] sm:w-[200px]"
      />
      <figcaption>
        <p className="font-serif text-xl leading-snug">Private money, ordinary interactions.</p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
          A balance, a deposit, a payment. Underneath the familiar interface,
          the contracts work with encrypted amounts. The engineering has to
          connect those two worlds.
        </p>
        <a href="https://www.raycash.xyz" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-8 items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-brand">
          {siteConfig.company} product preview <span aria-hidden>↗</span>
        </a>
      </figcaption>
    </figure>
  )
}
