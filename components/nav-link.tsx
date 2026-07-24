"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

// Shared by every navbar item purely for height + centering, so links, ⌘K
// and the theme toggle sit on one line. Deliberately carries no border:
// links look like text, only ⌘K is dressed as a button.
export const navItemClass = "inline-flex h-8 items-center transition-colors"

// Tiny client island so the current section can carry the brand outline.
export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        navItemClass,
        "px-1.5 underline-offset-[6px]",
        active
          ? "text-foreground underline decoration-brand decoration-[1.5px]"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}
