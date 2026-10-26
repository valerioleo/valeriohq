"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

// A short explanatory sequence: establish → act → hold. Plays once when it
// scrolls into view, rests on the final state, and offers Replay. Under
// prefers-reduced-motion nothing auto-plays: the final state is shown and the
// button steps through the states by hand, so the explanation is never a
// blank or half-finished UI.
//
// `durations[i]` is how long state i is held before advancing; the last entry
// is never used (the sequence rests there). Pass a module-level constant so
// the effect deps stay stable.

export type SequenceState = {
  step: number
  last: number
  playing: boolean
  reduced: boolean
}

const REDUCED = "(prefers-reduced-motion: reduce)"

const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false
  )

const useSequence = (durations: number[]) => {
  const reduced = useReducedMotion()
  const last = durations.length - 1
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  // Set when the sequence first scrolls into view, and again on Replay.
  const [started, setStarted] = useState(false)
  // Under reduced motion the reader steps by hand, starting from the result.
  const [manual, setManual] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const playing = started && !reduced && step < last

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => setStep(s => s + 1), durations[step])
    return () => window.clearTimeout(t)
  }, [playing, step, durations])

  const shown = reduced ? (manual ?? last) : step

  const replay = () => {
    if (reduced) setManual(shown >= last ? 0 : shown + 1)
    else {
      setStep(0)
      setStarted(true)
    }
  }

  return { ref, step: shown, last, playing, reduced, replay }
}

export const Sequence = ({
  durations,
  label,
  children,
}: {
  durations: number[]
  label: string
  children: (s: SequenceState) => React.ReactNode
}) => {
  const { ref, step, last, playing, reduced, replay } = useSequence(durations)
  const control = reduced ? (step >= last ? "Restart" : "Next step") : "Replay"
  return (
    <div>
      <div ref={ref} role="img" aria-label={label}>
        {children({ step, last, playing, reduced })}
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span aria-hidden>
          {reduced
            ? `step ${step + 1} of ${last + 1}`
            : playing
              ? "playing"
              : step >= last
                ? "done"
                : ""}
        </span>
        <button
          type="button"
          onClick={replay}
          className="rounded-md border border-border px-2.5 py-1 lowercase transition-colors hover:border-brand hover:text-brand"
        >
          {control}
        </button>
      </div>
    </div>
  )
}

// Visibility that never shifts layout: the element keeps its box, only its
// opacity and a 4px rise change. Motion only when the user allows it.
export const reveal = (on: boolean) =>
  on
    ? "opacity-100 translate-y-0 motion-safe:transition-[opacity,translate] motion-safe:duration-300"
    : "opacity-0 translate-y-1 pointer-events-none motion-safe:transition-[opacity,translate] motion-safe:duration-300"
