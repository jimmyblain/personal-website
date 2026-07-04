import { describe, expect, it } from "vitest"
import { escapeXml, generateRssXml } from "../lib/feed"
import type { Post } from "../lib/posts"

const post: Post = {
  slug: "a-post",
  title: "Ampersands & <angles>",
  date: "2026-06-12",
  summary: 'She said "hi"',
  tags: ["AI"],
  draft: false,
  readingTime: 3,
  content: "body",
}

describe("escapeXml", () => {
  it("escapes the five XML special characters", () => {
    expect(escapeXml(`<a & "b" 'c'>`)).toBe("&lt;a &amp; &quot;b&quot; &apos;c&apos;&gt;")
  })
})

describe("generateRssXml", () => {
  const xml = generateRssXml([post])
  it("is RSS 2.0 with channel metadata", () => {
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain("<channel>")
    expect(xml).toContain("https://jimmyblain.com/rss.xml")
  })
  it("escapes item fields and links to the post", () => {
    expect(xml).toContain("Ampersands &amp; &lt;angles&gt;")
    expect(xml).toContain("<link>https://jimmyblain.com/blog/a-post</link>")
    expect(xml).toContain("<pubDate>Fri, 12 Jun 2026 12:00:00 GMT</pubDate>")
    expect(xml).toContain("<category>AI</category>")
  })
})
