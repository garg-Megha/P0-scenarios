const {swipeLeft} = require('./swipe');

    const {webkit,chromium, devices} = require('playwright');
    const pixel2 = devices['Pixel 2'];
    (async () => {
      const browser = await chromium.launch({headless:false});
      const context = await browser.newContext({
        viewport: pixel2.viewport,
        userAgent: pixel2.userAgent,
      });
      const page = await context.newPage();
      await page.emulateMedia(pixel2);

      // Type email
      await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker');
      let client = await browser.pageTarget(page).createCDPSession();

      await client.send('Emulation.setEmitTouchEventsForMouse', {
        enabled:true,
        configuration:'mobile'
    });
    
      await page.waitForSelector('input[id*="i0116"]');
      await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
      await page.click('input#idSIButton9');
    
      //Type password and login 
      await page.waitForSelector('input[id*="passwordInput"]')
      await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
      await page.waitFor(2000);
      await page.click('span#submitButton');
      await page.waitForSelector('#app > div > div > main > div > div > div:nth-child(3) > div > article');
      
      await page.evaluate(() => window.addEventListener('touchstart', e => console.log('touch start', e)));
      await page.evaluate(() => window.addEventListener('touchmove', e => console.log('touch move', e)));
      await page.evaluate(() => window.addEventListener('touchend', e => console.log('touch end', e)));
      await page.evaluate(() => window.addEventListener('mousedown', e => console.log('mouse down', e)));
      await page.evaluate(() => window.addEventListener('mouseup', e => console.log('mouse up', e)));
      await page.waitFor(1000);

     
      //await swipe(client, {x, y}, {x:x, y:y-200});
      await swipeLeft(page,client, '#app > div > div > main > div > div > div:nth-child(3) > div > article h2', 200);
      await client.send('Emulation.setEmitTouchEventsForMouse', {
        enabled:true,
        configuration:'mobile'
    });
})();