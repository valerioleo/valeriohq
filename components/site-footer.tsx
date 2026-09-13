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
    <footer className="mt-16 border-t border-dashed border-border pb-8 pt-6 font-mono text-xs text-muted-foreground sm:mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4">
        <div className="flex items-baseline gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-8 items-center transition-colors hover:text-brand"
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
