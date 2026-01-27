class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");

    this.cart = page.locator("[routerlink='/dashboard/cart']");
    this.orders = page.locator("[routerlink='/dashboard/myorders']");
  }

  async searchProductAddCart(productName) {
    await this.productsText.first().waitFor();

    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const title = await this.products.nth(i).locator("b").textContent();
      if (title.trim() === productName) {
        await this.products.nth(i).locator("text=Add To Cart").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.waitFor({ state: 'visible' });
    await this.cart.click();
  }

  async navigateToOrders() {
    await this.orders.scrollIntoViewIfNeeded();
    await this.orders.waitFor({ state: 'visible', timeout: 10000 });
    await this.orders.click();
  }
}

module.exports = { DashboardPage };
