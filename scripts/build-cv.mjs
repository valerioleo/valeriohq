#!/usr/bin/env node
/**
 * public/cv/index.html -> public/cv/valerio-leo-cv.pdf
 *
 *   pnpm cv
 *
 * The page served at /cv is also the PDF's source. This serves public/ on a
 * throwaway local port, so the page's absolute paths (/cv/fonts, the logo)
 * resolve exactly as they do on the site, and prints it with headless
 * Chrome. Page size and margins come from the page's own @page rule.
 * Set CHROME to use a browser other than the default macOS install.
 *
 * The CV is meant to be one page. If an edit makes it spill onto a second,
 * the PDF is still written and the script exits non-zero to say so.
 */

import { execFile } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { createServer } from "node:http"
import { dirname, extname, join, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const publicDir = join(root, "public")
const target = join(publicDir, "cv", "valerio-leo-cv.pdf")

const chrome =
  process.env.CHROME ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

const types = {
  ".html": "text/html; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
}

// Maps a request path to a file under public/, never outside it.
const fileFor = url => {
  const path = decodeURIComponent(new URL(url, "http://localhost").pathname)
  const file = resolve(publicDir, `.${path.endsWith("/") ? `${path}index.html` : path}`)
  return file.startsWith(publicDir + sep) ? file : undefined
}

const server = createServer((req, res) => {
  const file = fileFor(req.url ?? "/")
  const send = (status, body, type) => {
    res.writeHead(status, type ? { "content-type": type } : {})
    res.end(body)
  }
  if (!file) return send(404)
  readFile(file).then(
    body => send(200, body, types[extname(file)] ?? "application/octet-stream"),
    () => send(404),
  )
})

const countPages = file =>
  (readFileSync(file, "latin1").match(/\/Type\s*\/Page\b/g) ?? []).length

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME to its path.`)
  process.exit(1)
}

await new Promise(done => server.listen(0, "127.0.0.1", done))
const { port } = server.address()

await promisify(execFile)(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  // Virtual time lets the fonts finish loading before the print.
  "--virtual-time-budget=5000",
  `--print-to-pdf=${target}`,
  `http://127.0.0.1:${port}/cv/index.html`,
]).finally(() => server.close())

const pages = countPages(target)

console.log(`Wrote ${relative(root, target)} (${pages} page${pages === 1 ? "" : "s"})`)

if (pages !== 1) {
  console.error("The CV no longer fits on one page.")
  process.exit(1)
}
