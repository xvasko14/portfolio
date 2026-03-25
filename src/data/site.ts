import { SITE_URL } from "./site-config.js";

const contact = {
  status: "provisional",
  note: "Contact channels remain provisional until the real accounts are connected.",
  github: { href: "https://github.com/your-handle", label: "GitHub" },
  linkedin: { href: "https://linkedin.com/in/your-handle", label: "LinkedIn" },
  email: { href: "mailto:hello@example.com", label: "Email" },
} as const;

export const site = {
  title: "Vasko Michal",
  role: "DevOps Developer",
  description:
    "DevOps developer building reliable infrastructure, delivery pipelines, and calmer engineering systems.",
  url: SITE_URL,
  assets: {
    favicon: "/favicon.svg",
    ogImage: "/og-default.svg",
  },
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ],
  contact,
  socials: [contact.github, contact.linkedin],
};
