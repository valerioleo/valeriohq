import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

export function Analytics() {
  // The insights endpoint is provided by Vercel, not by next start.
  if (process.env.VERCEL !== "1") return null
  return <VercelAnalytics />
}
