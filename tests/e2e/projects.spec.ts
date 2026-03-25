import { expect, test } from "@playwright/test";

test("projects index links to a project detail page", async ({ page }) => {
  await page.goto("/projects");
  const firstCard = page.getByRole("main").getByRole("link", { name: /observability|project/i }).first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
