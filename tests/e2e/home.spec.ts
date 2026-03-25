import { expect, test } from "@playwright/test";

test("homepage renders the brand-first sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /DevOps|reliable|infrastructure/i,
  );
  await expect(page.getByRole("heading", { name: /what i work on/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /selected work/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /browse project direction/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /let's talk|get in touch/i })).toBeVisible();
});
