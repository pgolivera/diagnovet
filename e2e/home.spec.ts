import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test("should display the dashboard content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test("should display navigation header", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("DiagnoVet")).toBeVisible();
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Viewer" })).toBeVisible();
  });

  test("should navigate to viewer page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Viewer" }).click();
    await expect(page).toHaveURL("/viewer");
    await expect(page).toHaveTitle(/Viewer/);
  });
});
