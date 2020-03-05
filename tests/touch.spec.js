const {swipeLeft,scroll} = require('../swipe');
const {mobileConfig} = require('../mobileConfig');
const PAGE_URL = 'https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker';


describe('Outlook P0 scenarios',() => {
    jest.setTimeout(4000000);
    const {webkit,chromium, devices} = require('playwright');
        const pixel2 = devices['Pixel 2'];
        let browser;
        let context; 
        let page;
        let client

    beforeAll(async() => {
        browser = await chromium.launch({headless:false, slowMo: 15});
        context = await browser.newContext({
            viewport: pixel2.viewport,
            userAgent: pixel2.userAgent,
        });
        page = await context.newPage();
        await page.emulateMedia(pixel2);
        
        // Type email
        await page.goto(PAGE_URL);
        client = await browser.pageTarget(page).createCDPSession();
        // await client.send('Emulation.setDeviceMetricsOverride', {
        //     width: 400,
        //     height: 900,
        //     mobile: true,
        //     deviceScaleFactor: 1,
        //     viewport: {
        //         x: 0,
        //         y: 0,
        //         width: 400,
        //         height: 900,
        //         scale:1
        //     }
        // });
        await mobileConfig(client);
        
        await page.waitForSelector('input[id*="i0116"]');
        await page.type('input[id*="i0116"]', "owaexp6@microsoft.com");
        await page.click('input#idSIButton9');
        
        //Type password and login 
        await page.waitForSelector('input[id*="passwordInput"]')
        await page.type('input[id*="passwordInput"]', "Substrate.Outlook.6");
        await page.waitFor(2000);
        await page.click('span#submitButton');   
    })
    
    it('should swipe the mail',async() => {
        await page.waitFor(5000);
        await swipeLeft(page,client, '#app > div > div > main > div > div > div:nth-child(3) > div > article h2', 200);
        await mobileConfig(client);
    });

    it('should scroll the mail list', async() => {
        await page.waitFor(2000);
        await scroll(page,client, '#app > div > div > main > div > div > div:nth-child(4) > div > article h2', 200);
        await mobileConfig(client);
    })
})

