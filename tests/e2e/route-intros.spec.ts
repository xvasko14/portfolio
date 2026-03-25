import { expect, test } from "@playwright/test";

const mainRoutes = [
  { path: "/", mode: "home-greetings", heading: "Home" },
  { path: "/about", mode: "page-title", heading: "About" },
  { path: "/projects", mode: "page-title", heading: "Projects" },
  { path: "/contact", mode: "page-title", heading: "Contact" },
] as const;

test("main routes expose the shared route intro contract", async ({ page }) => {
  for (const route of mainRoutes) {
    await page.goto(route.path);

    await expect(page.locator("#route-intro-config")).toHaveCount(1);
    const root = page.locator("[data-route-intro-root]");
    await expect(root).toHaveCount(1);
    await expect(root).toBeHidden();
    await expect(root).toHaveAttribute("data-route-intro-mode", route.mode);
    await expect(root.locator("[data-route-intro-heading]")).toHaveText(route.heading);
  }

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-route-intro-ready", "true");
  await expect(page.locator("[data-route-intro-root]")).toHaveAttribute(
    "data-route-intro-mode",
    "home-greetings",
  );
});
