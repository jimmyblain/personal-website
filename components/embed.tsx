"use client"

import { useState } from "react"
import { Play } from "lucide-react"

type EmbedProps =
  | { provider: "youtube"; id: string; title: string }
  | { provider: "spotify" | "apple"; url: string; title: string }

export function Embed(props: EmbedProps) {
  if (props.provider === "youtube") {
    return <YouTubeFacade id={props.id} title={props.title} />
  }
  const height = props.provider === "spotify" ? 152 : 175
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        src={props.url}
        title={props.title}
        height={height}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="block w-full border-0"
      />
    </div>
  )
}

/** Click-to-load: no YouTube JS/iframe until the user asks for it. */
function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, no optimization needed */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-black/70 transition-colors duration-150 group-hover:bg-black/90">
              <Play className="ml-0.5 size-6 fill-white text-white" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
