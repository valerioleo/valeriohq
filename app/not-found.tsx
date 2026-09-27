import Link from "next/link"

export default function NotFound() {
  return (
    <div className="py-28 text-center">
      <p className="font-mono text-xs text-muted-foreground">404 · not found</p>
      <h1 className="mt-4 text-[1.1875rem] font-medium">
        This page is{" "}
        {/* The confidential-money wink: redacted until you look closer. */}
        <span className="redacted" tabIndex={0}>
          confidential
        </span>
        . Or it doesn&apos;t exist.
      </h1>
      <p className="mt-3 italic text-muted-foreground">
        Probably the second one.
      </p>
      <p className="mt-10 font-mono text-xs">
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-brand"
        >
          ← home
        </Link>
      </p>
    </div>
  )
}
