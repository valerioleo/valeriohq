import { Inter, IBM_Plex_Mono } from "next/font/google"

// One family for reading, like benji.org: Inter at text size, with weight
// and grey doing the hierarchy. Plex Mono stays for nav, dates, code.

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  style: ["normal", "italic"],
})

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
})

export const fontVariables = `${fontSans.variable} ${fontMono.variable}`
