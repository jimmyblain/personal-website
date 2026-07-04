import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DEFAULT_DIR = path.join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 200

export type Post = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  summary: string
  tags: string[]
  draft: boolean
  readingTime: number // minutes
  content: string // raw markdown body (frontmatter stripped)
}

type Options = {
  /** Defaults to true in `next dev`, false in production builds. */
  includeDrafts?: boolean
  /** Content directory override (used by tests). */
  dir?: string
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

function parsePost(filePath: string): Post {
  const file = path.basename(filePath)
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"))

  // gray-matter parses unquoted YAML dates as JS Date objects
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date

  const checks: [string, boolean][] = [
    ["title", typeof data.title === "string" && data.title.length > 0],
    ["date", typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)],
    ["summary", typeof data.summary === "string" && data.summary.length > 0],
    ["tags", Array.isArray(data.tags) && data.tags.every((t: unknown) => typeof t === "string")],
  ]
  for (const [field, ok] of checks) {
    if (!ok) {
      throw new Error(
        `content/blog/${file}: missing or invalid frontmatter field "${field}". ` +
          `Expected schema: title (string), date (YYYY-MM-DD), summary (string), tags (string[]), draft (boolean, optional).`,
      )
    }
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: data.title,
    date,
    summary: data.summary,
    tags: data.tags,
    draft: data.draft === true,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  }
}

export function getAllPosts(opts: Options = {}): Post[] {
  const { includeDrafts = process.env.NODE_ENV === "development", dir = DEFAULT_DIR } = opts
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => parsePost(path.join(dir, f)))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string, opts: Options = {}): Post | undefined {
  return getAllPosts(opts).find((p) => p.slug === slug)
}

export function getAllTags(opts: Options = {}): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts(opts)) {
    for (const t of post.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagToSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}
