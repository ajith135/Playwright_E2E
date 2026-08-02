import { Page, Locator } from '@playwright/test';

export class HeaderMenuComponent {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;
  readonly resetStateLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.resetStateLink = page.locator('#reset_sidebar_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetStateLink.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }
}