const {webkit,chromium, devices} = require('playwright');
const pixel2 = devices['Pixel 2'];
(async () => {
  const browser = await chromium.launch({headless:false, slowMo:15}); 
  const context = await browser.newContext({
    viewport:pixel2.viewport,
    userAgent: pixel2.userAgent,
  });
  const page = await context.newPage();
  await page.setViewportSize({width: 500, height: 500});

  // Type email
  await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker');
  await page.waitForSelector('input[id*="i0116"]');
  await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
  await page.click('input#idSIButton9');
 
  //Type password and login 
  await page.waitForSelector('input[id*="passwordInput"]')
  await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
  await page.waitFor(2000);
  await page.click('span#submitButton');

  await page.waitForSelector('g#Todays-date');
  await page.click('g#Todays-date');
  //await page.goBack();
  await page.waitForSelector('span[aria-label*="Mail"]');
  await page.click('span[aria-label*="Mail"]');
  //await page.waitFor(2000);
  //await page.goBack();
  await browser.close();

})();
  