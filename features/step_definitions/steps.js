const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const users = require('../../test-data/user details.json');//adding json file
const { setDefaultTimeout } = require('@cucumber/cucumber');//this will help us to view the actions
setDefaultTimeout(30 * 1000); // 30 seconds
////this will help us to view the actions


Given('user logs in as {string}', async function (userType) {

    const user = users[userType];

    if (!user) {
      throw new Error(`User data not found: ${userType}`);
    }

    // 🔑 page comes from World
    this.poManager = new POManager(this.page);
    //Loose coupling
    // Easy maintenance

    const loginPage = this.poManager.getLoginPage();
    //abstraction + composition

    await loginPage.goTo();

    if (this.attach) {
      await this.attach(`Opened URL: ${process.env.BASE_URL}`, 'text/plain');

      
      await this.attach(
        `Attempting login with:\nUsername: ${user.email}\nPassword: ********`,
        'text/plain'
      );
    }

    await loginPage.validLogin(user.email, user.password);
  }
);

When('user adds {string} to the cart', async function (productName) {
  const dashboardPage = this.poManager.getDashboardPage();

try {
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    
    // ✅ Only attach if everything succeeded
    await this.attach(`✅ Navigated to product:\nproductName: ${productName}`);
  } catch (error) {
    // ❌ Attach error log
    await this.attach(`❌ Failed to navigate to product:\nproductName: ${productName}\nError: ${error.message}`);
    
    // Important: re-throw to fail the step
    throw error;
  }
}

);

//steps can be written in multiple step files because it is defined in cucumber.js file
 Then('user should see left panel options', async function () {
   try {
     const dashboardPage = this.poManager.getDashboardPage();
     await dashboardPage.verifyLeftPanelOptions();
   } catch (error) {
     if (this.attach) {
       // Attach as plain text
       await this.attach('❌ Left panel options are missing', 'text/plain');
    }
     throw error; // important to fail the test
   }
 });

Then('{string} should be displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();

try {
    await cartPage.VerifyProductIsDisplayed(productName);
    
    // ✅ Only attach if everything succeeded
    await this.attach(`✅ Navigated to product:\nproductName: ${productName}`);
  } catch (error) {
    // ❌ Attach error log
    await this.attach(`❌ Failed to navigate to product:\nproductName: ${productName}\nError: ${error.message}`);
    
    // Important: re-throw to fail the step
    throw error;
  }

//npx cucumber-js --dry-run --format progress ----this command is used to check the mapping of feature file and step definition file
//also for 1-2 steps do not create new step definition file 
});

//how to handle flakiness in playwright with cucumber

// 1️⃣ Stop Using Hard Waits (root cause #1)

// ❌ Avoid

// await page.waitForTimeout(5000);


// ✅ Use Playwright auto-wait

// await page.locator('#login').click();
// await page.locator('.toast-message').waitFor();


// Or better:

// await expect(page.locator('.toast-message')).toBeVisible();


// 👉 Playwright automatically waits for:

// element to be attached

// visible

// enabled

// stable

// 2️⃣ Always Use expect() Assertions (not manual checks)

// ❌ Flaky

// const text = await page.textContent('.success');
// if (!text.includes('Success')) throw new Error();


// ✅ Stable

// await expect(page.locator('.success')).toContainText('Success');


// Why?

// expect() retries until timeout

// Manual checks don’t retry

// 3️⃣ Locator Strategy = Stability
// ❌ Bad (dynamic / fragile)
// page.locator("//div[3]/button");
// page.locator('.btn-primary');

// ✅ Best (priority order)

// data-testid

// <button data-testid="login-btn">Login</button>

// page.getByTestId('login-btn')


// Role + name

// page.getByRole('button', { name: 'Login' })


// Label

// page.getByLabel('Email')

// 4️⃣ Handle Page Load & Navigation Correctly

// ❌ Flaky

// await page.click('#login');
// await page.waitForURL('/dashboard');


// ✅ Stable

// await Promise.all([
//   page.waitForURL('**/dashboard'),
//   page.click('#login')
// ]);

// 5️⃣ World + Hooks Setup (VERY important in Cucumber)
// Use Before and After properly
// Before(async function () {
//   await this.page.goto(process.env.BASE_URL);
// });

// After(async function (scenario) {
//   if (scenario.result.status === 'FAILED') {
//     await this.page.screenshot({ path: `screenshots/${scenario.pickle.name}.png` });
//   }
// });


// 👉 Avoid:

// creating multiple pages per scenario

// reusing page across scenarios

// 6️⃣ Retries (Controlled, not blind)
// Playwright retry (recommended)
// // playwright.config.js
// retries: process.env.CI ? 2 : 0

// Cucumber retry
// // cucumber.js
// module.exports = {
//   default: {
//     retry: 1
//   }
// };


// ⚠️ If you need retries >2 → real problem exists

// 7️⃣ Parallel Execution Issues

// Flaky in parallel? Check these:

// ❌ Shared state

// Same user

// Same test data

// Same order/cart

// ✅ Fix

// Create unique test data

// const email = `user_${Date.now()}@test.com`;


// Clean state in Before

// await this.context.clearCookies();

// 8️⃣ Network & API Stability (Hidden killer)

// Wait for backend response instead of UI guessing:

// await Promise.all([
//   page.waitForResponse(resp =>
//     resp.url().includes('/api/orders') && resp.status() === 200
//   ),
//   page.click('#submit')
// ]);

// 9️⃣ Disable Animations (Big win)

// Animations cause flakiness.

// await page.addStyleTag({
//   content: `* { transition: none !important; animation: none !important; }`
// });


// Put this in Before hook.

// 🔟 Timeouts – Set them explicitly
// page.setDefaultTimeout(30000);
// page.setDefaultNavigationTimeout(30000);



//“In our BDD Playwright framework, we didn’t use a traditional BaseClass. Instead, we used Cucumber World for dependency injection, Hooks for lifecycle management, and a POManager for page abstraction. This avoids inheritance complexity and follows composition over inheritance.”
