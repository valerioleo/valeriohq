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
      className={cn(
        navItemClass,
        "w-8 justify-center text-muted-foreground hover:text-foreground [&_svg]:size-[15px]"
      )}
    >
      {mounted ? <Icon /> : <Monitor />}
      <span className="sr-only">{label}</span>
    </button>
  )
}
