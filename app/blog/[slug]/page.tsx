import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import { mdxComponents } from "@/components/mdx"
import { TagChip } from "@/components/tag-chip"
import { codeTheme } from "@/lib/code-theme"
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts"

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
    alternates: { canonical: `/blog/${post.slug}` },
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

  return (
    <article className="mx-auto max-w-[680px] px-5 pb-24 pt-14">
      <Link
        href="/blog"
        className="mono-label text-link transition-colors duration-150 hover:text-link-hover"
      >
        ← All posts
      </Link>

      <div className="mono-label mt-9 flex items-center gap-3 font-normal text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="size-[3px] rounded-full bg-muted-foreground" />
        <span>{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.625rem]">
        {post.title}
      </h1>

      {post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
      )}

      <div className="article-body mt-10">
        <MDXRemote
          source={post.content.replace(/<!--[\s\S]*?-->/g, "")}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, { theme: codeTheme, keepBackground: true, defaultLang: "text" }]],
            },
          }}
        />
      </div>
    </article>
  )
}
