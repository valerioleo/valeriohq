import type { Metadata } from "next"
import { allPosts, allProjects } from "content-collections"

import { cn } from "@/lib/utils"
import { listedOpenSource } from "@/lib/work"
import { PostList } from "@/components/writing/post-list"
import { WorkList } from "@/components/work/work-list"

// Section-header bake-off for the homepage lists. The current header stacks
// five decisions in one line: mono, xs, letter-spacing, muted, hairline rule.
// Each variant below renders BOTH lists so the question that matters — do
// two lists still read as two things — is answered in place. The last
// variant has no header at all.
export const metadata: Metadata = {
  title: "Header variants",
  robots: { index: false, follow: false },
}

type HeaderProps = { title: string }

const Current = ({ title }: HeaderProps) => (
  <div className="flex items-center gap-4">
    <h3 className="font-mono text-xs tracking-[0.04em] text-muted-foreground">{title}</h3>
    <div aria-hidden className="h-px flex-1 bg-border/80" />
  </div>
)

const TitleOnly = ({ title }: HeaderProps) => (
  <h3 className="font-medium">{title}</h3>
)

const QuietTitle = ({ title }: HeaderProps) => (
  <h3 className="text-sm text-muted-foreground">{title}</h3>
)

const RuleOnly = (_: HeaderProps) => (
  <div aria-hidden className="h-px w-full bg-border" />
)

const Nothing = (_: HeaderProps) => null

const VARIANTS = [
  {
    id: "a",
    name: "A · current",
    pitch: "Mono, xs, tracked, muted, plus a hairline. Five decisions in one line; the label competes with dates and nav for the mono register.",
    Header: Current,
    gap: "mt-5",
  },
  {
    id: "b",
    name: "B · title, body weight",
    pitch: "One decision: the section name in the reading face at medium weight, same size as the rows. No rule. Reads as a heading because it is heavier, not because it is different.",
    Header: TitleOnly,
    gap: "mt-3",
  },
  {
    id: "c",
    name: "C · quiet title",
    pitch: "The name in small muted sans. Recedes below the rows instead of sitting above them; the list is the content, the label is a caption.",
    Header: QuietTitle,
    gap: "mt-3",
  },
  {
    id: "d",
    name: "D · rule only",
    pitch: "No word at all — a full-width hairline separates lists. Works if the rows already say what they are: dates mean writing, marks mean projects.",
    Header: RuleOnly,
    gap: "mt-6",
  },
  {
    id: "e",
    name: "E · nothing",
    pitch: "Space does the separating. The strongest test of whether the rows are self-describing; if this works, everything above it was decoration.",
    Header: Nothing,
    gap: "",
  },
]

const HeadersPage = () => {
  const posts = allPosts
    .filter(p => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)
  const openSource = listedOpenSource(allProjects).slice(0, 2)

  return (
    <div className="pb-24 pt-8 sm:pt-12">
      <header>
        <h1 className="text-[1.1875rem] font-medium tracking-[-0.01875rem]">
          Section headers — five options
        </h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
          Both homepage lists under each header treatment, so two-list rhythm
          is judged, not one label in isolation.
        </p>
      </header>

      <div className="mt-14 space-y-24">
        {VARIANTS.map(({ id, name, pitch, Header, gap }) => (
          <section key={id} id={id} className="scroll-mt-8">
            <div className="border-b border-border pb-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-brand">{name}</h2>
            </div>
            <p className="mb-10 mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              {pitch}
            </p>

            <div>
              <Header title="writing" />
              <div className={cn(gap)}>
                <PostList posts={posts} />
              </div>
            </div>
            <div className="mt-12 sm:mt-16">
              <Header title="open source" />
              <div className={cn(gap)}>
                <WorkList projects={openSource} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default HeadersPage
