import type { ReactNode } from "react"
import { Menu } from "@/components/menu"

/**
 * Page frame: the menu (plus an optional extra window under it) beside the page's windows.
 * Every route renders inside one of these, so pages only decide which windows to show.
 *
 * `aside` is page-specific (a post's Objectives, the resume download). It sits under the menu on
 * desktop; pass something with `hidden md:block` if it should not push content down on a phone.
 */
export function Shell({ aside, children }: { aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-3 pb-16 pt-7 sm:px-5 md:flex-row md:items-start md:px-9 md:pt-10">
      {/* not sticky: a long Objectives list would be cut off on a short laptop screen */}
      <div className="flex flex-col gap-7 md:w-[260px] md:shrink-0">
        <Menu />
        {aside}
      </div>
      <main className="flex min-w-0 flex-1 flex-col gap-7">{children}</main>
    </div>
  )
}
