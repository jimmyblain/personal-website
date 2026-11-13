import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

type WindowProps<T extends ElementType> = {
  /** Shown in the tab on the window's top edge. */
  title?: ReactNode
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, "title">

/** A menu window: the one container every page is built from. Styles live in `.win`. */
export function Window<T extends ElementType = "section">({
  title,
  as,
  className,
  children,
  ...props
}: WindowProps<T>) {
  const Tag: ElementType = as ?? "section"
  return (
    <Tag className={cn("win", className)} {...props}>
      {title && <span className="win-title px-label">{title}</span>}
      {children}
    </Tag>
  )
}
