/**
 * Shown on /blog and the homepage when no posts are published. Mirrors PostRow's
 * top rule and vertical rhythm so the empty list reads as deliberate, not broken.
 */
export function EmptyPosts() {
  return (
    <p className="border-t border-border-subtle py-6 text-muted-foreground">
      First post landing soon. Subscribe via RSS to catch it.
    </p>
  )
}
