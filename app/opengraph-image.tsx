import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/config"

export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// OG cards are always the dark card: deep teal + apricot + Petrona.
// One recognisable artifact in every feed, whatever the reader's theme.
export default async function OpengraphImage() {
  const [petrona, plexMono, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/petrona-medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/plex-mono-regular.ttf")),
    readFile(join(process.cwd(), "public/valeriohq.svg")),
  ])
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#022331",
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(231, 238, 240, 0.18)",
            borderRadius: 8,
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "IBM Plex Mono",
              fontSize: 28,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} width={52} height={52} alt="" />
              <div style={{ color: "#e0906a" }}>{siteConfig.handle}</div>
            </div>
            <div style={{ color: "#8aa3ac" }}>{siteConfig.location.toLowerCase()}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "Petrona",
                fontSize: 76,
                color: "#e7eef0",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                fontFamily: "Petrona",
                fontSize: 32,
                color: "#8aa3ac",
                marginTop: 28,
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              {siteConfig.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "IBM Plex Mono",
              fontSize: 24,
            }}
          >
            <div style={{ color: "#8aa3ac" }}>
              {siteConfig.url.replace("https://", "")}
            </div>
            <div style={{ color: "#e0906a" }}>⁂</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Petrona", data: petrona, weight: 500, style: "normal" },
        { name: "IBM Plex Mono", data: plexMono, weight: 400, style: "normal" },
      ],
    }
  )
}
