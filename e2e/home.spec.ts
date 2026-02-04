import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test("should display the dashboard content", async ({ page }) => {
    await page.goto("/");
    // Spanish: "Panel de Control", English: "Dashboard", Portuguese: "Painel de Controle"
    await expect(page.getByRole("heading", { name: /panel de control|dashboard|painel de controle/i })).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("/");
    // Wait for React to hydrate and set the title
    // Spanish: "Panel de Control | Diagnovet", English: "Dashboard | Diagnovet"
    await expect(page).toHaveTitle(/panel|dashboard|painel|diagnovet/i);
  });

  test("should display navigation header", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("DiagnoVet")).toBeVisible();
    // Spanish: "Panel", English: "Dashboard", Portuguese: "Painel"
    await expect(page.getByRole("link", { name: /^panel$|^dashboard$|^painel$/i })).toBeVisible();
    // Spanish: "Visor", English: "Viewer", Portuguese: "Visualizador"
    await expect(page.getByRole("link", { name: /visor|viewer|visualizador/i })).toBeVisible();
  });

  test("should navigate to viewer page", async ({ page }) => {
    await page.goto("/");
    // Spanish: "Visor", English: "Viewer", Portuguese: "Visualizador"
    await page.getByRole("link", { name: /visor|viewer|visualizador/i }).click();
    await expect(page).toHaveURL("/viewer");
    // Spanish: "Visor", English: "Viewer", Portuguese: "Visualizador"
    await expect(page).toHaveTitle(/visor|viewer|visualizador/i);
  });
});
