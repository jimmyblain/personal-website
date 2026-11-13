/**
 * Shown on /blog and the homepage when no posts are published. Styled like a PostRow so the
 * empty list reads as deliberate, not broken.
 */
export function EmptyPosts() {
  return (
    <p className="rounded-md bg-muted p-4 text-muted-foreground">
      First post landing soon. Subscribe via{" "}
      <a href="/rss.xml" className="text-link transition-colors duration-150 hover:text-link-hover">
        RSS
      </a>{" "}
      to catch it.
    </p>
  )
}
