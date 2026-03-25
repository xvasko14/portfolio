import { expect, test } from "@playwright/test";

test("about page exposes the shared route intro shell", async ({ page }) => {
  await page.goto("/about");

  await expect(page.locator("#route-intro-config")).toHaveCount(1);
  const root = page.locator("[data-route-intro-root]");
  await expect(root).toHaveCount(1);
  await expect(root).toBeHidden();
  await expect(root).toHaveAttribute("data-route-intro-mode", "page-title");
  await expect(root.locator("[data-route-intro-heading]")).toHaveText("About");
});

test("home page uses the greeting route intro mode", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("[data-route-intro-root]");
  await expect(root).toHaveCount(1);
  await expect(root).toHaveAttribute("data-route-intro-mode", "home-greetings");
});
