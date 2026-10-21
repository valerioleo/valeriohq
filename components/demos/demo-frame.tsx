import { cn } from "@/lib/utils"

// Shared shell for every interactive demo. One consistent frame — mono title
// bar, a neutral dot, an "interactive" tag — so a live widget always reads as part
// of the site, not a bolted-on embed. `not-prose` opts the demo out of the
// article's prose typography. `bleed` grants a modest breakout past the reading
// measure for demos that need the room.
export function DemoFrame({
  title,
  caption,
  bleed = false,
  kind = "interactive",
  children,
}: {
  title?: string
  caption?: string
  bleed?: boolean
  // "diagram" for play-once explanatory sequences; "interactive" for widgets
  // the reader drives. The tag in the title bar says which.
  kind?: "interactive" | "diagram"
  children: React.ReactNode
}) {
  return (
    <figure className={cn("not-prose my-8", bleed && "sm:-mx-8 lg:-mx-24")}>
      <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
        {title && (
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <span aria-hidden className="size-1.5 rounded-full bg-muted-foreground" />
            <span className="font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
              {title}
            </span>
            <span className="ms-auto font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
              {kind}
            </span>
          </div>
        )}
        <div className="p-5 sm:p-6">{children}</div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
