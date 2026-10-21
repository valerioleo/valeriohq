"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import { themeChrome } from "@/lib/theme"

const isChrome = (theme?: string): theme is keyof typeof themeChrome =>
  theme === "light" || theme === "dark"

// The theme-color metas from the root layout follow the OS scheme, but the
// page follows the theme you picked. Once the theme resolves, both metas
// point at it, so a dark page never sits under a light toolbar.
export const ThemeColor = () => {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!isChrome(resolvedTheme)) return
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach(meta => {
        meta.content = themeChrome[resolvedTheme]
      })
  }, [resolvedTheme])

  return null
}
