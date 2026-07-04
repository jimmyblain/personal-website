/**
 * Media appearances shown on /media.
 * To add one: append an item here. YouTube wants the video id (youtube.com/watch?v=<id>);
 * Spotify/Apple want the full *embed* URL from each platform's Share → Embed dialog.
 */
export type MediaItem =
  | { provider: "youtube"; id: string; title: string; meta: string; featured?: boolean }
  | { provider: "spotify" | "apple"; url: string; title: string; meta: string; featured?: boolean }

export const mediaItems: MediaItem[] = [
  {
    provider: "youtube",
    id: "jNQXAC9IVRw", // PLACEHOLDER — replace with real video id
    title: "Agentic IT: shipping AI that ships",
    meta: "Keynote · DevOps NYC · 2026",
    featured: true,
  },
  {
    provider: "spotify",
    url: "https://open.spotify.com/embed/episode/REPLACE_WITH_EPISODE_ID", // PLACEHOLDER
    title: "The player-coach CIO",
    meta: "Ship It! · Ep. 214",
  },
  {
    provider: "apple",
    url: "https://embed.podcasts.apple.com/us/podcast/REPLACE_WITH_SHOW?i=REPLACE_WITH_EPISODE", // PLACEHOLDER
    title: "Identity at scale",
    meta: "The Access Layer · Ep. 58",
  },
]
