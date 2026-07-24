"use client"

import { useEffect } from "react"

// Easter egg — the food-science reveal, for anyone who opens devtools.
// "Discover, don't advertise." Kept to console.log (no effect on Lighthouse).
export function ConsoleGreeting() {
  useEffect(() => {
    const brand = "color:#c96a3a;font-weight:600;font-size:13px"
    const dim = "color:#8a8079;font-size:12px;line-height:1.6"

    console.log("%cYou opened the console. Good instinct.", brand)
    console.log(
      "%cBefore confidential money, I studied the science of food — at the University of\nGastronomic Sciences in Pollenzo, the school the Slow Food movement built.\nAsk me about it sometime.",
      dim
    )
    console.log("%c→ https://github.com/valerioleo", dim)
  }, [])

  return null
}
