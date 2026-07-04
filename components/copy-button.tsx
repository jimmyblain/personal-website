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
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="absolute right-4 top-2.5 z-10 font-mono text-xs text-[#86BBD4] transition-opacity hover:opacity-80"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
