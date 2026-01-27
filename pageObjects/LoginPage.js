class LoginPage {
  constructor(page) {
    this.page = page;
    this.userEmail = page.locator('#userEmail');
    this.userPassword = page.locator('#userPassword');
    this.loginButton = page.locator("#login");
  }

  async goTo() {
   // await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   const url = process.env.BASE_URL;  // get from .env
     await this.page.goto(url);
    
  }

  async validLogin(username, password) {
    await this.userEmail.fill(username);
    await this.userPassword.fill(password);
    await this.loginButton.click();
    
  }
}

module.exports = { LoginPage };
