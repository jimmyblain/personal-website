import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PostRow } from "@/components/post-row"
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
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">Writing</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Tagged: {match.tag}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"} ·{" "}
        <Link href="/blog" className="text-link transition-colors duration-150 hover:text-link-hover">
          All posts
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <TagChip key={t.slug} tag={t.tag} active={t.slug === tag} />
        ))}
      </div>

      <div className="mt-12">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} showTags headingLevel="h2" />
        ))}
      </div>
    </div>
  )
}
