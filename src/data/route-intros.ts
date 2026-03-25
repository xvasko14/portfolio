export const homeGreetings = [
  "Hello",
  "Ahoj",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Hej",
] as const;

export const mainRouteTitles = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
} as const;

export type RouteIntroMode = "none" | "home-greetings" | "home-title" | "page-title";

export const routeIntroConfig = {
  homeGreetings,
  mainRouteTitles,
} as const;
