import "@/styles/globals.css"
import type { Metadata, Viewport } from "next"
import { allPosts, allProjects } from "content-collections"

import { siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ConsoleGreeting } from "@/components/console-greeting"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eee6e5" },
    { media: "(prefers-color-scheme: dark)", color: "#022331" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@valeriohq",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = allPosts
    .filter((p) => !p.draft)
    .map((p) => ({ title: p.title, url: p.url }))
  const projects = allProjects.map((p) => ({ title: p.title, url: p.url }))

  return (
    // Font variables must live on <html>: Tailwind's @theme tokens
    // (--font-serif etc.) resolve their var() references at :root scope.
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5">
            <SiteHeader posts={posts} projects={projects} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <ConsoleGreeting />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
