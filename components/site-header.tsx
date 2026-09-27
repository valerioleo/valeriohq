import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { NavLink } from "@/components/nav-link"

export function SiteHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 pb-4 pt-6 sm:grid-cols-[1fr_auto_auto] sm:gap-x-3 sm:pt-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-3 whitespace-nowrap text-[1.1875rem] font-medium tracking-[-0.01875rem] transition-colors hover:text-brand"
      >
        <Logo className="size-10 sm:size-12" />
        <span>{siteConfig.name}</span>
      </Link>

      {/* A second line on mobile keeps the name and every destination visible. */}
      <nav
        aria-label="Main navigation"
        className="col-span-2 row-start-2 flex items-center gap-5 font-mono text-xs sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:gap-4"
      >
        {siteConfig.nav.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.title.toLowerCase()}
          </NavLink>
        ))}
      </nav>
      <div className="col-start-2 row-start-1 sm:col-start-3">
        <ModeToggle />
      </div>
    </header>
  )
}
