import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("should have skip link", async ({ page }) => {
    await page.goto("/directory");
    
    const skipLink = page.locator(".skip-link, a[href='#main-content']");
    await expect(skipLink).toBeVisible();
  });

  test("should have proper ARIA labels", async ({ page }) => {
    await page.goto("/directory");
    
    const main = page.locator("main[role='main']");
    await expect(main).toBeVisible();
    
    const searchInput = page.getByPlaceholder(/Rechercher|Search/);
    if (await searchInput.count() > 0) {
      const ariaLabel = await searchInput.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
    }
  });

  test("should have semantic HTML", async ({ page }) => {
    await page.goto("/directory");
    
    // Vérifier la présence d'éléments sémantiques
    const header = page.locator("header[role='banner']");
    const main = page.locator("main[role='main']");
    
    await expect(header.or(main)).toBeVisible();
  });
});
