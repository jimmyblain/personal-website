import Link from "next/link"
import type { Post } from "@/lib/posts"
import { TagChip } from "@/components/tag-chip"

/**
 * One journal entry in a list. The title link is stretched over the whole row; tag chips sit
 * above it (z-10) so they stay separately clickable without nesting links.
 */
export function PostRow({
  post,
  showTags = false,
  headingLevel = "h3",
}: {
  post: Post
  showTags?: boolean
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel
  return (
    <article className="group relative grid gap-x-5 gap-y-1.5 rounded-md bg-muted p-4 lg:grid-cols-[112px_1fr]">
      <time dateTime={post.date} className="px-label pt-0.5 text-primary">
        {post.date}
      </time>
      <div className="min-w-0">
        <Heading className="text-[19px] font-semibold leading-snug md:text-xl">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-link"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="mt-1.5 max-w-[64ch] text-muted-foreground">{post.summary}</p>
        {showTags && post.tags.length > 0 && (
          <div className="relative z-10 mt-3 flex w-fit flex-wrap gap-2">
            {post.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
