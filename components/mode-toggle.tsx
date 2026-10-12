"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { navItemClass } from "@/components/nav-link"

const ORDER = ["light", "dark", "system"] as const
type ThemeChoice = (typeof ORDER)[number]

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current: ThemeChoice =
    mounted && ORDER.includes(theme as ThemeChoice)
      ? (theme as ThemeChoice)
      : "system"

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]
    setTheme(next)
  }

  const Icon =
    current === "dark" ? Moon : current === "light" ? Sun : Monitor

  const label =
    current === "dark"
      ? "Dark theme"
      : current === "light"
        ? "Light theme"
        : "System theme"

  return (
    <button
      type="button"
      aria-label={`${label}. Click to cycle theme.`}
      title={label}
      onClick={cycle}
      // The 32px hit area centres a 15px glyph, which left the icon ~10px
      // shy of the column edge. Pulling the box right puts the glyph, not
      // the box, on the edge the dates and rules below end on.
      className={cn(
        navItemClass,
        "-mr-2.5 w-8 justify-center text-muted-foreground hover:text-foreground [&_svg]:size-[15px]"
      )}
    >
      {mounted ? <Icon /> : <Monitor />}
      <span className="sr-only">{label}</span>
    </button>
  )
}
