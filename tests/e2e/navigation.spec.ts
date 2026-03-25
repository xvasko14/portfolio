import { expect, test } from "@playwright/test";

test("global navigation uses desktop nav and mobile menu overlay correctly", async ({ page }) => {
  await page.goto("/");
  const menuToggle = page.locator("[data-menu-open]");
  const primaryNav = page.locator(".site-nav");
  const dialog = page.getByRole("dialog", { name: /site menu/i });
  const closeButton = page.getByRole("button", { name: /close menu/i });
  const homeLink = dialog.getByRole("link", { name: /home/i });

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(primaryNav).toBeVisible();
  await expect(menuToggle).toBeHidden();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(primaryNav).toBeHidden();
  await expect(menuToggle).toBeVisible();
  await menuToggle.click();
  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(homeLink).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menuToggle).toBeFocused();
});

test("mobile navigation falls back to the primary nav when javascript is unavailable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();

  await page.goto("/");
  await expect(page.locator(".site-nav")).toBeVisible();
  await expect(page.locator("[data-menu-open]")).toBeHidden();
  await expect(page.getByRole("link", { name: /about/i })).toBeVisible();

  await context.close();
});

test("unknown routes render the branded 404 page", async ({ page }) => {
  await page.goto("/missing-route");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/not found|404/i);
  await expect(page.getByRole("link", { name: /back home/i })).toBeVisible();
});

test("reduced motion disables homepage reveal and card transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("[data-reveal]").first()).toHaveCSS("transition-duration", "0s");
  await expect(page.locator(".capability-card").first()).toHaveCSS("transition-duration", "0s");
  await expect(page.locator(".credibility-item").first()).toHaveCSS("transition-duration", "0s");
  await expect(page.locator(".project-preview-card").first()).toHaveCSS("transition-duration", "0s");
});
