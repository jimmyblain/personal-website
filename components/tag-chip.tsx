import Link from "next/link"
import { tagToSlug } from "@/lib/posts"
import { cn } from "@/lib/utils"

export function TagChip({ tag, active = false }: { tag: string; active?: boolean }) {
  return (
    <Link
      href={`/blog/tag/${tagToSlug(tag)}`}
      className={cn(
        "rounded-full border bg-muted px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150",
        active
          ? "border-foreground/40 text-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {tag}
    </Link>
  )
}
