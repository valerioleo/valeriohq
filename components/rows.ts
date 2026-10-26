// One-line rows, shared by the work and writing lists. The list carries the
// group so hovering one row recedes its siblings and the target stands out.
// The siblings' titles drop to the muted ink, which still reads at 4.5:1, and
// the row you point at turns brand. Fading whole rows took their text below
// that.
export const ROWS = "group/list"

export const ROW = "group py-2.5"

// The title is the part that recedes or lights up.
export const ROW_TITLE =
  "transition-colors sm:group-hover/list:text-muted-foreground group-hover:!text-brand"
