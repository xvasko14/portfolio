import { expect, test } from "@playwright/test";

test("global navigation uses the two-state desktop header and fullscreen overlay", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const header = page.locator(".site-header");
  const topNav = page.locator("[data-header-top-nav]");
  const menuTrigger = page.locator("[data-header-menu-trigger]");
  const dialog = page.getByRole("dialog", { name: /site menu/i });
  const closeButton = page.getByRole("button", { name: /close menu/i });
  const homeLink = dialog.getByRole("link", { name: /home/i });

  await expect(header).toHaveAttribute("data-header-state", "top");
  await expect(topNav).toBeVisible();
  await expect(menuTrigger).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
  await expect(header).toHaveAttribute("data-header-state", "scrolled");
  await expect(topNav).toBeHidden();
  await expect(menuTrigger).toBeVisible();

  await menuTrigger.evaluate((button) => {
    button.click();
  });
  await expect(dialog).toBeVisible();
  await closeButton.focus();
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(homeLink).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-menu")).toHaveAttribute("hidden", "");
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
