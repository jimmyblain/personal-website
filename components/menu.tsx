"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * The site's navigation, drawn as the game menu. On desktop it is a vertical list with a blinking
 * cursor on the current page; on a phone it collapses to one row so the page title stays on the
 * first screen.
 */
export function Menu() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <nav aria-label="Main" className="win p-4 md:p-6">
      <span className="win-title px-label">Menu</span>
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex min-h-11 items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-[30px] place-items-center rounded bg-primary font-pixel text-xl text-primary-foreground"
          >
            jb
          </span>
          <span className="px-label">{site.name}</span>
        </Link>
        <ThemeToggle />
      </div>

      <ul className="mt-2 flex gap-1 md:mt-3 md:flex-col md:gap-0.5">
        {site.nav.map(({ href, label }) => {
          const active = isActive(href)
          return (
            <li key={href} className="flex-1 md:flex-none">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-11 items-center justify-center rounded px-1 font-pixel text-[20px] transition-colors duration-150 md:justify-start md:pl-8 md:pr-2.5 md:text-[25px]",
                  active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && <span aria-hidden className="menu-cursor hidden md:block" />}
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
