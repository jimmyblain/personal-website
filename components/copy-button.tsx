"use client"

import { useState } from "react"

export function CopyButton() {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      aria-label="Copy code to clipboard"
      onClick={async (e) => {
        const code = e.currentTarget.closest("figure")?.querySelector("pre")?.innerText ?? ""
        try {
          await navigator.clipboard.writeText(code)
        } catch {
          return
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="absolute right-3 top-1.5 z-10 flex min-h-9 cursor-pointer items-center px-1 font-pixel text-[16px] uppercase tracking-[0.05em] text-[#ffcf7f] transition-opacity hover:opacity-80"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
