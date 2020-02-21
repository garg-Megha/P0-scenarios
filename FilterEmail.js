const {webkit,chromium, devices} = require('playwright');
const pixel2 = devices['Pixel 2'];
(async () => {
  const browser = await chromium.launch({headless:false, slowMo:15}); 
  const context = await browser.newContext({
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

  await page.waitForSelector('div[aria-label*="Filter"]');
  await page.click('div[aria-label*="Filter"]');

  await page.waitForSelector('a[aria-label*="Unread"]');
  await page.click('a[aria-label*="Unread"]');

})();
  