import { Instrument_Sans, Literata, IBM_Plex_Mono } from "next/font/google"

// Direction A — serif body · sans UI · mono metadata.
//
// Literata    — the reading face. Commissioned for Google Play Books, i.e.
//               literally built for long-form reading on screens. Variable
//               with an optical-size axis (headings sharpen, body stays
//               sturdy) and true italics. Bookish without being antique,
//               and rare on developer blogs.
// Instrument  — the UI face. Quiet grotesque with softly angled terminals;
//               does small-size support work without reading as Inter.
// Plex Mono   — the machine voice. Dates, nav, labels, code. Typewriter
//               warmth rather than IDE chrome.

export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const fontSerif = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
})

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
})

export const fontVariables = `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`
