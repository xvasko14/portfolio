export interface Capability {
  eyebrow: string;
  title: string;
  detail: string;
}

export interface CredibilitySignal {
  label: string;
  value: string;
  note: string;
}

export const home = {
  hero: {
    eyebrow: "DevOps Developer",
    headline: "Reliable infrastructure and delivery systems for teams that need less drama.",
    copy:
      "I design platform foundations, CI/CD flows, and operational guardrails that help products ship steadily. This homepage uses honest placeholder content that is easy to replace with real projects and metrics.",
    primaryCta: {
      href: "/about",
      label: "How I work",
    },
    secondaryCta: {
      href: "/projects",
      label: "See selected work",
    },
    panel: {
      label: "ops://signal",
      status: "stable path",
      highlights: [
        "Infrastructure as code with clear handoff paths",
        "Delivery pipelines built for repeatability, not ceremony",
        "Observability and release practices shaped around calm operations",
      ],
    },
  },
  intro: {
    eyebrow: "Positioning",
    title: "I work at the point where product ambition meets operational reality.",
    body: "The focus is not on adding more moving parts. It is on making the critical path more dependable, the deployment story more predictable, and the day-to-day engineering experience easier to trust.",
  },
  capabilitiesSection: {
    eyebrow: "Capabilities",
    title: "What I work on",
    body: "Core areas where I help teams make delivery and operations more dependable.",
  },
  capabilities: [
    {
      eyebrow: "Platform foundations",
      title: "Terraform-driven environments, deployment baselines, and service scaffolding.",
      detail: "I aim for setups that are understandable by the next engineer, not just automatable by the first one.",
    },
    {
      eyebrow: "Delivery systems",
      title: "CI/CD pipelines, release workflows, and quality gates that fit the team.",
      detail: "The goal is faster iteration with fewer surprises, especially during handoffs and production changes.",
    },
    {
      eyebrow: "Operational clarity",
      title: "Logging, monitoring, and incident-ready feedback loops that reduce guesswork.",
      detail: "Good operations should make important signals obvious before a release or outage becomes expensive.",
    },
  ] satisfies Capability[],
  credibility: {
    eyebrow: "Credibility",
    title: "Tech focus and proof signals",
    body: "Still early in the portfolio build-out, so the proof points stay modest and specific instead of inflated.",
    signals: [
      {
        label: "Primary focus",
        value: "DevOps + delivery reliability",
        note: "Pipelines, environments, and operating practices that support steady releases.",
      },
      {
        label: "Working style",
        value: "Practical automation",
        note: "Automate the painful path first, then document the trade-offs clearly.",
      },
      {
        label: "Current status",
        value: "Portfolio in progress",
        note: "Project details here are editable placeholders until final case studies are published.",
      },
    ] satisfies CredibilitySignal[],
  },
  projects: {
    eyebrow: "Selected work",
    title: "Selected work",
    body: "The projects section now points to a real content collection. It starts with one honest starter entry and leaves room for stronger case studies later.",
    footerCta: {
      href: "/projects",
      label: "Browse project direction",
    },
  },
  contact: {
    eyebrow: "Next step",
    title: "Need steadier infrastructure or cleaner delivery?",
    body: "If you are shaping a platform, improving releases, or reducing avoidable operational friction, get in touch.",
    cta: {
      href: "/contact",
      label: "Get in touch",
    },
  },
} as const;
