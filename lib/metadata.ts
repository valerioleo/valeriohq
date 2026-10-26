import type { Metadata } from "next"

import { siteConfig } from "@/lib/config"

type Page = {
  title: string
  description?: string
  // Site-relative; metadataBase in the root layout makes it absolute.
  path: string
  publishedTime?: string
  // The segment has its own opengraph-image file (posts). Naming the site
  // card here would override it, so it's left out.
  ownCard?: boolean
}

// Title, description and share fields for one page. Next merges metadata
// shallowly, so a page that sets only its title inherits the layout's whole
// openGraph and its share card reads as the homepage. Every page passes its
// own through here instead.
//
// Setting openGraph also drops the image the root opengraph-image file would
// have lent the page, so the site card is named here unless the page brings
// its own.
const siteCard = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
}

export const pageMetadata = ({
  title,
  description = siteConfig.description,
  path,
  publishedTime,
  ownCard = false,
}: Page): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    description,
    url: path,
    siteName: siteConfig.name,
    ...(ownCard ? {} : { images: [siteCard] }),
    ...(publishedTime
      ? { type: "article", publishedTime }
      : { type: "website" }),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: `@${siteConfig.handle}`,
  },
})
