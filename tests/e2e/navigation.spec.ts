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
