const {webkit,chromium, devices} = require('playwright');
const pixel2 = devices['Pixel 2'];
(async () => {
  const browser = await chromium.launch({headless:false, slowMo:15});
  const context = await browser.newContext({
    viewport: pixel2.viewport,
    userAgent: pixel2.userAgent,
  });
  const page = await context.newPage();

  // Type email
  await page.goto('https://outlook.office.com');
  await page.waitForSelector('input[id*="i0116"]');
  await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
  await page.click('input#idSIButton9');
 
  //Type password and login 
  await page.waitForSelector('input[id*="passwordInput"]')
  await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
  await page.waitFor(2000);
  await page.click('span#submitButton');

  // await page.waitForSelector('div[aria-label*="Filter"]');
  // await page.click('div[aria-label*="Filter"]');

  await page.click('i[aria-label*="Search"]');
        await page.type('input[type*="Search"]',"Vaibhav");
        await page.keyboard.press('Enter');
        await page.click('//*[@id="app"]/div/div/main/div/div/div[2]/div/article');
        await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker');
  


 

  //await browser.close();
})();