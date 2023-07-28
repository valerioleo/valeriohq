"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

export function ModeToggle() {
  const { setTheme, theme, systemTheme } = useTheme()

  useEffect(() => {
    setTheme(systemTheme || 'light')
  }, [])

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border rounded-md w-6 h-6 flex items-center justify-center">
      <span className="sr-only">Toggle mode</span>
      {
        theme === 'light'
          ? <Moon className="w-4 h-4" />
          : <Sun className="w-4 h-4" />
      }
    </button>
  )
}
