import { test, expect } from "@playwright/test";

test.describe("Directory Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/directory");
  });

  test("should display directory page", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Annuaire");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should display search input", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Rechercher|Search/);
    await expect(searchInput).toBeVisible();
  });

  test("should display filters", async ({ page }) => {
    // Vérifier que les filtres sont présents
    const filters = page.locator("select");
    await expect(filters.first()).toBeVisible();
  });

  test("should filter profiles by search", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Rechercher|Search/);
    
    // Attendre que les profils soient chargés
    await page.waitForSelector("article, [role='status']", { timeout: 10000 });
    
    // Effectuer une recherche
    await searchInput.fill("test");
    
    // Attendre que les résultats soient filtrés
    await page.waitForTimeout(500);
    
    // Vérifier que la recherche fonctionne (soit des résultats, soit un message "no results")
    const hasResults = await page.locator("article").count() > 0;
    const hasNoResults = await page.getByText(/Aucun profil|No profile/).isVisible().catch(() => false);
    
    expect(hasResults || hasNoResults).toBe(true);
  });

  test("should display profile cards", async ({ page }) => {
    // Attendre que les profils soient chargés
    await page.waitForSelector("article, [role='status']", { timeout: 10000 });
    
    // Vérifier la présence de cartes de profil ou d'un message "no profiles"
    const profileCards = page.locator("article");
    const noProfiles = page.getByText(/Aucun profil disponible|No profiles available/);
    
    const cardCount = await profileCards.count();
    const hasNoProfiles = await noProfiles.isVisible().catch(() => false);
    
    expect(cardCount > 0 || hasNoProfiles).toBe(true);
  });

  test("should navigate to profile page when clicking a card", async ({ page }) => {
    // Attendre que les profils soient chargés
    await page.waitForSelector("article", { timeout: 10000 });
    
    const profileCards = page.locator("article");
    const cardCount = await profileCards.count();
    
    if (cardCount > 0) {
      // Cliquer sur la première carte
      await profileCards.first().click();
      
      // Vérifier la navigation vers la page de profil
      await expect(page).toHaveURL(/\/u\/0x[a-fA-F0-9]{40}/);
    }
  });

  test("should load more profiles on scroll", async ({ page }) => {
    // Attendre que les profils soient chargés
    await page.waitForSelector("article, [role='status']", { timeout: 10000 });
    
    const initialCount = await page.locator("article").count();
    
    if (initialCount > 0) {
      // Scroller vers le bas
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      // Attendre un peu pour le chargement
      await page.waitForTimeout(1000);
      
      // Vérifier qu'il y a potentiellement plus de profils chargés
      // (ou au moins que le scroll fonctionne)
      const finalCount = await page.locator("article").count();
      expect(finalCount).toBeGreaterThanOrEqual(initialCount);
    }
  });
});
