import { expect, test } from "@playwright/test";

test("global navigation opens and closes the menu overlay", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /menu/i }).click();
  await expect(page.getByRole("dialog", { name: /site menu/i })).toBeVisible();
  await page.getByRole("button", { name: /close menu/i }).click();
  await expect(page.getByRole("dialog", { name: /site menu/i })).toBeHidden();
});
