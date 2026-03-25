import { expect, test } from "@playwright/test";

test("homepage exposes the site shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Vasko/i);
  await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
});

test("about and contact pages expose key content", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText(/principles|how i work/i)).toBeVisible();

  await page.goto("/contact");
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
  // New: photo
  await expect(main.locator('img[src="/vasko.jpeg"]')).toBeVisible();
  // New: Formspree form with the four inputs
  await expect(main.locator('form[action*="formspree.io"]')).toBeVisible();
  await expect(main.locator('input[name="name"]')).toBeVisible();
  await expect(main.locator('input[name="email"]')).toBeVisible();
  await expect(main.locator('input[name="company"]')).toBeVisible();
  await expect(main.locator('select[name="services"]')).toBeVisible();
  // Existing: contact links still present
  await expect(main.getByRole("link", { name: "Email" })).toHaveAttribute("href", /^mailto:/);
  await expect(main.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Instagram" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Facebook" })).toBeVisible();
});
