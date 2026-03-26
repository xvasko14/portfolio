export const homeGreetings = [
  "Kubernetes",
  "Docker",
  "Argo CD",
  "Terraform",
  "Ansible",
  "Grafana",
  "Linux",
  "GitOps",
  "Bash",
] as const;

export const mainRouteTitles = {
  "/": "Vasko Michal",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
} as const;

export type RouteIntroMode = "none" | "home-greetings" | "home-title" | "page-title";

export const routeIntroConfig = {
  homeGreetings,
  mainRouteTitles,
} as const;
