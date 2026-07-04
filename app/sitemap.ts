import type { MetadataRoute } from "next"
import { getAllPosts, getAllTags } from "@/lib/posts"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/blog", "/media", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }))
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
  }))
  const tags = getAllTags().map(({ slug }) => ({
    url: `${site.url}/blog/tag/${slug}`,
  }))
  return [...pages, ...posts, ...tags]
}
