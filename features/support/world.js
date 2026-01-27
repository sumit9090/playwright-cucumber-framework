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
const env = process.env.TEST_ENV || 'qa';
require('dotenv').config({ path: `.env.${env}` });

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
  }

  async init() {
    const browserName = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS === 'true';

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

setWorldConstructor(CustomWorld);
