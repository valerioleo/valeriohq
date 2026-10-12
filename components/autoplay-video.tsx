"use client"

import { useEffect, useRef } from "react"

// A demo video that plays by itself, once, when most of it is in view, and
// pauses whenever it leaves. Muted, so browsers allow the autoplay. When it
// ends it goes back to its poster and stays there; the controls replay it.
// Under reduced motion it never starts on its own.
export const AutoplayVideo = (props: React.ComponentProps<"video">) => {
  const ref = useRef<HTMLVideoElement>(null)
  const finished = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !finished.current) {
          // A blocked autoplay just leaves the poster and controls in place.
          video.play().catch(() => undefined)
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause()
        }
      },
      { threshold: 0.6 }
    )
    const rest = () => {
      finished.current = true
      video.load()
    }

    observer.observe(video)
    video.addEventListener("ended", rest)
    return () => {
      observer.disconnect()
      video.removeEventListener("ended", rest)
    }
  }, [])

  return <video ref={ref} muted playsInline {...props} />
}
