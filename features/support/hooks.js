const { Before, After } = require('@cucumber/cucumber');
const fs = require('fs');

Before(async function () {
  await this.init();
});

After(async function (scenario) {
  // 📸 Screenshot on failure
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  // 🎥 Capture video path BEFORE closing
  const videoPath = await this.page.video()?.path();

  // 🔻 Close browser/context/page
  await this.close();

  // 📎 Attach video to Allure
  if (videoPath) {
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }
});
