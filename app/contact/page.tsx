import type { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Window } from "@/components/window"
import { rssAlternate, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about IT leadership, applied AI, and building systems that ship.",
  alternates: { canonical: "/contact", types: rssAlternate() },
}

const rows = [
  { label: "LinkedIn", value: "/in/glajummyb ↗", href: site.links.linkedin, external: true },
  { label: "GitHub", value: "/jblain ↗", href: site.links.github, external: true },
  { label: "Resume", value: "Download PDF ↓", href: site.resume, external: false },
]

export default function ContactPage() {
  return (
    <Shell>
      <Window title="Contact">
        <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
          Let&apos;s talk.
        </h1>
        <p className="mt-3 max-w-[52ch] text-muted-foreground">
          Open to conversations about IT leadership, applied AI, and building systems that ship.
          The fastest way to reach me is email.
        </p>

        {/* break-all: the address is one long word and must wrap inside a 375px window */}
        <a href={`mailto:${site.email}`} className="btn-cmd mt-5 max-w-full break-all py-2">
          {site.email}
        </a>

        <ul className="mt-7 max-w-[640px]">
          <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t-2 border-dashed border-border py-3.5">
            <span className="px-label">Location</span>
            <span className="text-muted-foreground">New York City metro area</span>
          </li>
          {rows.map((row) => (
            <li key={row.label} className="border-t-2 border-dashed border-border">
              <a
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                className="group flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3"
              >
                <span className="px-label">{row.label}</span>
                <span className="text-link transition-colors duration-150 group-hover:text-link-hover">
                  {row.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Window>
    </Shell>
  )
}
