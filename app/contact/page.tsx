import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
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
    <div className="mx-auto max-w-[640px] px-5 pb-24 pt-20">
      <p className="mono-label text-muted-foreground">Contact</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        Let's talk.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg leading-[1.75] text-muted-foreground">
        Open to conversations about IT leadership, applied AI, and building systems that ship. The
        fastest way to reach me is email.
      </p>

      <Button
        size="lg"
        className="mt-9 rounded-lg px-[22px] max-sm:w-full"
        render={<a href={`mailto:${site.email}`} />}
        nativeButton={false}
      >
        {site.email} →
      </Button>

      <ul className="mt-16">
        {rows.map((row) => (
          <li key={row.label} className="border-t border-border-subtle">
            <a
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
              className="group flex items-center justify-between py-5"
            >
              <span className="font-medium">{row.label}</span>
              <span className="font-mono text-sm text-link transition-colors duration-150 group-hover:text-link-hover">
                {row.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
