/**
 * Site footer: copyright plus a visible RSS entry point (autodiscovery alone only helps readers
 * with a feed extension). Shares the Shell's width and gutters so it lines up with the windows.
 *
 * The year is evaluated at build time, so it updates on the next deploy rather
 * than at midnight on Jan 1 — fine for a site that redeploys on every push.
 */
export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-3 pb-8 sm:px-5 md:px-9">
      <div className="px-label flex items-center justify-between border-t-2 border-dashed border-border pt-5 text-muted-foreground">
        {/* site.name is the lowercase wordmark; a copyright line wants the plain name */}
        <p>© {new Date().getFullYear()} Jimmy Blain</p>
        <a
          href="/rss.xml"
          className="flex min-h-11 items-center text-link transition-colors duration-150 hover:text-link-hover"
        >
          RSS
        </a>
      </div>
    </footer>
  )
}
