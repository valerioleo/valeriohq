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
          viewBox="0 6 13 18"
          fill="none"
          aria-hidden="true"
          className={cn(common, "h-[0.78em]", className)}
        >
          <defs><clipPath id="7c984da807"><path d="M 17 7.558594 L 26 7.558594 L 26 21.347656 L 17 21.347656 Z M 17 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="8dff481bd8"><path d="M 25 7.558594 L 34 7.558594 L 34 21.347656 L 25 21.347656 Z M 25 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="6bd3878e1e"><path d="M 35 7.558594 L 39 7.558594 L 39 21.347656 L 35 21.347656 Z M 35 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="db70e1b3c9"><path d="M 38 7.558594 L 47 7.558594 L 47 21.347656 L 38 21.347656 Z M 38 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="eb62784195"><path d="M 44 7.558594 L 51 7.558594 L 51 21.347656 L 44 21.347656 Z M 44 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="2406e19430"><path d="M 56 7.558594 L 65 7.558594 L 65 21.347656 L 56 21.347656 Z M 56 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="1b38ce2e4a"><path d="M 64 7.558594 L 72.074219 7.558594 L 72.074219 21.347656 L 64 21.347656 Z M 64 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="e156e43ae1"><path d="M 1 7.558594 L 15 7.558594 L 15 10 L 1 10 Z M 1 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="3c20787571"><path d="M 50 7.558594 L 54 7.558594 L 54 21.347656 L 50 21.347656 Z M 50 7.558594 " clipRule="nonzero"/></clipPath><clipPath id="1041195d9c"><path d="M 0.945312 19 L 15 19 L 15 21.347656 L 0.945312 21.347656 Z M 0.945312 19 " clipRule="nonzero"/></clipPath><clipPath id="0bb5373708"><path d="M 0.945312 9 L 15 9 L 15 20 L 0.945312 20 Z M 0.945312 9 " clipRule="nonzero"/></clipPath></defs><g clipPath="url(#7c984da807)"><path fill="currentColor" d="M 17.082031 21.347656 L 22.398438 7.558594 L 25.058594 7.558594 L 20.023438 21.347656 Z M 17.082031 21.347656 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#8dff481bd8)"><path fill="currentColor" d="M 25.058594 7.558594 L 27.886719 7.558594 L 33.089844 21.347656 L 30.148438 21.347656 Z M 25.058594 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><path fill="currentColor" d="M 22.269531 15.195312 L 27.878906 15.195312 L 28.667969 17.335938 L 21.488281 17.335938 Z M 22.269531 15.195312 " fill-opacity="1" fillRule="nonzero"/><g clipPath="url(#6bd3878e1e)"><path fill="currentColor" d="M 35.917969 7.558594 L 38.859375 7.558594 L 38.859375 21.347656 L 35.917969 21.347656 Z M 35.917969 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#db70e1b3c9)"><path fill="currentColor" d="M 38.859375 7.558594 L 43.046875 21.347656 L 46.328125 21.347656 L 44.742188 18.769531 L 41.234375 7.558594 Z M 38.859375 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#eb62784195)"><path fill="currentColor" d="M 48.078125 7.558594 L 44.742188 18.769531 L 46.328125 21.347656 L 50.625 7.558594 Z M 48.078125 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#2406e19430)"><path fill="currentColor" d="M 56.046875 21.347656 L 61.363281 7.558594 L 64.023438 7.558594 L 58.988281 21.347656 Z M 56.046875 21.347656 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#1b38ce2e4a)"><path fill="currentColor" d="M 64.023438 7.558594 L 66.851562 7.558594 L 72.054688 21.347656 L 69.113281 21.347656 Z M 64.023438 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><path fill="currentColor" d="M 61.234375 15.195312 L 66.84375 15.195312 L 67.632812 17.335938 L 60.453125 17.335938 Z M 61.234375 15.195312 " fill-opacity="1" fillRule="nonzero"/><g clipPath="url(#e156e43ae1)"><path fill="currentColor" d="M 1.269531 7.558594 L 14.761719 7.558594 L 14.761719 9.855469 L 1.269531 9.855469 Z M 1.269531 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#3c20787571)"><path fill="currentColor" d="M 50.625 7.558594 L 53.566406 7.558594 L 53.566406 21.347656 L 50.625 21.347656 Z M 50.625 7.558594 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#1041195d9c)"><path fill="currentColor" d="M 0.960938 19.203125 L 14.996094 19.203125 L 14.996094 21.347656 L 0.960938 21.347656 Z M 0.960938 19.203125 " fill-opacity="1" fillRule="nonzero"/></g><g clipPath="url(#0bb5373708)"><path fill="currentColor" d="M 0.960938 19.203125 L 14.761719 9.855469 L 14.761719 12.628906 L 5.171875 19.203125 Z M 0.960938 19.203125 " fill-opacity="1" fillRule="nonzero"/></g>
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
          <path d="M198.738 101.778L199.373 102.134L257.418 134.727V101.778H260.198C287.379 101.778 314.294 106.9 339.412 116.852C364.53 126.804 387.361 141.393 406.598 159.794C425.835 178.194 441.1 200.045 451.52 224.102C461.937 248.16 467.3 273.95 467.303 299.998C467.303 326.046 461.937 351.838 451.52 375.896C441.1 399.954 425.835 421.805 406.598 440.204C387.361 458.605 364.53 473.195 339.412 483.148C314.295 493.098 287.378 498.221 260.198 498.221H257.418V465.13L199.379 497.86L198.741 498.221H159.697V101.778H198.738ZM262.979 179.762L258.836 177.438L200.793 144.84V455.141L258.833 422.414L262.979 420.076V457.454C283.685 457.118 304.148 453.059 323.291 445.475C343.29 437.551 361.453 425.939 376.747 411.31C392.042 396.681 404.168 379.32 412.438 360.223C420.708 341.126 424.962 320.661 424.962 299.998C424.962 279.335 420.708 258.872 412.438 239.775C404.168 220.678 392.042 203.315 376.747 188.686C361.453 174.056 343.29 162.445 323.291 154.521C304.148 146.937 283.685 142.874 262.979 142.54V179.762Z" fill="currentColor" stroke="black" stroke-width="5.56017"/>
        </svg>
      )
    default:
      return null
  }
}
