import Image from "next/image"

import { cn } from "@/lib/utils"

// Brand icons for the work entries: the original full-colour marks, always as
// discs. PNGs for raycash/zama/deployoor, inline SVG for the rest. Used by the
// pills, the lists and the project-page title — the same icon everywhere,
// never recoloured.

// Lets callers lay out a fallback when a project has no brand mark.
// True for every slug BrandIcon can render: the PNG trio plus the inline-SVG
// marks (pinkwhale, chain-double, innovate-uk) and the GitHub stand-in for
// confidential-primitives.
const BRAND_SLUGS = [
  "raycash",
  "zama",
  "deployoor",
  "pinkwhale",
  "chain-double",
  "innovate-uk",
  "confidential-primitives",
]
export function hasProjectLogo(slug: string) {
  return BRAND_SLUGS.includes(slug)
}

// The brand icon, everywhere a project is named: hero pills, list rows, the
// project-page title. Valerio's call — the colour is deliberate variance in an
// otherwise near-monochrome page, and the icon is an identifier, so it is
// never recoloured. No white disc behind the PNGs: `bg-white` + `rounded-full`
// left a 1px AA halo (loudest on Zama's opaque black square); the PNGs carry
// their own ground, and the inline SVGs are drawn as discs.
export function BrandIcon({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  // Inline-SVG brands. Vendored from the original artwork with only lossless
  // trims: chrome attributes dropped, chain-double's square ground redrawn as
  // a circle so it's natively a disc, Innovate UK reduced to the UKRI square
  // (wordmark removed) and set on a disc with the monogram inset so the
  // circle never clips it.
  switch (slug) {
    case "pinkwhale":
      // Apple-touch treatment from pinkwhale.valeriohq.com: hot-pink whale
      // (#ff5fa2) on the site's navy (#0d1b26). Disc so the brand row still
      // reads as one family. Whale inset so fins never touch the rim.
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className={cn("shrink-0", className)}
        >
          <circle cx="24" cy="24" r="24" fill="#0d1b26"/>
          <g transform="translate(9.3 11.4) scale(1.05)">
            <path fillRule="evenodd" clipRule="evenodd" d="M27.1706 6.36452C26.4095 2.89934 23.3649 0.425636 19.8397 0.165247C16.8853 -0.0550824 14.2814 -0.0550824 11.4171 0.165247C7.80167 0.425636 4.66698 2.99949 4.06608 6.59486C3.51526 9.86976 3.51526 12.9644 4.16623 16.8202V16.8502C4.15622 17.2408 4.01601 17.5412 3.60539 17.9218C3.32497 18.0219 3.18476 18.0019 2.92437 17.9218C2.50374 17.6814 2.43364 17.4912 2.33349 17.2007C2.30344 17.1306 2.28341 17.0605 2.24336 16.9804L2.08312 16.2493C2.56383 15.9689 2.85427 15.8287 3.43514 15.6684V15.2478C2.90434 15.3379 2.60389 15.3279 2.08312 15.2478L1.82273 15.6684H1.51226L1.41211 15.2478C0.851273 15.3379 0.540809 15.3279 0 15.2478V15.6684C0.671004 15.7786 0.991483 15.9088 1.51226 16.2493L1.46219 16.9804C1.46219 16.9804 1.41211 17.5012 1.51226 18.3424C1.61241 19.1837 2.22333 19.9649 3.0746 20.8061C5.42812 22.6088 7.35099 23.0495 10.4657 23.3699C10.8162 23.4501 11.1767 23.5001 11.5473 23.5302C14.5317 23.7605 17.1857 23.7505 20.1802 23.4801C23.5252 23.1797 26.4496 20.8762 27.2207 17.5913C28.072 13.9559 28.102 10.6309 27.1706 6.37453V6.36452ZM19.4691 14.6769C19.4691 13.7656 20.4606 13.0245 21.6824 13.0245C22.9043 13.0245 23.8957 13.7656 23.8957 14.6769C23.8957 15.5883 22.9043 16.3294 21.6824 16.3294C20.4606 16.3294 19.4691 15.5883 19.4691 14.6769Z" fill="#ff5fa2"/>
          </g>
        </svg>
      )
    case "chain-double":
      return (
        <svg
          viewBox="0 0 474 474"
          fill="none"
          aria-hidden="true"
          className={cn("shrink-0", className)}
        >
          <circle cx="237" cy="237" r="237" fill="#D4EFEE"/>
          <path d="M222.577 112.5H241.4L235.377 345.912L369.4 173.488H395L233.871 360.218H230.859L81.0235 192.312V164.453L229.353 345.159L222.577 112.5Z" fill="black"/>
          <path d="M75.0001 327.5V360.909L180 362.5V352.955L75.0001 327.5Z" fill="black"/>
          <path d="M400 332.5V361.137L295 362.5V354.318L400 332.5Z" fill="black"/>
        </svg>
      )
    case "innovate-uk":
      return (
        <svg
          viewBox="0 0 85 85"
          fill="none"
          aria-hidden="true"
          className={cn("shrink-0", className)}
        >
          <circle cx="42.5" cy="42.5" r="42.5" fill="#2e2d62"/>
          <g transform="translate(42.5 42.5) scale(0.68) translate(-42.5 -42.5)">
            <path fill="#fff" d="M75.65,9.35H65.73L52.41,23.54V9.35H33.16V28.19c0,4-3,6.37-6.95,6.37s-6.94-2.34-6.94-6.37V9.35H9.35v19c0,8.5,6.87,13.38,14.61,14.17H9.35V75.65h9.92V63.36h4.32l9.16,12.29h42.9V69H64V49.19H75.65V40.45L61.44,25.9,75.65,11.4Zm-33.15,23V47.74c-2.11-3.57-7-5.22-14.17-5.24,6.43-.65,12.37-4.12,14.17-10.14ZM19.27,49.19h9.06c3.73,0,5.24,1.45,5.24,3.72s-1.51,3.76-5.24,3.76H19.27ZM54.12,69H42.5v4.6L34.32,62.88c6.23-1.15,9.44-4.37,9.44-10a11,11,0,0,0-.58-3.72H54.12ZM65.73,42.5H52.41V28.27Z"/>
          </g>
        </svg>
      )
    // PLACEHOLDER: confidential-primitives has no brand mark yet, so the
    // GitHub mark stands in — monochrome via currentColor, so it follows the
    // text and both themes. Swap for a real mark when it exists.
    case "confidential-primitives":
      return (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className={cn("shrink-0", className)}
        >
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.27-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
        </svg>
      )
  }
  if (!hasProjectLogo(slug)) return null
  return (
    <Image
      src={`/brands/${slug}.png`}
      alt=""
      width={24}
      height={24}
      sizes="24px"
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  )
}
