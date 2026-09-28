import type { Metadata } from "next"
import { Geist_Mono, Shantell_Sans } from "next/font/google"

import { cn } from "@/lib/utils"

// Hand-annotation bake-off. The vendored neat-annotations CSS is loaded
// site-wide (styles/annotations.css) and retinted to the house voice there;
// this page shows that default beside the library's own voice and a Geist
// Mono alternate, then puts it next to the marginalia /work already has, so
// the two hands can be judged in one view.
//
// Fonts are declared here so they load on this route only. Shantell Sans is
// the library's default and exists here purely as the reference row.
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const shantell = Shantell_Sans({ subsets: ["latin"], variable: "--font-shantell" })

export const metadata: Metadata = {
  title: "Annotations",
  robots: { index: false, follow: false },
}

const LABEL = "font-mono text-xs tracking-[0.08em] text-muted-foreground"

const Rule = ({ title }: { title: string }) => (
  <div className="flex items-baseline gap-4 border-b border-border pb-2">
    <h2 className={cn(LABEL, "uppercase text-brand")}>{title}</h2>
  </div>
)

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-8 mt-3 max-w-[60ch] font-sans text-sm leading-relaxed text-muted-foreground">
    {children}
  </p>
)

// The same passage in every voice. Loose leading on purpose: annotations are
// positioned outside their target and reserve no space, so annotated lines
// need room above or below — the README says so, and the demo respects it.
const Passage = ({ font }: { font?: string }) => (
  <p
    className="max-w-[60ch] font-serif text-lg leading-[2.6]"
    style={font ? { "--ann-font": font } : undefined}
  >
    Once you&apos;re holding an ERC-7984 token, your balance is{" "}
    <span
      className="ann ann-n"
      data-note="amounts, not addresses"
      style={font ? { "--ann-font": font } : undefined}
    >
      effectively encrypted
    </span>
    . That part is solved. But how those tokens come into existence matters
    just as much, and there are{" "}
    <span
      className="ann ann-s"
      data-note="mint, or wrap"
      style={font ? { "--ann-font": font } : undefined}
    >
      two ways it happens
    </span>
    .
  </p>
)

const DIRECTIONS = ["n", "ne", "e", "se", "s", "sw", "w", "nw"]

const AnnotationsPage = () => (
  <div className={cn("pb-24 pt-10", geistMono.variable, shantell.variable)}>
    <header>
      <h1 className="font-serif text-2xl font-medium tracking-[-0.01em]">
        Annotations
      </h1>
      <p className="mt-3 max-w-[60ch] font-serif italic leading-relaxed text-muted-foreground">
        Hand-drawn arrows and labels, pure CSS, vendored. Same passage in three
        voices, then beside the marginalia the site already has.
      </p>
    </header>

    <div className="mt-14 space-y-20">
      <section>
        <Rule title="house voice · default" />
        <Note>
          What every annotation on the site gets with no extra classes: the
          site mono in filigrana ink, a 9% rust wash on the target, tilted
          two degrees. This is the same register as the /work chapter note.
        </Note>
        <Passage />
      </section>

      <section>
        <Rule title="house voice · Geist Mono" />
        <Note>
          The alternate. Identical ink and tilt, but the mono the /work
          annotation speaks. Cleaner at small sizes; costs a font load
          wherever it is used.
        </Note>
        <Passage font="var(--font-geist-mono)" />
      </section>

      <section>
        <Rule title="the library's own voice" />
        <Note>
          Shantell Sans, the library&apos;s default handwriting, in the house
          ink. The reference row: this is the hand we are deliberately not
          adopting, kept here so the difference is visible rather than argued.
        </Note>
        <Passage font="var(--font-shantell)" />
      </section>

      <section>
        <Rule title="next to the existing marginalia" />
        <Note>
          The /work open-source chapter, reproduced, with one arrow added
          inside it. At xl the bracket and the margin note sit on the right;
          the arrow points from below. Two hands, one paragraph — judge
          whether they read as the same person.
        </Note>
        <div className="relative max-w-[60ch] font-serif text-lg leading-[2.4]">
          <span
            aria-hidden
            className="absolute -right-7 top-1 bottom-1 hidden w-2 rounded-[2px] border-y border-r border-muted-foreground/35 xl:block"
          />
          <span
            aria-hidden
            className="absolute left-full top-1/2 hidden w-44 -translate-y-1/2 -rotate-2 pl-12 text-xs leading-relaxed text-muted-foreground/65 xl:block"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <span className="text-brand/50">~/</span>open-source
          </span>
          <span
            aria-hidden
            className="absolute -left-3 top-1 bottom-1 w-2 rounded-[2px] border-y border-l border-muted-foreground/35 xl:hidden"
          />
          <p>
            When what I want doesn&apos;t exist, I build it and{" "}
            <span className="ann ann-s" data-note="MIT, every time">
              open the source
            </span>
            . deployoor made it easy to manage deployments in my development
            flow: deploy, manage and verify your contracts from any Hardhat or
            Foundry project.
          </p>
        </div>
      </section>

      <section>
        <Rule title="pointing at a widget" />
        <Note>
          The use that earns its ink: an arrow aimed at something interactive
          in a post. The target keeps its own fill (ann-no-mark), and the
          label is the loud rust variant because here it is an instruction,
          not a whisper.
        </Note>
        <div className="flex items-center gap-16 py-10">
          <span
            className="ann ann-e ann-no-mark ann-brand"
            data-note="tap to decrypt"
            style={{ "--ann-label-max-width": "120px" }}
          >
            <span className="inline-flex items-baseline gap-3 rounded-md border border-border bg-card px-4 py-3 font-mono text-sm">
              <span className="text-muted-foreground">balance</span>
              <span>●●●●●● USDC</span>
            </span>
          </span>
        </div>
      </section>

      <section>
        <Rule title="all eight directions" />
        <Note>
          The class names the side the arrow points toward. ann-n puts the
          label below and points north at the target.
        </Note>
        <div className="grid grid-cols-2 gap-x-12 gap-y-20 py-12 font-serif text-lg sm:grid-cols-4">
          {DIRECTIONS.map(dir => (
            <div key={dir} className="flex justify-center">
              <span className={cn("ann", `ann-${dir}`)} data-note={`ann-${dir}`}>
                target
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Rule title="marks without arrows" />
        <Note>
          Drop the direction and the note and it is just a highlighter: the
          quiet wash, or rust for the one thing that must be seen. The part
          of the library most likely to be overused; use it like a real
          highlighter, which is rarely.
        </Note>
        <p className="max-w-[60ch] font-serif text-lg leading-relaxed">
          A minimum batch size is enforced so a wrap can{" "}
          <span className="ann">never finalize alone</span>. The longer a note
          waits, the larger the crowd it can hide in, which is why{" "}
          <span className="ann ann-brand">finalizing later is usually better</span>
          .
        </p>
      </section>
    </div>
  </div>
)

export default AnnotationsPage
