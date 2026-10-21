import "@/styles/globals.css"
import "@/styles/annotations.css"
import type { Metadata, Viewport } from "next"

import { siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { themeChrome } from "@/lib/theme"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ConsoleGreeting } from "@/components/console-greeting"
import { ThemeColor } from "@/components/theme-color"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeChrome.light },
    { media: "(prefers-color-scheme: dark)", color: themeChrome.dark },
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
  return (
    // Font variables must live on <html>: Tailwind's @theme tokens
    // (--font-sans etc.) resolve their var() references at :root scope.
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className="min-h-dvh antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto flex min-h-dvh max-w-[36.375rem] flex-col px-5">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <ThemeColor />
          <ConsoleGreeting />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
