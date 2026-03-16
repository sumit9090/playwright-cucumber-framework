 const { timestamp } = require('./utils/timestamp');


// //We use module.exports to export configuration from a file so that Cucumber can read and use it.
// //This file (cucumber.js) is not just a script — it acts like a configuration provider.
 module.exports = {
   default: {
    require: [
  'features/support/**/*.js',
  'features/step_definitions/**/*.js'
],


     //parallel: 4,
     retry: 0, //// 👈 retry failed scenarios 3 times
   //npx cucumber-js --retry 3
     //retryTagFilter: '@retry',

//     //Retry only flaky tests (best practice)

//     // What retryTagFilter: '@retry' does

//     // This controls which scenarios are allowed to retry, not which ones run.

//     // 👉 Among the already-running scenarios (@smoke ones):

//     // Only scenarios "also tagged with" @retry will retry

//     // Others will fail immediately (no retry)

//     // This prevents masking real bugs.

  tags: '@smoke',

     timeout: 60000, //publishQuiet: true is a Cucumber.js setting 👍timeout here is step timeout, not Playwright timeout.

    publishQuiet: true, //It’s a small one, but it cleans up your test output nicely.
     worldParameters: {
      device: 'iPhone 11',
      ignoreHTTPSErrors: true
    },

     format: [
       'progress',//progress shows a simple execution indicator in the terminal while tests run.
       //.....F.......

//1 scenario failed
//9 scenarios passed
       `html:reports/cucumber-report-${timestamp}.html`,

//       // allure-cucumberjs → Cucumber formatter

//       // allure-commandline → Generate & open report

       'allure-cucumberjs/reporter',
       'rerun:@rerun.txt'
//       //npx cucumber-js @rerun.txt
    ],

    grepInvert: '@skip',

     formatOptions: {
       allureResults: `allure-results/${timestamp}`
     }
   }
 };

// // Install required packages
// // npm install --save-dev allure-cucumberjs allure-commandline

// // allure-commandline → generates and opens reports

// // allure-cucumberjs/reporter → Cucumber formatter for Allure

// // “We used Cucumber.js mainly for BDD-style readability, execution control using tags, and rich reporting integration with Allure,
// //  while Playwright handled the browser automation.”

// //2️⃣ Configure cucumber.js

// // 3️⃣ Run BDD tests
// // npx cucumber-js

// // After execution, you’ll see:

// // allure-results/
// //   └── 20260203/
// //       ├── *.json
// //       ├── *.txt
// //       └── attachments

// // ✅ 4️⃣ Generate Allure report

// // ⚠️ Use the same results folder

// // npx allure generate allure-results/20260203 -o allure-report --clean

// // ✅ 5️⃣ Open Allure report
// // npx allure open allure-report

// //Interview-ready explanation (use this verbatim)

// //“In our BDD Playwright framework, we executed tests using Cucumber tags. 
// // We retried only flaky scenarios by combining retry with retryTagFilter, 
// // and we used the rerun formatter to re-execute failed scenarios. For reporting,
// //  we integrated Allure and HTML reports, and we enabled parallel execution using Cucumber workers with isolated Playwright browser contexts.”

// //npx cucumber-js --format rerun:@rerun.txt
// //Then rerun:

// //npx cucumber-js @rerun.txt



