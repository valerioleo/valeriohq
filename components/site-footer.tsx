import { siteConfig } from "@/lib/config"
import { LocalClock } from "@/components/local-clock"
import { CurrentYear } from "@/components/current-year"

export function SiteFooter() {
  const links = [
    { label: "x", href: siteConfig.links.x },
    { label: "github", href: siteConfig.links.github },
    { label: "linkedin", href: siteConfig.links.linkedin },
  ]

  return (
    <footer className="mt-24 border-t border-dashed border-border pb-10 pt-6 font-mono text-xs text-muted-foreground">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-baseline gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-baseline gap-4">
          <LocalClock />
          <span>
            © <CurrentYear initial={new Date().getFullYear()} />{" "}
            {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
