// A labelled list under a hairline rule: work and writing on the homepage,
// and the related lists at the foot of a project or a post.
export const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section className="mt-12 sm:mt-16">
    <div className="flex items-center gap-4">
      <h2 className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
        {title}
      </h2>
      <div aria-hidden className="h-px flex-1 bg-border/80" />
    </div>
    <div className="mt-5">{children}</div>
  </section>
)
