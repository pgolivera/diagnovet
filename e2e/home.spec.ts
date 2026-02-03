import { test, expect } from "@playwright/test";

test.describe("Home Page (Development Mode)", () => {
  test("should display the development content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Diagnovet");
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Home/);
  });

  test("should show development mode hint", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/only visible in development mode/)).toBeVisible();
  });
});
