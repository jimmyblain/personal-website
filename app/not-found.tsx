import Link from "next/link"
import { Shell } from "@/components/shell"
import { Window } from "@/components/window"

export default function NotFound() {
  return (
    <Shell>
      <Window title="Error · 404">
        <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">There is nothing at this address.</p>
        <Link href="/" className="btn-cmd mt-5">
          Back to home
        </Link>
      </Window>
    </Shell>
  )
}
