import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PostRow } from "@/components/post-row"
import { Shell } from "@/components/shell"
import { Window } from "@/components/window"
import { TagChip } from "@/components/tag-chip"
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts"
import { rssAlternate } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const match = getAllTags().find((t) => t.slug === tag)
  if (!match) return {}
  return {
    title: `Posts tagged "${match.tag}"`,
    description: `Writing tagged ${match.tag}.`,
    alternates: { canonical: `/blog/tag/${tag}`, types: rssAlternate() },
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const tags = getAllTags()
  const match = tags.find((t) => t.slug === tag)
  if (!match) notFound()

  const posts = getAllPosts().filter((p) => p.tags.some((t) => tagToSlug(t) === tag))

  return (
    <Shell>
      <Window as="header" title="Journal · tag">
        <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
          Tagged: {match.tag}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} ·{" "}
          <Link
            href="/blog"
            className="text-link underline decoration-link/40 underline-offset-4 transition-colors duration-150 hover:text-link-hover"
          >
            All posts
          </Link>
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagChip key={t.slug} tag={t.tag} active={t.slug === tag} />
          ))}
        </div>
      </Window>

      <Window title={`Entries · ${posts.length}`} aria-label={`Posts tagged ${match.tag}`}>
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} showTags headingLevel="h2" />
          ))}
        </div>
      </Window>
    </Shell>
  )
}
