import { describe, expect, it } from "vitest"
import path from "node:path"
import { formatDate, getAllPosts, getAllTags, getPostBySlug, tagToSlug } from "../lib/posts"

// import.meta.dirname requires Node 20.11+ (tests run as ESM under Vitest — no __dirname)
const dir = path.join(import.meta.dirname, "fixtures", "blog")
const badDir = path.join(import.meta.dirname, "fixtures", "bad")

describe("getAllPosts", () => {
  it("returns published posts sorted newest first, slug from filename", () => {
    const posts = getAllPosts({ dir })
    expect(posts.map((p) => p.slug)).toEqual(["second-post", "second-post-b", "first-post"])
  })
  it("breaks ties between equal-date posts by slug ascending, deterministically", () => {
    const posts = getAllPosts({ dir }).filter((p) => p.date === "2026-03-02")
    expect(posts.map((p) => p.slug)).toEqual(["second-post", "second-post-b"])
  })
  it("normalizes both quoted and unquoted YAML dates to YYYY-MM-DD strings", () => {
    const posts = getAllPosts({ dir, includeDrafts: true })
    for (const p of posts) expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
  it("excludes drafts by default, includes them when asked", () => {
    expect(getAllPosts({ dir }).some((p) => p.draft)).toBe(false)
    expect(getAllPosts({ dir, includeDrafts: true }).map((p) => p.slug)).toContain("draft-post")
  })
  it("computes readingTime of at least 1 minute", () => {
    for (const p of getAllPosts({ dir })) expect(p.readingTime).toBeGreaterThanOrEqual(1)
  })
  it("throws a clear error naming the file for invalid frontmatter", () => {
    expect(() => getAllPosts({ dir: badDir })).toThrow(/missing-title\.md/)
    expect(() => getAllPosts({ dir: badDir })).toThrow(/title/)
  })
})

describe("getPostBySlug", () => {
  it("finds a post by slug", () => {
    expect(getPostBySlug("first-post", { dir })?.title).toBe("First Post")
  })
  it("returns undefined for unknown slug", () => {
    expect(getPostBySlug("nope", { dir })).toBeUndefined()
  })
})

describe("tags", () => {
  it("counts unique tags across published posts", () => {
    expect(getAllTags({ dir })).toEqual([
      { tag: "AI", slug: "ai", count: 2 },
      { tag: "Python", slug: "python", count: 1 },
    ])
  })
  it("slugifies tags", () => {
    expect(tagToSlug("Claude Agent SDK")).toBe("claude-agent-sdk")
  })
})

describe("formatDate", () => {
  it("formats YYYY-MM-DD without timezone drift", () => {
    expect(formatDate("2026-06-12")).toBe("Jun 12, 2026")
  })
})
