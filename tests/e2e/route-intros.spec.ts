import { expect, test } from "@playwright/test";

test("about page exposes the shared route intro shell", async ({ page }) => {
  await page.goto("/about");

  const root = page.locator("[data-route-intro-root]");
  await expect(root).toBeHidden();
  await expect(root).toHaveAttribute("data-route-intro-mode", "page-title");
  await expect(root.locator("[data-route-intro-heading]")).toHaveText("About");
});
