import { SITE_URL } from "./site-config.js";

const contact = {
  email: { href: "mailto:vaskomichal7@gmail.com", label: "Email" },
  socials: [
    { href: "https://linkedin.com/in/michal-vasko-06b84b158/?skipRedirect=true", label: "LinkedIn" },
    { href: "https://www.instagram.com/majklvasko/", label: "Instagram" },
    { href: "https://www.facebook.com/michal.m.vasko/", label: "Facebook" },
  ],
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
  socials: contact.socials,
};
