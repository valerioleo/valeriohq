const steps = [
  { title: "Specify", description: "Define the behavior." },
  { title: "Build", description: "Implement and review." },
  { title: "Check", description: "Run the release gates." },
  { title: "Ship", description: "Only after checks pass." },
]

// Server-rendered and keyboard-accessible without JavaScript. The disclosure
// puts the explanation next to the diagram rather than in another panel.
export function ReleaseFlow() {
  return (
    <figure className="not-prose my-8 border-y border-border/80 py-6">
      <figcaption className="mb-5 font-mono text-xs text-muted-foreground">the release principle</figcaption>
      <ol className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden className="font-mono text-xs text-brand">0{index + 1}</span>
            <p className="mt-1 font-serif text-lg">{step.title}</p>
            <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
      <details className="group mt-6 border-t border-border/70 pt-3">
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-4 font-mono text-xs text-brand transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
          What is the gate for?
          <span aria-hidden className="text-base group-open:hidden">+</span>
          <span aria-hidden className="hidden text-base group-open:inline">−</span>
        </summary>
        <p className="max-w-[60ch] pb-2 pt-1 font-sans text-sm leading-relaxed text-muted-foreground">
          A failed check should stop a release, even when everyone is in a
          hurry. Automating that decision leaves more attention for the parts
          that need judgment: what to build, what could go wrong, and whether
          the tests ask the right questions.
        </p>
      </details>
    </figure>
  )
}
