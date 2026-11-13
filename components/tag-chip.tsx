import Link from "next/link"
import { tagToSlug } from "@/lib/posts"
import { cn } from "@/lib/utils"

export function TagChip({ tag, active = false }: { tag: string; active?: boolean }) {
  return (
    <Link
      href={`/blog/tag/${tagToSlug(tag)}`}
      className={cn(
        "inline-flex min-h-8 items-center rounded border-2 px-2.5 font-pixel text-[16px] uppercase tracking-[0.05em] transition-colors duration-150",
        active
          ? "border-primary text-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {tag}
    </Link>
  )
}
