// The one meta line under a detail-page title: date and source for a post,
// role, year and links for a project. Body sans, muted, dots between — no
// mono, no italic, no rule, so the header speaks one voice before the prose.
export const PageMeta = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted-foreground">
    {children}
  </p>
)

export const MetaDot = () => <span aria-hidden>·</span>

export const META_LINK = "transition-colors hover:text-brand"
