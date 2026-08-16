import { Instrument_Sans, Petrona, IBM_Plex_Mono } from "next/font/google"

// Direction C — serif body · sans UI · mono metadata, with Petrona reading.
//
// The trio structure is the original one; only the reading face changed. That
// swap came from a real legibility bug: Literata's `1` has a short flag on a
// stem the same width as its `l`, so "v1" read as "vl" — bad on a site whose
// prose is full of v1, tx0 → tx1, ERC-7984 and euint64.
//
// Geist was tried and reverted: it fixes the digits but turns the whole page
// into a product surface rather than something you read.
//
// Petrona   — the reading face. Humanist and warm rather than bookish-formal,
//             variable on weight, with a true italic. Keeps the editorial feel
//             Geist gave up. Candidates and the digit test live at
//             /sandbox/fonts.
// Instrument— the UI face. Quiet grotesque with softly angled terminals;
//             does small-size support work without reading as Inter.
// Plex Mono — the machine voice. Dates, nav, labels, code. Typewriter warmth
//             rather than IDE chrome.

export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const fontSerif = Petrona({
  subsets: ["latin"],
  variable: "--font-petrona",
  display: "swap",
  style: ["normal", "italic"],
})

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
})

export const fontVariables = `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`
