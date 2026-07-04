"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-5 py-4 md:px-11 md:py-[22px]" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5">
          {/* the one and only use of the tan warm accent */}
          <span className="flex size-6 items-center justify-center rounded-[7px] bg-warm-accent font-mono text-xs font-medium text-warm-accent-foreground md:size-[26px]">
            JB
          </span>
          <span className="font-mono text-sm font-medium lowercase text-foreground">{site.name}</span>
        </Link>

        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-6 md:flex">
            {site.nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors duration-150",
                    isActive(href) ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <ul className="mt-10 flex flex-col gap-1 px-4">
                {site.nav.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose
                      render={
                        <Link
                          href={href}
                          className={cn(
                            "block rounded-md px-3 py-2.5 text-base",
                            isActive(href) ? "font-medium text-foreground" : "text-muted-foreground",
                          )}
                        />
                      }
                    >
                      {label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
