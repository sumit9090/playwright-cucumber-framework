// const { Before, After } = require('@cucumber/cucumber');
// const fs = require('fs'); //It’s a built-in Node.js module . It lets your code read, write, create, delete files & folders

// Before(async function () {
//   await this.init();
// });

// After(async function (scenario) {
//   if (scenario.result.status === 'FAILED' && this.page) {
//     const screenshot = await this.page.screenshot({ fullPage: true });
//     await this.attach(screenshot, 'image/png');
//   }

//   const videoPath = await this.page.video()?.path();
//   await this.close();

//   if (videoPath) {
//     const videoBuffer = fs.readFileSync(videoPath);
//     await this.attach(videoBuffer, 'video/webm');
//   }
// });

const { Before, After } = require('@cucumber/cucumber');
const fs = require('fs');

Before(async function () {

  await this.init();

  // Start tracing
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

});

After(async function (scenario) {

  if (scenario.result.status === 'FAILED' && this.page) {

    // Screenshot on failure
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');

    // Save trace if failed
    await this.context.tracing.stop({
      path: `trace/${scenario.pickle.name}.zip`
    });

  } else {

    // Stop tracing without saving
    await this.context.tracing.stop();
  }

  const videoPath = await this.page.video()?.path();
  await this.close();

  if (videoPath) {
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }

});