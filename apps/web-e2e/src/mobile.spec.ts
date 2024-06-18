import { expect, test } from '@playwright/test';

test('mobile nav must present on mobile devices', async ({ page }) => {
  await page.goto('/');
  const mobileNav = page.locator('[data-tag="mobile-nav"]');
  await expect(mobileNav).toBeHidden();
});

test('mobile nav should not be present on desktop devices', async ({ page }) => {
  await page.goto('/');
  const mobileNav = page.locator('[data-tag="mobile-nav"]');
  await expect(mobileNav).toBeHidden();
});
