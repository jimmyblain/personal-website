import { cn } from "@/lib/utils"

/**
 * Jimmy's 12×16 pixel sprite. Colors are fixed (not theme tokens): it is a portrait, so it looks
 * the same in both themes. Each path is one color; edit the `d` runs to redraw.
 */
export function Sprite({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={cn("block", className)}
    >
      {/* hair */}
      <path fill="#120e10" d="M3 0h6v1h1v3h-1v-2h-6v2h-1v-3h1z" />
      {/* skin: face and hands */}
      <path fill="#8a5a3c" d="M3 2h6v3h-6zM1 10h1v1h-1zM10 10h1v1h-1z" />
      {/* coat */}
      <path fill="#2f8f8a" d="M2 5h8v4h-8zM1 6h1v4h-1zM10 6h1v4h-1zM2 10h8v1h-8z" />
      {/* scarf */}
      <path fill="#ffbe55" d="M3 5h6v1h-6zM5 6h1v2h-1z" />
      {/* legs */}
      <path fill="#3b4a66" d="M3 11h2v3h-2zM7 11h2v3h-2z" />
      {/* eyes, belt, boots */}
      <path fill="#1a0f0a" d="M4 3h1v1h-1zM7 3h1v1h-1zM2 9h8v1h-8zM3 14h2v2h-2zM7 14h2v2h-2z" />
    </svg>
  )
}

/** The sprite in its inset portrait frame, as used in Status windows. */
export function Portrait({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-[150px] shrink-0 justify-center rounded-md border-2 border-border bg-muted pt-[18px]",
        className,
      )}
    >
      <Sprite className="h-32 w-24" />
    </div>
  )
}
