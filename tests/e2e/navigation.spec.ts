import { expect, test } from "@playwright/test";

test("global navigation opens and closes the menu overlay", async ({ page }) => {
  await page.goto("/");
  const menuToggle = page.locator("[data-menu-open]");
  const dialog = page.getByRole("dialog", { name: /site menu/i });

  await menuToggle.click();
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: /close menu/i })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menuToggle).toBeFocused();
});
