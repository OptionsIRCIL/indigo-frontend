import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  this.setIgnoreHTTPSErrors(true);

  await page.goto('https://localhost:443');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/IndigoFrontend/);
});
