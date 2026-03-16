
// const { RoleBasedLogin } = require('./RoleBasedLogin');
// const { DashboardPage } = require('./DashboardPage');
// const { CartPage } = require('./CartPage');

// class POManager {
//   constructor(page) {
//     this.page = page;
//   }

//   getRoleBasedLogin() {
//     if (!this.loginPage) 
//       this.loginPage = new RoleBasedLogin(this.page);
//     return this.loginPage;
//   }

//   getDashboardPage() {
//     if (!this.dashboardPage) this.dashboardPage = new DashboardPage(this.page);
//     return this.dashboardPage;
//   }

//   getCartPage() {
//     if (!this.cartPage) this.cartPage = new CartPage(this.page);
//     return this.cartPage;
//   }
// }

// module.exports = { POManager };
const { RoleBasedLogin } = require('./RoleBasedLogin');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');

class POManager {

  constructor(page) {
    this.page = page;
  }

  getRoleBasedLogin() {
    if (!this.loginPage)
      this.loginPage = new RoleBasedLogin(this.page);

    return this.loginPage;
  }

  getDashboardPage() {
    if (!this.dashboardPage)
      this.dashboardPage = new DashboardPage(this.page);

    return this.dashboardPage;
  }

  getCartPage() {
    if (!this.cartPage)
      this.cartPage = new CartPage(this.page);

    return this.cartPage;
  }
}

module.exports = { POManager };