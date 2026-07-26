/**
 * Not in the design handoff — added so the RSS feed has a visible entry point
 * (autodiscovery alone only helps readers with a feed extension). Mirrors the
 * navbar's horizontal padding and subtle rule so it reads as the same chrome.
 *
 * The year is evaluated at build time, so it updates on the next deploy rather
 * than at midnight on Jan 1 — fine for a site that redeploys on every push.
 */
export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="flex items-center justify-between px-5 py-6 text-sm text-muted-foreground md:px-11">
        {/* site.name is the lowercase wordmark; a copyright line wants the plain name */}
        <p>© {new Date().getFullYear()} Jimmy Blain</p>
        <a
          href="/rss.xml"
          className="text-link transition-colors duration-150 hover:text-link-hover"
        >
          RSS
        </a>
      </div>
    </footer>
  )
}
