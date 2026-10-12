import { cn } from "@/lib/utils"

// The small, consistent vocabulary every interface diagram is built from:
// window, bar, field, button, chip, status, bubble, cursor. Incidental
// content is a muted bar; anything the explanation depends on is real text.
// Neutral by default; the brand accent is for the current focus only.

export const Window = ({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-md border border-border bg-background",
      className
    )}
  >
    <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
      <span aria-hidden className="flex gap-1">
        <span className="size-1.5 rounded-full bg-muted" />
        <span className="size-1.5 rounded-full bg-muted" />
        <span className="size-1.5 rounded-full bg-muted" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </span>
    </div>
    <div className="p-3 sm:p-4">{children}</div>
  </div>
)

export const Bar = ({ w = "60%", className }: { w?: string; className?: string }) => (
  <span
    aria-hidden
    className={cn("block h-2 rounded-sm bg-muted", className)}
    style={{ width: w }}
  />
)

export const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
      {label}
    </div>
    <div className="mt-0.5 text-lg font-medium tabular-nums">{value}</div>
  </div>
)

export const Btn = ({
  active = false,
  className,
  children,
}: {
  active?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md border px-2.5 py-1 text-xs transition-colors",
      active ? "border-brand text-brand" : "border-border text-foreground",
      className
    )}
  >
    {children}
  </span>
)

export const Chip = ({
  accent = false,
  className,
  children,
}: {
  accent?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors",
      accent ? "border-brand/60 text-brand" : "border-border text-muted-foreground",
      className
    )}
  >
    {children}
  </span>
)

export const Status = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <span className={cn("font-mono text-[11px] text-muted-foreground", className)}>{children}</span>
)

export const Bubble = ({
  mine = false,
  className,
  children,
}: {
  mine?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={cn(
      "max-w-[85%] rounded-lg border border-border px-3 py-2",
      mine ? "ml-auto" : "mr-auto",
      className
    )}
  >
    {children}
  </div>
)

// A cursor only appears where a person's action is part of the explanation.
// Positioned in percent of its window so it scales with the scene.
export const Cursor = ({ x, y, visible }: { x: number; y: number; visible: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className={cn(
      "pointer-events-none absolute z-10 size-4 text-foreground motion-safe:transition-all motion-safe:duration-500",
      visible ? "opacity-100" : "opacity-0"
    )}
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <path d="M3 2l9 6.5-4 .6 2.4 4.2-1.6.9-2.4-4.3L3 12.5z" fill="currentColor" />
  </svg>
)

// Chain-of-thought steps, after fluidfunctionalism's ThinkingSteps: a small
// header, a vertical connector, one dot per step, optional description and
// nested detail lines, a closing "Done". Steps appear in order; the active
// one carries the accent. No shimmer and no typing, per the site's rules:
// the dot and the text weight say which step is live.
export type StepStatus = "complete" | "active" | "pending"

export const Steps = ({
  header,
  done = false,
  children,
}: {
  header: string
  done?: boolean
  children: React.ReactNode
}) => (
  <div>
    <div className="flex items-center justify-between">
      <Status className="text-foreground">{header}</Status>
      <Status className={cn("motion-safe:transition-opacity", done ? "opacity-100" : "opacity-0")}>
        Done
      </Status>
    </div>
    <ol className="mt-2">{children}</ol>
  </div>
)

export const Step = ({
  status,
  last = false,
  label,
  description,
  details,
}: {
  status: StepStatus
  last?: boolean
  label: string
  description?: string
  details?: string[]
}) => (
  <li
    className={cn(
      "relative pb-3 pl-6",
      status === "pending"
        ? "opacity-0 translate-y-1 motion-safe:transition-all motion-safe:duration-300"
        : "opacity-100 translate-y-0 motion-safe:transition-all motion-safe:duration-300"
    )}
  >
    {!last && <span aria-hidden className="absolute bottom-0 left-[5px] top-4 w-px bg-border" />}
    <span
      aria-hidden
      className={cn(
        "absolute left-0 top-1 size-[11px] rounded-full border transition-colors",
        status === "active" ? "border-brand bg-brand" : "border-border bg-muted"
      )}
    />
    <div className={cn("text-sm", status === "active" ? "text-foreground" : "text-muted-foreground")}>
      {label}
    </div>
    {description && (
      <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{description}</div>
    )}
    {details && (
      <ul className="mt-1 space-y-0.5 border-l border-border pl-3 font-mono text-[11px] text-muted-foreground">
        {details.map(d => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    )}
  </li>
)
