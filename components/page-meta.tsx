// The one meta line under a detail-page title: date and source for a post,
// site and source links for a project. Mono and muted like the section
// labels, so the header reads title first and details second.
export const PageMeta = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
    {children}
  </p>
)

export const META_LINK = "transition-colors hover:text-brand"
