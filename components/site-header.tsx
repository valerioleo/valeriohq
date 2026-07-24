import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { CommandMenu } from "@/components/command-menu"
import { NavLink } from "@/components/nav-link"

type Entry = { title: string; url: string }

export function SiteHeader({
  posts,
  projects,
}: {
  posts: Entry[]
  projects: Entry[]
}) {
  return (
    // flex-wrap is a safety net, not decoration: below ~340px the mark and
    // the nav strip can't share a line, so the nav drops to its own row
    // instead of forcing the whole page to scroll sideways.
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pb-6 pt-8">
      {/* Lockup: the periscope mark + serif wordmark. Mark alone on mobile. */}
      <Link
        href="/"
        className="inline-flex items-center gap-3 whitespace-nowrap font-serif text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors hover:text-brand"
      >
        <Logo className="size-14 sm:size-18" />
        <span className="hidden text-base sm:inline">{siteConfig.name}</span>
      </Link>

      {/* Nav in the mono metadata voice, lowercase. Links read as text;
          only ⌘K is dressed as a button, because only ⌘K is one. */}
      <nav className="flex items-center gap-1.5 font-mono text-[0.8125rem]">
        {siteConfig.nav.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.title.toLowerCase()}
          </NavLink>
        ))}
        <CommandMenu posts={posts} projects={projects} />
        <ModeToggle />
      </nav>
    </header>
  )
}
