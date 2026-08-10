import { cn } from "@/lib/utils"

// Shared shell for every interactive demo. One consistent frame — mono title
// bar, a rust dot, an "interactive" tag — so a live widget always reads as part
// of the site, not a bolted-on embed. `not-prose` opts the demo out of the
// article's prose typography. `bleed` grants a modest breakout past the reading
// measure for demos that need the room.
export function DemoFrame({
  title,
  caption,
  bleed = false,
  children,
}: {
  title?: string
  caption?: string
  bleed?: boolean
  children: React.ReactNode
}) {
  return (
    <figure className={cn("not-prose my-8", bleed && "sm:-mx-8 lg:-mx-24")}>
      <div className="overflow-hidden rounded-lg border border-border/70 bg-muted/30">
        {title && (
          <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2">
            <span aria-hidden className="size-1.5 rounded-full bg-brand/70" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {title}
            </span>
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70">
              interactive
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
