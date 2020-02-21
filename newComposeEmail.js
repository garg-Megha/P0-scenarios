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
  await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker');
  await page.waitForSelector('input[id*="i0116"]');
  await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
  await page.click('input#idSIButton9');
 
  //Type password and login 
  await page.waitForSelector('input[id*="passwordInput"]')
  await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
  await page.waitFor(2000);
  await page.click('span#submitButton');
  
  //clicks on new compose icon and come back
  await page.waitForSelector('i[aria-label*="Compose new mail"]');
  await page.click('i[aria-label*="Compose new mail"]');
  await page.waitForSelector('i[aria-label*="Back"]');
  await page.click('i[aria-label*="Back"]');

  //Again clicks the new compose icon and sends an email
  await page.waitForSelector('i[aria-label*="Compose new mail"]');
  await page.click('i[aria-label*="Compose new mail"]');
  await page.waitForSelector('input[aria-label*="Add recipients to be sent to. No recipient added"]');
  await page.type('input[aria-label*="Add recipients to be sent to. No recipient added"]',"t-megar@microsoft.com");

  //await page.waitForSelector('input[aria-label*="Add a subject"]');
  //await page.type('input[aria-label*="Add a subject"]',"Test Email");

  await page.type('div[aria-label*="Message: "]',"Test Email");
  await page.click('i[aria-label*="Send"]');

  //click send button when an alert came to send an email without subject
  await page.waitForSelector('button[aria-label*="Send"]');
  await page.click('button[aria-label*="Send"]');


  await browser.close();
})();