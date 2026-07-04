import Link from "next/link"
import { formatDate, type Post } from "@/lib/posts"
import { TagChip } from "@/components/tag-chip"

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
    <article className="group relative border-t border-border-subtle py-6">
      <div className="flex items-baseline justify-between gap-4">
        <Heading className="text-[17px] font-semibold leading-snug tracking-[-0.01em] md:text-[19px]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-link"
          >
            {post.title}
          </Link>
        </Heading>
        <time dateTime={post.date} className="mono-label shrink-0 font-normal text-muted-foreground">
          {formatDate(post.date)}
        </time>
      </div>
      <p className="mt-2 max-w-[64ch] text-muted-foreground">{post.summary}</p>
      {showTags && post.tags.length > 0 && (
        <div className="relative z-10 mt-3 flex w-fit flex-wrap gap-2">
          {post.tags.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  )
}
