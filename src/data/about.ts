export const about = {
  hero: {
    eyebrow: "About",
    title: "I build delivery infrastructure that teams can trust on their worst day.",
    body: "Over four years as a DevOps Engineer, most of it in complex multi-client and production environments. I work on Kubernetes, Terraform, Argo CD, and the observability layer that keeps production honest.",
  },
  howIWork: {
    eyebrow: "Approach",
    title: "How I work",
    points: [
      "Keep the critical path small so problems are easier to see and easier to fix.",
      "Automate the repetitive steps first, then document the decisions that matter.",
      "Prefer boring, inspectable systems over clever setups that only one person understands.",
    ],
  },
  principles: {
    eyebrow: "Values",
    title: "Guiding values",
    items: [
      "Clarity over ceremony.",
      "Practical automation over theoretical completeness.",
      "Operational calm over unnecessary complexity.",
      "Readable handoffs over hidden tribal knowledge.",
    ],
  },
  stack: {
    eyebrow: "Core stack",
    title: "Core stack",
    items: [
      "Kubernetes",
      "Argo CD",
      "Terraform",
      "Ansible",
      "Docker",
      "Linux",
      "Grafana",
      "Zabbix",
      "Azure DevOps",
      "Python",
      "Bash",
      "C#",
    ],
  },
} as const;
