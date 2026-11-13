import type { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Portrait } from "@/components/sprite"
import { Window } from "@/components/window"
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
      "Now I set the technology strategy and own the budget, including for our public charity RF Catalytic Capital, and I've brought spend down year over year by retiring underused services and renegotiating bloated contracts. I stood up our AI governance from scratch: a monthly council with the COO and Chief People Officer, and 20 departmental AI Ambassadors who build fluency on their teams and bring use cases back to it. And I do the building myself. I've built tools and agentic workflows on top of the systems we run, so our team can talk to our infrastructure in plain English, and wrote the Azure service that checks about 750,000 Claude prompts a month against our AI usage policy (then re-architected it from $322 a month to $13). When we moved off Box, I ran the migration to SharePoint in-house with AI-built tooling and skipped roughly $207k in consultant fees.",
  },
  {
    period: "2020 — 2024",
    role: "IT Services Manager",
    company: "The Rockefeller Foundation",
    description:
      "Moving into management, I led and trained a global support team resolving 1,000+ incidents a month at 85% first-time resolution. The bigger work was fixing the system around that team: one Salesforce case platform in place of scattered ticket queues (it surfaced 20% more incidents that had been going unreported), automated SSO and SCIM for about 40 apps on Okta and Entra ID, and a 21% cut in yearly Azure and AWS spend. I also worked with peer departments to set a procurement policy that reined in shadow IT without leaving staff short on the tools they needed.",
  },
  {
    period: "2016 — 2020",
    role: "Systems Support Engineer",
    company: "Ventucom",
    description:
      "At an MSP, I managed 1,000+ Windows and macOS devices across client fleets with Intune and JAMF, and closed email-spoofing gaps with DKIM and DMARC. Doing the same tenant tasks by hand for every client got old fast, so I wrote PowerShell tooling that turned onboarding a new client into a CSV instead of a click-through. That habit of building my way out of repetitive work started here.",
  },
  {
    period: "2015 — 2016",
    role: "Technology Specialist",
    company: "Medgar Evers College, CUNY",
    description:
      "My first IT job, while I was finishing my degree at Brooklyn College. Every technical problem in the college's career office came to me, and it was on me to keep the office and its staff running through the academic year.",
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
    <Shell
      aside={
        // desktop only: on a phone this would push the page title down, so the same button is
        // repeated inside the Status window below
        <Window title="Resume" className="hidden p-6 md:block">
          <a href={site.resume} download className="btn-cmd">
            Download PDF ↓
          </a>
        </Window>
      }
    >
      <Window title="Status">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7 md:flex-col lg:flex-row">
          <Portrait />
          <div className="min-w-0">
            <h1 className="font-pixel text-[2.6rem] leading-none md:text-[3rem] lg:text-[3.75rem]">
              The hands-on director
            </h1>
            <div className="mt-4 max-w-[64ch] space-y-4 text-muted-foreground">
              <p>
                I&apos;m an IT director and systems architect with about ten years across global
                enterprise IT, multi-client MSP environments, and applied AI. I run the parts most
                people split between two roles: strategy, budget, and vendors at the top, and the
                systems build underneath.
              </p>
              <p>
                The build isn&apos;t just a hand-off step for me. I architect the identity, cloud,
                and automation systems the organization runs on, and I stay in the work myself
                instead of passing it to a vendor or a slide deck. Most leaders at this level
                stopped years ago. Being close to how the systems actually behave is what keeps my
                calls on strategy, budget, and risk grounded, and honestly it&apos;s the part I
                enjoy most.
              </p>
            </div>
            <a href={site.resume} download className="btn-cmd mt-5 md:hidden">
              Download PDF ↓
            </a>
          </div>
        </div>
      </Window>

      <Window title="Quest log · experience" aria-labelledby="experience">
        <h2 id="experience" className="sr-only">
          Experience
        </h2>
        {experience.map((job, i) => (
          <div
            key={job.role}
            className="border-t-2 border-dashed border-border py-5 first-of-type:border-t-0 first-of-type:pt-1 last:pb-0"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold leading-snug">{job.role}</h3>
              <p className={`px-label ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                {i === 0 ? "Active" : "Complete"} · {job.period}
              </p>
            </div>
            <p className="px-label mt-1 text-muted-foreground">{job.company}</p>
            <p className="mt-2 max-w-[70ch] text-muted-foreground">{job.description}</p>
          </div>
        ))}
      </Window>

      <Window title="Abilities · skills" aria-labelledby="skills">
        <h2 id="skills" className="sr-only">
          Skills
        </h2>
        <ul className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 shrink-0 bg-primary" />
              {skill}
            </li>
          ))}
        </ul>
      </Window>
    </Shell>
  )
}
