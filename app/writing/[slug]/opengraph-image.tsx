import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { allPosts } from "content-collections"

import { siteConfig } from "@/lib/config"

export const alt = "Writing"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  const title = post?.title ?? siteConfig.name

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
            <div style={{ color: "#8aa3ac" }}>writing</div>
          </div>

          <div
            style={{
              fontFamily: "Petrona",
              fontSize: title.length > 60 ? 54 : 64,
              color: "#e7eef0",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              maxWidth: 1000,
            }}
          >
            {title}
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
              {`${siteConfig.name} · ${siteConfig.url.replace("https://", "")}`}
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
