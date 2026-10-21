import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { NavLink } from "@/components/nav-link"

export function SiteHeader() {
  return (
    // One row in source order, so what you see is the order you tab through.
    // If the nav ever outgrows a narrow screen, it wraps to a second line.
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3 pb-4 pt-6 sm:gap-x-3 sm:pt-8">
      <Link
        href="/"
        className="me-auto inline-flex items-center gap-3 whitespace-nowrap text-[1.1875rem] font-medium tracking-[-0.01875rem] transition-colors hover:text-brand"
      >
        <Logo className="size-10 sm:size-12" />
        <span>{siteConfig.name}</span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex items-center gap-5 font-mono text-xs sm:gap-4"
      >
        {siteConfig.nav.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.title.toLowerCase()}
          </NavLink>
        ))}
      </nav>
      <ModeToggle />
    </header>
  )
}
