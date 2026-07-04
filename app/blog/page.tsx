import type { Metadata } from "next"
import { PostRow } from "@/components/post-row"
import { getAllPosts } from "@/lib/posts"
import { rssAlternate } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes from running enterprise IT and building the systems behind it.",
  alternates: { canonical: "/blog", types: rssAlternate() },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">Writing</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Notes on IT, AI & automation
      </h1>
      <p className="mt-6 max-w-[56ch] text-lg leading-[1.75] text-muted-foreground">
        Field notes from running enterprise IT and building the systems behind it.
      </p>

      <div className="mt-14">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} showTags headingLevel="h2" />
        ))}
      </div>
    </div>
  )
}
