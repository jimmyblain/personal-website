/**
 * Section headings for a post's "Objectives" list.
 *
 * The list is derived from the Markdown source, and the rendered `<h2>` ids are derived from the
 * rendered heading text. Both go through `slugifyHeading` + `headingSlugger`, so a list link
 * always lands on its heading without the post author doing anything.
 */

export type Heading = { text: string; slug: string }

export function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return slug || "section"
}

/** Returns a function that slugs titles in document order, numbering repeats (-2, -3, …). */
export function headingSlugger(): (text: string) => string {
  const seen = new Map<string, number>()
  return (text) => {
    const base = slugifyHeading(text)
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1 ? base : `${base}-${count}`
  }
}

/** Reduce inline Markdown to the text a reader sees. */
function plainText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__|\*|_|~~)(.+?)\1/g, "$2")
    .replace(/\s+/g, " ")
    .trim()
}

/** Level-2 (`## `) headings in source order, skipping anything inside a fenced code block. */
export function getHeadings(source: string): Heading[] {
  const slug = headingSlugger()
  const headings: Heading[] = []
  let fence: string | null = null

  for (const line of source.split("\n")) {
    const marker = line.match(/^(```|~~~)/)?.[1]
    if (marker) {
      if (fence === null) fence = marker
      else if (fence === marker) fence = null
      continue
    }
    if (fence !== null) continue

    const match = line.match(/^##\s+(.+?)\s*#*\s*$/)
    if (!match) continue
    const text = plainText(match[1])
    if (text) headings.push({ text, slug: slug(text) })
  }
  return headings
}
