import Script from "next/script"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

// Umami Cloud's website for this site. Public by design: it ships in the page.
const UMAMI_WEBSITE_ID = "61f9342a-8ea8-4500-96e1-dbf013c1d902"

// Umami is reached through the site's own origin, which ad blockers leave
// alone: the script is a rewrite (next.config.mjs), the events a route
// handler (app/vhq/api/send).
const UMAMI_PATH = "/vhq"

// The tracker double-checks the domain itself, honours Do Not Track, and
// sends Core Web Vitals along with page views.
const Umami = () => (
  <Script
    src={`${UMAMI_PATH}/script.js`}
    strategy="afterInteractive"
    data-website-id={UMAMI_WEBSITE_ID}
    data-host-url={UMAMI_PATH}
    data-domains="www.valeriohq.com,valeriohq.com"
    data-do-not-track="true"
    data-performance="true"
  />
)

export const Analytics = () => {
  // The insights endpoint is provided by Vercel, not by next start.
  if (process.env.VERCEL !== "1") return null
  return (
    <>
      <VercelAnalytics />
      {/* Previews would count as visits, so only production reports. */}
      {process.env.VERCEL_ENV === "production" ? <Umami /> : null}
    </>
  )
}
