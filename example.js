const {webkit,chromium, devices} = require('playwright');
const pixel2 = devices['Pixel 2'];
(async () => {
  const browser = await chromium.launch({headless:false, slowMo:15});
  const context = await browser.newContext({
    viewport: pixel2.viewport,
    userAgent: pixel2.userAgent,
  });
  const page = await context.newPage();
  await page.goto('https://outlook.office.com');
  await page.waitForSelector('input[id*="i0116"]');
  await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
  await page.click('input#idSIButton9');

  await page.waitForSelector('input[id*="passwordInput"]')
  await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
  await page.waitFor(2000);
  await page.click('span#submitButton');
  await page.waitForSelector('button[aria-label="Folder navigation"]');
  await page.click('button[aria-label="Folder navigation"]');
  await browser.close();
})();

const {webkit,chromium, devices} = require('playwright');
//const iPhone11 = devices['iPhone 11 Pro']; // Or 'chromium' or 'webkit'.
const pixel2 = devices['Pixel 2'];
(async () => {
  const browser = await chromium.launch({headless:false, slowMo:15});
  const context = await browser.newContext({
    // viewport: iPhone11.viewport,
    // userAgent: iPhone11.userAgent,
    viewport: pixel2.viewport,
    userAgent: pixel2.userAgent,
  });
  const page = await context.newPage();
  await page.goto('https://outlook.office.com');
  await page.waitForSelector('input[id*="i0116"]');
  await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
  await page.click('input#idSIButton9');

  await page.waitForSelector('input[id*="passwordInput"]')
  await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
  await page.waitFor(2000);
  await page.click('span#submitButton');
  //await page.goto('https://outlook-sdf.office.com/mail/inbox');
  //await page.waitForNavigation({waitUntil: 'networkidle2'});

//   const lastPosition = await scrollPageToBottom(page);
//   await page.screenshot({ path: path.normalize(`${__dirname}/example.png`) })
 
// console.log(`lastPosition: ${lastPosition}`)
//   await page.waitForNavigation();
//   await autoScroll(page);
//   await page.screenshot({
//     path: 'yoursite.png',
//     fullPage: true
// });
  //await page.waitForSelector('button[aria-label="Folder navigation"]');
  //await page.click('button[aria-label="Folder navigation"]');
  // await page.evaluate(() => {
  //   document.querySelector('._3OxOUJk7uti5nT389P5Ql7').click();
  // });
  //await page.click('button[aria-label="Folder navigation"]');
  //await page.click('button#idSIButton9');
  await browser.close();
})();