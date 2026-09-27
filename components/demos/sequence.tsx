"use client"

import { useEffect, useRef, useState } from "react"

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

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

const useSequence = (durations: number[]) => {
  const reduced = useReducedMotion()
  const last = durations.length - 1
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!armed) return
    if (reduced) {
      setStep(last)
      setPlaying(false)
    } else {
      setStep(0)
      setPlaying(true)
    }
  }, [armed, reduced, last])

  useEffect(() => {
    if (!playing) return
    if (step >= last) {
      setPlaying(false)
      return
    }
    const t = window.setTimeout(() => setStep(s => s + 1), durations[step])
    return () => window.clearTimeout(t)
  }, [playing, step, durations, last])

  const replay = () => {
    if (reduced) setStep(s => (s >= last ? 0 : s + 1))
    else {
      setStep(0)
      setPlaying(true)
    }
  }

  return { ref, step, last, playing, reduced, replay }
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
          {reduced ? `step ${step + 1} of ${last + 1}` : playing ? "playing" : "done"}
        </span>
        <button
          type="button"
          onClick={replay}
          className="rounded-md border border-border px-2.5 py-1 transition-colors hover:border-brand hover:text-brand"
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
    ? "opacity-100 translate-y-0 motion-safe:transition-all motion-safe:duration-300"
    : "opacity-0 translate-y-1 pointer-events-none motion-safe:transition-all motion-safe:duration-300"
