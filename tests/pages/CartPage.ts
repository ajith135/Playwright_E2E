import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderMenuComponent } from './HeaderMenuComponent';

export class CartPage extends BasePage {
  readonly header: HeaderMenuComponent;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderMenuComponent(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartItems = page.locator('.cart_item');
  }

  async removeItem(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator('button:has-text("Remove")').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}