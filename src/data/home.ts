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
    eyebrow: "DevOps Engineer",
    headline: "Reliable infrastructure and delivery systems for teams that need less drama.",
    copy:
      "I design platform foundations, CI/CD flows, and operational guardrails that help products ship steadily.",
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
    eyebrow: "About me",
    title: "I keep delivery infrastructure steady so engineers can focus on the product.",
    body: "Based in Brno — originally from Prešov, moved here for university and stayed. I have spent over four years as a DevOps Engineer managing Kubernetes clusters, CI/CD pipelines, GitOps deployments, and the observability layer that makes production trustworthy. Currently at Kajot maintaining game server infrastructure and Argo CD-based delivery. Outside of work I am training for my next marathon and following football closely.",
  },
  capabilitiesSection: {
    eyebrow: "Capabilities",
    title: "What I work on",
    body: "Core areas where I help teams make delivery and operations more dependable.",
  },
  capabilities: [
    {
      eyebrow: "Container orchestration",
      title: "Kubernetes clusters in production, containerized workloads, Docker-based environments.",
      detail:
        "From initial setup to day-two operations — maintaining clusters that stay reliable under real production load.",
    },
    {
      eyebrow: "CI/CD & GitOps",
      title: "Delivery pipelines, Argo CD deployments, and release workflows that reduce friction.",
      detail:
        "Built and maintained pipelines using Azure DevOps and Argo CD across multiple years and environments.",
    },
    {
      eyebrow: "Observability & ops",
      title: "Grafana, Zabbix, and monitoring setups that surface problems before they become outages.",
      detail:
        "Good signals make on-call manageable. I build dashboards and alerting that teams actually trust.",
    },
  ] satisfies Capability[],
  credibility: {
    eyebrow: "Credibility",
    title: "Experience and proof signals",
    body: "Real numbers from real environments.",
    signals: [
      {
        label: "DevOps experience",
        value: "4+ years",
        note: "DevOps engineering across gaming, fintech, and enterprise client environments since 2021.",
      },
      {
        label: "Certification",
        value: "AZ-204",
        note: "Microsoft Certified: Azure Developer Associate — hands-on Azure and Azure DevOps experience.",
      },
      {
        label: "Current stack",
        value: "Kubernetes + Argo CD",
        note: "Managing production K8s clusters and GitOps delivery at Kajot since September 2025.",
      },
    ] satisfies CredibilitySignal[],
  },
  projects: {
    eyebrow: "Selected work",
    title: "Selected work",
    body: "A growing collection of infrastructure and delivery work.",
    footerCta: {
      href: "/projects",
      label: "Browse all projects",
    },
  },
  contact: {
    eyebrow: "Next step",
    title: "Have infrastructure challenges or delivery bottlenecks?",
    body: "Whether you are scaling a platform, tightening release workflows, or need someone who has done it in production — get in touch.",
    cta: {
      href: "/contact",
      label: "Get in touch",
    },
  },
} as const;
