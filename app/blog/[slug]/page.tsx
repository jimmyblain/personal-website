import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import { createMdxComponents } from "@/components/mdx"
import { Objectives } from "@/components/objectives"
import { Shell } from "@/components/shell"
import { TagChip } from "@/components/tag-chip"
import { Window } from "@/components/window"
import { codeTheme } from "@/lib/code-theme"
import { getHeadings } from "@/lib/headings"
import { stripFlowComments } from "@/lib/mdx"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { rssAlternate } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}`, types: rssAlternate() },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      publishedTime: `${post.date}T12:00:00.000Z`,
      tags: [...post.tags],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // The section list is read straight from the post's "## " headings, so a new post gets its
  // Objectives window (and matching anchor ids) with no layout work.
  const headings = getHeadings(post.content)

  return (
    <Shell aside={<Objectives headings={headings} variant="sidebar" />}>
      <Window as="header" title={`Journal entry · ${post.date}`}>
        <Link
          href="/blog"
          className="px-label inline-flex min-h-9 items-center text-link transition-colors duration-150 hover:text-link-hover"
        >
          ← All posts
        </Link>
        <h1 className="mt-1 text-balance font-pixel text-[2.4rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
          {post.title}
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">{post.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="px-label text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time> · {post.readingTime} min read
          </span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <TagChip key={t} tag={t} />
              ))}
            </div>
          )}
        </div>
      </Window>

      <Objectives headings={headings} variant="inline" />

      <Window as="article" aria-label={post.title}>
        <div className="article-body max-w-[740px]">
          <MDXRemote
            source={stripFlowComments(post.content)}
            components={createMdxComponents()}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode, { theme: codeTheme, keepBackground: true, defaultLang: "text" }]],
              },
            }}
          />
        </div>
      </Window>
    </Shell>
  )
}
