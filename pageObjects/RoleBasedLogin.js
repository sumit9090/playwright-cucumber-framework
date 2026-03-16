
// const users = require('../test-data/role_based_user_details.json');

// class RoleBasedLogin {
//   constructor(page) {
//     this.page = page;
//      this.url = process.env.BASE_URL;
//     this.userEmail = page.locator('#userEmail');
//     this.userPassword = page.locator('#userPassword');
//     this.loginButton = page.locator('#login');
//   }

//   async goTo() {
//     await this.page.goto(process.env.BASE_URL);
//   }

//   async loginAs(role) {
//     const user = users[role];
//     if (!user) throw new Error(`User details not found for role: ${role}`);

//     console.log("Logging in as:", role);
//     console.log("User details:", user);

//     await this.userEmail.fill(user.username);
//     await this.userPassword.fill(user.password);
//     await this.loginButton.click();
//   }
// }

// module.exports = { RoleBasedLogin };
const users = require('../test-data/role_based_user_details.json');

class RoleBasedLogin {

  constructor(page) {
    this.page = page;
    this.url = process.env.BASE_URL;
  }

  async goTo() {
    await this.page.goto(this.url);
  }

  async loginAs(role) {

    const user = users[role];
    if (!user) throw new Error(`User details not found for role: ${role}`);

    console.log("Logging in as:", role);

    await this.page.locator('#userEmail').fill(user.username);
    await this.page.locator('#userPassword').fill(user.password);
    await this.page.locator('#login').click();

  }
}

module.exports = { RoleBasedLogin };