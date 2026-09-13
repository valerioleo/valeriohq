import { cn } from "@/lib/utils"

// Brand marks for the work entries, inlined rather than loaded as <img> so
// they inherit the surrounding text colour through `currentColor` (an image
// is an isolated document and would render black in both themes). Originals
// are in public/logos; only the fill was changed, never the shapes.
//
// Zama's asset is the ZAMA wordmark, so the viewBox crops it to their Z mark,
// which is how Zama itself uses it as a square icon. Without that crop the
// row reads "ZAMA Zama".
//
// Each mark carries its own height, because their glyphs sit differently
// inside their artboards and a single height makes them look unequal.
// Keyed by content slug; a new logo means a new case here.

export function ProjectLogo({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const common = "w-auto shrink-0"

  switch (slug) {
    case "raycash":
      return (
        <svg
          viewBox="0 0 43 45"
          fill="none"
          aria-hidden="true"
          className={cn(common, "h-[0.82em]", className)}
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M42.998 7.50586V37.3613L23.8398 44.8682L23.8623 34.7744L9.54297 37.8535V29.3564L14.3174 28.8945V15.9814L9.54297 15.5195V7.01367L23.8398 10.0967L23.8623 0L42.998 7.50586ZM23.8623 34.7744L33.3848 32.7158V12.1611L23.8623 10.1074V34.7744ZM9.51953 15.5195V29.3555L0 30.2764V14.5977L9.51953 15.5195Z" fill="currentColor"/>
        </svg>
      )
    case "zama":
      return (
        <svg
          // Tight crop to the Z glyph's real bounds (x 0.9–15, y 7.5–21.4).
          // The old "0 6 13 18" box clipped the Z's right edge AND padded it
          // vertically, so the glyph rendered at ~77% of the declared height.
          // With the tight box the height class means what it says; 0.6em
          // keeps the mark the same visual size it always had.
          viewBox="0.9 7.4 14.2 14.1"
          fill="none"
          aria-hidden="true"
          className={cn(common, "h-[0.6em]", className)}
        >
          <defs><clipPath id="7c984da807"><path d="M 17 7.558594 L 26 7.558594 L 26 21.347656 L 17 21.347656 Z M 17 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="8dff481bd8"><path d="M 25 7.558594 L 34 7.558594 L 34 21.347656 L 25 21.347656 Z M 25 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="6bd3878e1e"><path d="M 35 7.558594 L 39 7.558594 L 39 21.347656 L 35 21.347656 Z M 35 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="db70e1b3c9"><path d="M 38 7.558594 L 47 7.558594 L 47 21.347656 L 38 21.347656 Z M 38 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="eb62784195"><path d="M 44 7.558594 L 51 7.558594 L 51 21.347656 L 44 21.347656 Z M 44 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="2406e19430"><path d="M 56 7.558594 L 65 7.558594 L 65 21.347656 L 56 21.347656 Z M 56 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="1b38ce2e4a"><path d="M 64 7.558594 L 72.074219 7.558594 L 72.074219 21.347656 L 64 21.347656 Z M 64 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="e156e43ae1"><path d="M 1 7.558594 L 15 7.558594 L 15 10 L 1 10 Z M 1 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="3c20787571"><path d="M 50 7.558594 L 54 7.558594 L 54 21.347656 L 50 21.347656 Z M 50 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="1041195d9c"><path d="M 0.945312 19 L 15 19 L 15 21.347656 L 0.945312 21.347656 Z M 0.945312 19 " clipRule="nonzero"/></clipPath><clipPath id="0bb5373708"><path d="M 0.945312 9 L 15 9 L 15 20 L 0.945312 20 Z M 0.945312 9 " clipRule="nonzero"/></clipPath></defs><g clipPath="url(#7c984da807)"><path fill="currentColor" d="M 17.082031 21.347656 L 22.398438 7.558594 L 25.058594 7.558594 L 20.023438 21.347656 Z M 17.082031 21.347656 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#8dff481bd8)"><path fill="currentColor" d="M 25.058594 7.558594 L 27.886719 7.558594 L 33.089844 21.347656 L 30.148438 21.347656 Z M 25.058594 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><path fill="currentColor" d="M 22.269531 15.195312 L 27.878906 15.195312 L 28.667969 17.335938 L 21.488281 17.335938 Z M 22.269531 15.195312 " fillOpacity="1" fillRule="nonzero"/><g clipPath="url(#6bd3878e1e)"><path fill="currentColor" d="M 35.917969 7.558594 L 38.859375 7.558594 L 38.859375 21.347656 L 35.917969 21.347656 Z M 35.917969 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#db70e1b3c9)"><path fill="currentColor" d="M 38.859375 7.558594 L 43.046875 21.347656 L 46.328125 21.347656 L 44.742188 18.769531 L 41.234375 7.558594 Z M 38.859375 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#eb62784195)"><path fill="currentColor" d="M 48.078125 7.558594 L 44.742188 18.769531 L 46.328125 21.347656 L 50.625 7.558594 Z M 48.078125 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#2406e19430)"><path fill="currentColor" d="M 56.046875 21.347656 L 61.363281 7.558594 L 64.023438 7.558594 L 58.988281 21.347656 Z M 56.046875 21.347656 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#1b38ce2e4a)"><path fill="currentColor" d="M 64.023438 7.558594 L 66.851562 7.558594 L 72.054688 21.347656 L 69.113281 21.347656 Z M 64.023438 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><path fill="currentColor" d="M 61.234375 15.195312 L 66.84375 15.195312 L 67.632812 17.335938 L 60.453125 17.335938 Z M 61.234375 15.195312 " fillOpacity="1" fillRule="nonzero"/><g clipPath="url(#e156e43ae1)"><path fill="currentColor" d="M 1.269531 7.558594 L 14.761719 7.558594 L 14.761719 9.855469 L 1.269531 9.855469 Z M 1.269531 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#3c20787571)"><path fill="currentColor" d="M 50.625 7.558594 L 53.566406 7.558594 L 53.566406 21.347656 L 50.625 21.347656 Z M 50.625 7.558594 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#1041195d9c)"><path fill="currentColor" d="M 0.960938 19.203125 L 14.996094 19.203125 L 14.996094 21.347656 L 0.960938 21.347656 Z M 0.960938 19.203125 " fillOpacity="1" fillRule="nonzero"/></g><g clipPath="url(#0bb5373708)"><path fill="currentColor" d="M 0.960938 19.203125 L 14.761719 9.855469 L 14.761719 12.628906 L 5.171875 19.203125 Z M 0.960938 19.203125 " fillOpacity="1" fillRule="nonzero"/></g>
        </svg>
      )
    case "deployoor":
      return (
        <svg
          viewBox="96 96 378 408"
          fill="none"
          aria-hidden="true"
          className={cn(common, "h-[0.9em]", className)}
        >
          <path d="M198.738 101.778L199.373 102.134L257.418 134.727V101.778H260.198C287.379 101.778 314.294 106.9 339.412 116.852C364.53 126.804 387.361 141.393 406.598 159.794C425.835 178.194 441.1 200.045 451.52 224.102C461.937 248.16 467.3 273.95 467.303 299.998C467.303 326.046 461.937 351.838 451.52 375.896C441.1 399.954 425.835 421.805 406.598 440.204C387.361 458.605 364.53 473.195 339.412 483.148C314.295 493.098 287.378 498.221 260.198 498.221H257.418V465.13L199.379 497.86L198.741 498.221H159.697V101.778H198.738ZM262.979 179.762L258.836 177.438L200.793 144.84V455.141L258.833 422.414L262.979 420.076V457.454C283.685 457.118 304.148 453.059 323.291 445.475C343.29 437.551 361.453 425.939 376.747 411.31C392.042 396.681 404.168 379.32 412.438 360.223C420.708 341.126 424.962 320.661 424.962 299.998C424.962 279.335 420.708 258.872 412.438 239.775C404.168 220.678 392.042 203.315 376.747 188.686C361.453 174.056 343.29 162.445 323.291 154.521C304.148 146.937 283.685 142.874 262.979 142.54V179.762Z" fill="currentColor" stroke="black" strokeWidth="5.56017"/>
        </svg>
      )
    case "pinkwhale":
      return (
        <svg
          viewBox="0 0 28 24"
          fill="none"
          aria-hidden="true"
          className={cn(common, "h-[0.75em]", className)}
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M27.1706 6.36452C26.4095 2.89934 23.3649 0.425636 19.8397 0.165247C16.8853 -0.0550824 14.2814 -0.0550824 11.4171 0.165247C7.80167 0.425636 4.66698 2.99949 4.06608 6.59486C3.51526 9.86976 3.51526 12.9644 4.16623 16.8202V16.8502C4.15622 17.2408 4.01601 17.5412 3.60539 17.9218C3.32497 18.0219 3.18476 18.0019 2.92437 17.9218C2.50374 17.6814 2.43364 17.4912 2.33349 17.2007C2.30344 17.1306 2.28341 17.0605 2.24336 16.9804L2.08312 16.2493C2.56383 15.9689 2.85427 15.8287 3.43514 15.6684V15.2478C2.90434 15.3379 2.60389 15.3279 2.08312 15.2478L1.82273 15.6684H1.51226L1.41211 15.2478C0.851273 15.3379 0.540809 15.3279 0 15.2478V15.6684C0.671004 15.7786 0.991483 15.9088 1.51226 16.2493L1.46219 16.9804C1.46219 16.9804 1.41211 17.5012 1.51226 18.3424C1.61241 19.1837 2.22333 19.9649 3.0746 20.8061C5.42812 22.6088 7.35099 23.0495 10.4657 23.3699C10.8162 23.4501 11.1767 23.5001 11.5473 23.5302C14.5317 23.7605 17.1857 23.7505 20.1802 23.4801C23.5252 23.1797 26.4496 20.8762 27.2207 17.5913C28.072 13.9559 28.102 10.6309 27.1706 6.37453V6.36452ZM19.4691 14.6769C19.4691 13.7656 20.4606 13.0245 21.6824 13.0245C22.9043 13.0245 23.8957 13.7656 23.8957 14.6769C23.8957 15.5883 22.9043 16.3294 21.6824 16.3294C20.4606 16.3294 19.4691 15.5883 19.4691 14.6769Z" fill="currentColor"/>
        </svg>
      )
    case "chain-double":
      return (
        <svg
          viewBox="0 0 474 474"
          fill="none"
          aria-hidden="true"
          className={cn(common, "h-[0.85em]", className)}
        >
          <path d="M222.577 112.5H241.4L235.377 345.912L369.4 173.488H395L233.871 360.218H230.859L81.0235 192.312V164.453L229.353 345.159L222.577 112.5Z" fill="currentColor"/>
          <path d="M75.0001 327.5V360.909L180 362.5V352.955L75.0001 327.5Z" fill="currentColor"/>
          <path d="M400 332.5V361.137L295 362.5V354.318L400 332.5Z" fill="currentColor"/>
        </svg>
      )
    default:
      return null
  }
}

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

// The full-colour brand icon (PNG), for the places that want brand recognition
// rather than the monochrome mark: the hero pills and the /work list rows.
// Valerio's call — the colour is deliberate variance in an otherwise
// near-monochrome page, and it will matter more as the work list grows.
// No white disc behind the image: `bg-white` + `rounded-full` left a 1px AA
// halo (loudest on Zama's opaque black square). The PNGs already carry their
// own ground. Detail-page headings keep the rust `ProjectLogo` mark; that one
// is a heading accent, not an identifier.
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brands/${slug}.png`}
      alt=""
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  )
}
