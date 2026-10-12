import { cn } from "@/lib/utils"

// A theme-aware redraw of the AsyncWrapper cover: a deposit enters a crowd of
// notes (the anonymity set), and a confidential balance leaves it. Inline SVG
// in `currentColor` so it blends into the page in either theme, rather than
// sitting in a black box like the original social card.
export function CrowdDiagram({ className }: { className?: string }) {
  const xs = [178, 194, 210, 226, 242]
  const ys = [48, 64, 80, 96, 112]
  const dots = xs.flatMap((x) => ys.map((y) => [x, y] as const))

  return (
    <svg
      viewBox="0 0 424 160"
      role="img"
      aria-label="A deposit enters a crowd of notes and a confidential balance leaves it"
      className={cn("h-auto w-full text-foreground/55", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 80 H140" />
        <path d="M132 72 L148 80 L132 88" />
        <circle cx={210} cy={80} r={58} />
        <path d="M300 80 H404" />
        <path d="M396 72 L412 80 L396 88" />
      </g>
      <g fill="currentColor">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} />
        ))}
      </g>
    </svg>
  )
}
