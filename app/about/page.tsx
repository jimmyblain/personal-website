import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { rssAlternate, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "IT director and systems architect — strategy, budget, and vendor portfolio at The Rockefeller Foundation, still building the systems directly.",
  alternates: { canonical: "/about", types: rssAlternate() },
}

const experience = [
  {
    period: "2024 — Now",
    role: "Director, IT Operations & Services Management",
    company: "The Rockefeller Foundation",
    description:
      "Own strategy, $6.4M budget (11% YoY savings), and DR. Architected and coded a chief-of-staff AI agent for the executive team in two weeks.",
  },
  {
    period: "2020 — 2024",
    role: "IT Services Manager",
    company: "The Rockefeller Foundation",
    description:
      "Led a global support team resolving 1,000+ monthly incidents at 85% first-time resolution; cut cloud spend 21% via right-sizing and automation.",
  },
  {
    period: "2016 — 2020",
    role: "Systems Engineer",
    company: "Ventucom",
    description:
      "Administered M365 and Google Workspace across dozens of MSP clients; built repeatable SSO/RBAC access models and hardened email with DKIM/DMARC.",
  },
]

const skills = [
  "Azure · AZ-104",
  "Okta · Entra ID",
  "Python",
  "Claude Agent SDK · MCP",
  "Intune",
  "NetSuite · Salesforce",
  "CISSP",
  "ITIL 4",
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 pb-24 pt-16">
      <p className="mono-label text-muted-foreground">About</p>
      <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
        The hands-on director
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-[1.75] text-muted-foreground">
        <p>
          I'm an IT director and systems architect with about a decade across global enterprise
          IT, multi-client MSP environments, and applied AI. At The Rockefeller Foundation I own
          IT strategy, a $6.4M budget, and a 40–50 vendor portfolio for a ~300-person organization
          spread across four continents.
        </p>
        <p>
          What makes the role unusual is that I still build. I write the Python automation, stand
          up custom MCP servers and AI agents on the Claude Agent SDK, and engineer identity
          across Okta and Microsoft Entra — SSO and SCIM for roughly 40 applications. I'd rather
          architect and automate than only direct.
        </p>
      </div>

      <section className="mt-20" aria-labelledby="experience">
        <div className="flex items-center justify-between">
          <h2 id="experience" className="text-[26px] font-semibold tracking-[-0.015em]">
            Experience
          </h2>
          <Button className="rounded-lg" render={<a href={site.resume} download />} nativeButton={false}>
            Download PDF ↓
          </Button>
        </div>
        <div className="mt-6">
          {experience.map((job) => (
            <div
              key={job.role}
              className="grid gap-2 border-t border-border-subtle py-7 md:grid-cols-[150px_1fr] md:gap-6"
            >
              <p className="mono-label pt-1 font-normal text-muted-foreground">{job.period}</p>
              <div>
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] md:text-lg">{job.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                <p className="mt-3 max-w-[60ch] text-muted-foreground">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="skills">
        <h2 id="skills" className="text-[26px] font-semibold tracking-[-0.015em]">
          Skills
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
