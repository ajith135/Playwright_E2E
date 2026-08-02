import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderMenuComponent } from './HeaderMenuComponent';

export class InventoryPage extends BasePage {
  readonly header: HeaderMenuComponent;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderMenuComponent(page);
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async selectSortOption(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  async addItemToCartByName(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async removeItemByName(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button:has-text("Remove")').click();
  }

  async openItemDetailsByName(itemName: string) {
    await this.page.locator('.inventory_item_name', { hasText: itemName }).click();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceElements = await this.page.locator('.inventory_item_price').allTextContents();
    return priceElements.map((price) => parseFloat(price.replace('$', '')));
  }
}