module.exports = {
  default: {
    require: [
      'features/support/**/*.js',
      'features/step_definitions/**/*.js'
    ],
    //tags: '@smoke',
    timeout: 60000,
    publishQuiet: true,
    format: [
      'progress',                      // console output
      'html:reports/cucumber-report.html', // optional HTML report
      'allure-cucumberjs/reporter' // Allure reporter
    ],
    formatOptions: {
      allureResults: 'allure-results' // folder for raw Allure results
    }
  }
};




// Install required packages
// npm install --save-dev allure-cucumberjs allure-commandline


// allure-commandline → generates and opens reports

// allure-cucumberjs/reporter → Cucumber formatter for Allure