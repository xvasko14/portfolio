import { expect, test } from "@playwright/test";

test("homepage exposes the site shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Vasko/i);
  await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
});
