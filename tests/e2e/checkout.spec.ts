// Import custom test runner with fixtures pre-loaded
import { test, expect } from '../fixtures/page-fixtures';

test.describe('SauceDemo E2E Checkout Flow', () => {

  test('Complete purchase flow using authenticated state & fixtures', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    page,
  }) => {
    // 1. Session is pre-authenticated via storageState; navigate directly to inventory
    await inventoryPage.navigateTo('/inventory.html');

    // 2. Add items using inventory page fixture
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await inventoryPage.header.getCartBadgeCount()).toBe(2);

    // 3. Cart interactions
    await inventoryPage.navigateTo('/cart.html');
    await cartPage.proceedToCheckout();

    // 4. Fill customer information
    await checkoutStepOne.fillInformation('Jane', 'Doe', '90210');

    // 5. Assert pricing summary and complete checkout
    const prices = await checkoutStepTwo.getCalculatedPrices();
    expect(prices.total).toBe(parseFloat((prices.subtotal + prices.tax).toFixed(2)));

    await checkoutStepTwo.finishCheckout();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });

  test('Sort items alphabetically', async ({ inventoryPage }) => {
    await inventoryPage.navigateTo('/inventory.html');
    await inventoryPage.selectSortOption('za');
    
    // Additional assertions here...
  });

});