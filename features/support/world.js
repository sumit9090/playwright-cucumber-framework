// const { chromium } = require('playwright');

// class CustomWorld {
//   async init() {
//     this.browser = await chromium.launch({
//       headless: false,
//       slowMo: 800
//     });

//     this.context = await this.browser.newContext();
//     this.page = await this.context.newPage();
//   }

//   async close() {
//     await this.page.close();
//     await this.context.close();
//     await this.browser.close();
//   }
// }

// module.exports = CustomWorld;
// const { setWorldConstructor } = require('@cucumber/cucumber');
// const { chromium, firefox, webkit } = require('playwright');

// // Load dotenv FIRST
// const env = process.env.TEST_ENV || 'qa';

// require('dotenv').config({
//   path: `.env.${env}`
// });


// console.log('TEST_ENV =', process.env.TEST_ENV); console.log('BROWSER =', process.env.BROWSER);

// class CustomWorld {

//   constructor({ attach, parameters }) {
//     // Cucumber injects these
//     this.attach = attach;
//     this.parameters = parameters;  // optional, if you want parameters
//   }
//   async init() {
//     const browserName = process.env.BROWSER || 'chromium';
//     const headless = process.env.HEADLESS === 'true';


//     this.context = await this.browser.newContext({
//       recordVideo: {
//         dir: 'videos/'   // 🎥 videos folder
//       }
//     });

//     const browsers = { chromium, firefox, webkit };

//     if (!browsers[browserName]) {
//       throw new Error(`Unsupported browser: ${browserName}`);
//     }

//     this.browser = await browsers[browserName].launch({
//       headless,
//       channel: 'chrome',
//       slowMo: Number(process.env.SLOW_MO) || 0
//     });
//     console.log('ACTUAL browser type:', this.browser._name);
//     this.context = await this.browser.newContext();
//     this.page = await this.context.newPage();
//   }

//   async close() {
//     if (this.browser) {
//       await this.browser.close();
//     }
//   }
// }

// setWorldConstructor(CustomWorld);




const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

// Load env
const env = process.env.TEST_ENV || 'staging';
//“If the OS has a variable called TEST_ENV, use it. Otherwise, default to 'staging'."



require('dotenv').config({ path: `.env.${env}` });
//dotenv.config() → copies .env → process.env
//This line:

//Reads .env.qa. Tries to add variables into process.env. BUT only if they don’t already exist

console.log('TEST_ENV =', process.env.TEST_ENV);// checking value of TEST_ENV

console.log('BROWSER =', process.env.BROWSER);

console.log('HEADLESS =', process.env.HEADLESS);

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
  }

  async init() {
    const browserName = process.env.BROWSER || 'chromium';// // <-- uses your .env value
    const headless = process.env.HEADLESS === 'true';
    //“Set headless to true ONLY IF process.env.HEADLESS is the string 'true'.”

    const browsers = { chromium, firefox, webkit };
    if (!browsers[browserName]) {
      throw new Error(`Unsupported browser: ${browserName}`);
    }

    // 🚀 Launch browser
    this.browser = await browsers[browserName].launch({
      headless,
      slowMo: Number(process.env.SLOW_MO) || 0,
      ...(browserName === 'chromium' && { channel: 'chrome' })
    });
    //Key point

// browser, context, and page are NOT created in the constructor

// They are created only when init() is called

// 👉 That is lazy initialization

    // 🎥 ONE context with video enabled
    this.context = await this.browser.newContext({
      recordVideo: {
        dir: 'videos/'
      }
    });

    this.page = await this.context.newPage();
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);//“ it means For every scenario, create an instance of CustomWorld and use it as this inside steps and hooks.”

// Why CustomWorld is the right place

// CustomWorld is:

// Created once per scenario

// Destroyed after scenario ends

// Perfect place for:

// browser

// context

// page

// test-specific data