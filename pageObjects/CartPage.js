const {test, expect} = require('@playwright/test');
class CartPage
{
    
constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body a");
 this.cart = page.locator("[routerlink='/dashboard/cart']");
this.orders = page.locator("[routerlink='/dashboard/myorders']");
this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName) {
    // wait until cart is visible
    await this.page.locator(".cartSection").first().waitFor({ state: 'visible', timeout: 10000 });

    const cartItems = this.page.locator(".cartSection h3");
    const count = await cartItems.count();
    let found = false;

    for (let i = 0; i < count; i++) {
        const title = (await cartItems.nth(i).textContent()).trim();
        if (title.toLowerCase() === productName.toLowerCase()) {
            found = true;
            break;
        }
    }
     expect(found).toBeTruthy();
}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};