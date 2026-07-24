"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ArrowUpRight, Moon, Sun } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { navItemClass } from "@/components/nav-link"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const foodScience = [
  "One more thing — before confidential money, I studied food science",
  "at the University of Gastronomic Sciences in Pollenzo.",
  "Fermentation and cryptography are the same discipline:",
  "controlled processes you can trust without watching.",
].join("\n")

type Entry = { title: string; url: string }

export function CommandMenu({
  posts = [],
  projects = [],
}: {
  posts?: Entry[]
  projects?: Entry[]
}) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    fn()
  }

  return (
    <>
      {/* Keyboard affordance — pointless on touch, so hidden below sm. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className={cn(
          navItemClass,
          "ml-1 hidden rounded-sm border border-border px-2.5 text-muted-foreground hover:border-foreground/30 hover:text-foreground sm:inline-flex"
        )}
      >
        ⌘K
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Go to">
            <CommandItem value="home" onSelect={() => run(() => router.push("/"))}>
              Home
            </CommandItem>
            {siteConfig.nav.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => run(() => router.push(item.href))}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          {posts.length > 0 && (
            <CommandGroup heading="Writing">
              {posts.map((p) => (
                <CommandItem
                  key={p.url}
                  value={`writing ${p.title}`}
                  onSelect={() => run(() => router.push(p.url))}
                >
                  {p.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {projects.length > 0 && (
            <CommandGroup heading="Work">
              {projects.map((p) => (
                <CommandItem
                  key={p.url}
                  value={`work ${p.title}`}
                  onSelect={() => run(() => router.push(p.url))}
                >
                  {p.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem value="theme light" onSelect={() => run(() => setTheme("light"))}>
              <Sun /> Light
            </CommandItem>
            <CommandItem value="theme dark" onSelect={() => run(() => setTheme("dark"))}>
              <Moon /> Dark
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Off the record">
            <CommandItem
              value="about the chef gastronomy food science"
              onSelect={() =>
                run(() =>
                  console.log(
                    `%c${foodScience}`,
                    "color:#8a8079;font-size:12px;line-height:1.6"
                  )
                )
              }
            >
              About the chef
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                → console
              </span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Elsewhere">
            <CommandItem
              value="x twitter"
              onSelect={() => run(() => window.open(siteConfig.links.x, "_blank"))}
            >
              X (Twitter)
              <ArrowUpRight className="ml-auto size-3.5 opacity-60" />
            </CommandItem>
            <CommandItem
              value="github"
              onSelect={() => run(() => window.open(siteConfig.links.github, "_blank"))}
            >
              GitHub
              <ArrowUpRight className="ml-auto size-3.5 opacity-60" />
            </CommandItem>
            <CommandItem
              value="linkedin"
              onSelect={() => run(() => window.open(siteConfig.links.linkedin, "_blank"))}
            >
              LinkedIn
              <ArrowUpRight className="ml-auto size-3.5 opacity-60" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
