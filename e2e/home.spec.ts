import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display home page", async ({ page }) => {
    await page.goto("/");
    
    await expect(page.locator("h1, h2")).toContainText(/Portail THP|THP Portal/);
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    
    // Vérifier la présence de liens de navigation
    const directoryLink = page.getByRole("link", { name: /Annuaire|Directory/ });
    await expect(directoryLink).toBeVisible();
  });

  test("should navigate to directory", async ({ page }) => {
    await page.goto("/");
    
    const directoryLink = page.getByRole("link", { name: /Annuaire|Directory/ });
    await directoryLink.click();
    
    await expect(page).toHaveURL(/\/directory/);
  });
});
