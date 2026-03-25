export const about = {
  hero: {
    eyebrow: "About",
    title: "I build reliable delivery systems that stay legible under pressure.",
    body:
      "I focus on the parts of engineering work that affect trust: infrastructure, release flow, observability, and the handoffs that keep teams moving without drama.",
  },
  howIWork: {
    eyebrow: "Approach",
    title: "How I work",
    points: [
      "Keep the critical path small so problems are easier to see and easier to fix.",
      "Automate the repetitive steps first, then document the decisions that matter later.",
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
    items: ["Terraform", "Docker", "GitHub Actions", "Kubernetes", "Linux", "Python", "TypeScript"],
  },
} as const;
