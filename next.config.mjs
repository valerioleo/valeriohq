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
  ],
}

export default withContentCollections(nextConfig)
