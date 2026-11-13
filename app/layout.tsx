import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, Jersey_25 } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Footer } from "@/components/footer"
import { site } from "@/lib/site"
import "./globals.css"

// Pixel face for headings and labels; Plex for body and code.
// Jersey 25 rather than Pixelify Sans: Pixelify's "5" reads as an "8" ("750,000" looked like
// "780,000"), and its capital C and G read as O and B at label size.
const pixel = Jersey_25({
  variable: "--font-pixel-face",
  subsets: ["latin"],
  weight: "400",
})

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Jimmy Blain" },
  description: site.description,
  alternates: {
    canonical: "./",
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  openGraph: {
    type: "website",
    siteName: site.title,
    url: site.url,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pixel.variable} ${plexSans.variable} ${plexMono.variable} flex min-h-screen flex-col font-sans text-[17px] leading-[1.65] antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Each page renders its own <Shell> (menu + windows); flex-1 keeps the footer at the
              viewport bottom on short pages */}
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
