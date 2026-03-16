



// const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
// const { chromium, firefox, webkit } = require('playwright');
// const dotenv = require('dotenv');
// const users = require('../../test-data/role_based_user_details.json');
// const { AutoHealLocator, ExecutionStrategy } = require('@sdetsanjay/autoheal-locator');

// setDefaultTimeout(120 * 1000); // 120 seconds

// // Set TEST_ENV default if not provided
// if (!process.env.TEST_ENV) process.env.TEST_ENV = 'staging';
// dotenv.config({ path: `.env.${process.env.TEST_ENV}` });

// console.log('TEST_ENV =', process.env.TEST_ENV);
// console.log('BROWSER =', process.env.BROWSER);
// console.log('HEADLESS =', process.env.HEADLESS);

// class CustomWorld {
//   constructor({ attach, parameters }) {
//     this.attach = attach;
//     this.parameters = parameters;
//   }

//   getUser(role) {
//     const selectedRole = role || 'superAdmin'; // fallback default
//     const user = users[selectedRole];
//     if (!user) throw new Error(`User details not found for role: ${selectedRole}`);
//     return user;
//   }

//   async init() {
//     const browserName = process.env.BROWSER || 'chromium';
//     const headless = process.env.HEADLESS === 'true';
//     const browsers = { chromium, firefox, webkit };

//     if (!browsers[browserName]) {
//       throw new Error(`Unsupported browser: ${browserName}`);
//     }

//     const serviceUrl = process.env.AZURE_PLAYWRIGHT_SERVICE_URL;

//     if (serviceUrl) {
//       console.log("Running on Azure Playwright Cloud");
//       this.browser = await browsers[browserName].connect({ wsEndpoint: serviceUrl });
//     } else {
//       console.log("Running locally");
      
//       this.browser = await browsers[browserName].launch({
//         headless,
//         slowMo: Number(process.env.SLOW_MO) || 0,
//         //...(browserName === 'chromium' && { channel: 'chrome' })
//         ...(browserName === 'chromium')
//       });
//     }

//     this.context = await this.browser.newContext({ recordVideo: { dir: 'videos/' } });
//     this.page = await this.context.newPage();
    
//   }

//   async close() {
//     if (this.page) await this.page.close();
//     if (this.context) await this.context.close();
//     if (this.browser) await this.browser.close();
//   }
// }

// setWorldConstructor(CustomWorld);

//“ it means For every scenario, create an instance of CustomWorld and use it as this inside steps and hooks.”

// Why CustomWorld is the right place

// CustomWorld is:

// Created once per scenario

// Destroyed after scenario ends

// Perfect place for:

// browser

// context

// page

// test-specific data



const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const dotenv = require('dotenv');
const users = require('../../test-data/role_based_user_details.json');


if (!process.env.TEST_ENV) process.env.TEST_ENV = 'staging';
dotenv.config({ path: `.env.${process.env.TEST_ENV}` });

class CustomWorld {

  constructor({ attach }) {
    this.attach = attach;
  }

   getUser(role) {
     const user = users[role];
     if (!user) throw new Error(`User not found: ${role}`);
     return user;
   }

  async init() {

    const browsers = { chromium, firefox, webkit };
    const browserName = process.env.BROWSER || "chromium";
    
this.browser = await browsers[browserName].launch({
  headless: process.env.HEADLESS === "true",
  slowMo: Number(process.env.SLOW_MO) || 0,
  ...(browserName === 'chromium' && { channel: 'chrome' })
  
});

    this.context = await this.browser.newContext({
    ignoreHTTPSErrors: true
  });
    this.page = await this.context.newPage();

    

  }

  async close() {
    await this.browser.close();
     await this.page.close();
      await this.context.close();
  }
}

setWorldConstructor(CustomWorld);