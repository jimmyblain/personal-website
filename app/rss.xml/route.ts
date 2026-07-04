import { generateRssXml } from "@/lib/feed"
import { getAllPosts } from "@/lib/posts"

export const dynamic = "force-static"

export function GET() {
  return new Response(generateRssXml(getAllPosts()), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
