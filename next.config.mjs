import { withContentCollections } from "@content-collections/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Umami's tracker, served from the site's own origin so ad blockers leave
  // it alone. Its events go through a route handler instead
  // (app/vhq/api/send), which a rewrite couldn't replace: see
  // lib/umami-proxy.ts.
  rewrites: async () => [
    {
      source: "/vhq/script.js",
      destination: "https://cloud.umami.is/script.js",
    },
    // The CV is a static page in public/cv, which is also the PDF's source
    // (scripts/build-cv.mjs). Nothing links to it.
    {
      source: "/cv",
      destination: "/cv/index.html",
    },
  ],
  // Unlisted, so kept out of search results too: the page, the PDF and its
  // fonts. robots.txt stays silent about it, since naming it there would
  // advertise it.
  headers: async () => [
    {
      source: "/cv/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
    {
      source: "/cv",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
  ],
}

export default withContentCollections(nextConfig)
