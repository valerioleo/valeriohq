"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { navItemClass } from "@/components/nav-link"

const ORDER = ["light", "dark", "system"] as const
type ThemeChoice = (typeof ORDER)[number]

const ICONS = { light: Sun, dark: Moon, system: Monitor } as const

const isChoice = (theme?: string): theme is ThemeChoice =>
  ORDER.some(choice => choice === theme)

// False on the server and during hydration, true after: the stored theme is
// only known on the client.
const subscribeNever = () => () => undefined
const useMounted = () =>
  React.useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  )

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  // The icons only cross-fade once you've pressed the toggle, so the stored
  // theme replacing the server's placeholder on load isn't animated.
  const [pressed, setPressed] = React.useState(false)

  const current: ThemeChoice = mounted && isChoice(theme) ? theme : "system"

  const cycle = () => {
    setPressed(true)
    setTheme(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length])
  }

  return (
    <button
      type="button"
      title={`Theme: ${current}`}
      onClick={cycle}
      // The 32px hit area centres a 15px glyph, which left the icon ~10px
      // shy of the column edge. Pulling the box to the end puts the glyph,
      // not the box, on the edge the dates and rules below end on.
      className={cn(
        navItemClass,
        "-me-2.5 w-8 justify-center text-muted-foreground hover:text-foreground"
      )}
    >
      {/* All three icons share one cell and cross-fade (.swap-icon in
          globals.css). The stroke matches the 12px mono beside it. */}
      <span aria-hidden data-animate={pressed ? "" : undefined} className="grid">
        {ORDER.map(choice => {
          const Icon = ICONS[choice]
          return (
            <Icon
              key={choice}
              size={15}
              strokeWidth={1.5}
              absoluteStrokeWidth
              data-hidden={choice === current ? undefined : ""}
              className="swap-icon"
            />
          )
        })}
      </span>
      <span className="sr-only">Change theme, currently {current}</span>
    </button>
  )
}
