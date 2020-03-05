describe('Outlook P0 scenarios',() => {
    jest.setTimeout(4000000);
    const {webkit,chromium, devices} = require('playwright');
        const pixel2 = devices['Pixel 2'];
        let browser;
        let context; 
        let page;

    beforeAll(async() => {
        browser = await chromium.launch({headless:false, slowMo: 15});
        context = await browser.newContext({
            viewport: pixel2.viewport,
            userAgent: pixel2.userAgent,
        });
        page = await context.newPage();

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
        
       
    })


    // it('forward button should be disable in case of DNF mail', async() => {
    //     await page.waitForSelector('//*[@id="app"]/div/div/main/div/div/div[3]/div/article');
    //     await page.click('//*[@id="app"]/div/div/main/div/div/div[3]/div/article');
    //     const is_disabled = await page.evaluate(() => document.querySelector('i[aria-label*="Forward"] i[aria-disabled]') !== null);
    //     expect(is_disabled).toBe('false');
    // })
    // data-id="askjld"
    it('should click on calender icon',async () => {
        await page.waitForSelector('g#Todays-date');
        await page.click('g#Todays-date');
        await page.waitForSelector('span[aria-label*="Mail"]');
        await page.click('span[aria-label*="Mail"]');
        await page.waitFor(4000);
        const url = await page.mainFrame().url();
        expect(url).toContain('mail/inbox'); 
        //expect(page.url()).toBe(server.PREFIX + '/wrappedlink.html#clicked');
    })

    it('should move the email to other inbox', async() => {
        await page.click('//*[@id="app"]/div/div/main/div/div/div[6]/div/article');
        await page.waitForSelector('i[aria-label*="More options"]');
        await page.click('i[aria-label*="More options"]');
        await page.click('div[aria-label="Move to Other inbox"]');
    //    
    })

    it('Should Filter Email', async() => {
        await page.waitForSelector('div[aria-label*="Filter"]');
        await page.click('div[aria-label*="Filter"]');

        await page.waitForSelector('div[aria-label*="Unread"]');
        await page.click('div[aria-label*="Unread"]');
        await page.waitFor(3000);
        await page.click('div[aria-label*="Unread"]');

        // await page.waitForSelector('i[aria-label*="Folder navigation"]');
        // await page.click('i[aria-label*="Folder navigation"]');
        // var headings = document.evaluate("button[text()='Sent Items']", document, null, XPathResult.ANY_TYPE, null );
        // var thisHeading = headings.iterateNext();
        // await page.click(thisHeading.textContent);
    })

    it('should compose a new mail', async() => {

        //clicks the new compose icon and sends an email
        await page.waitForSelector('i[aria-label*="Compose new mail"]');
        await page.click('i[aria-label*="Compose new mail"]');
        await page.waitForSelector('input[aria-label*="Add recipients to be sent to. No recipient added"]');
        await page.type('input[aria-label*="Add recipients to be sent to. No recipient added"]',"owaexp5@microsoft.com");

        //await page.waitForSelector('input[aria-label*="Add a subject"]');
        //await page.type('input[aria-label*="Add a subject"]',"Test Email");

        await page.type('div[aria-label*="Message: "]',"Test Email");
        await page.click('i[aria-label*="Send"]');

        //click send button when an alert came to send an email without subject
        await page.waitForSelector('button[aria-label*="Send"]');
        await page.click('button[aria-label*="Send"]');
    })


    it('should reply to the mail', async() => {
        await page.waitFor(5000);
        await page.click('//*[@id="app"]/div/div/main/div/div/div[8]/div/article');
        await page.click('i[aria-label*="Reply"]');
        await page.type('div[aria-label*="Message: "]','test');
        await page.click('i[aria-label*="Send"]');
        // await page.waitFor(3000);
        // await page.waitForSelector('i[aria-label*="Back"]').click('i[aria-label*="Back"]');
        await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker')
    })

    it('should search an email', async() => {
        await page.waitFor(5000);
        await page.click('i[aria-label*="Search"]');
        await page.type('input[type*="Search"]',"Vaibhav");
        await page.keyboard.press('Enter');
        await page.click('//*[@id="app"]/div/div/main/div/div/div[4]/div/article');
        await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker')
        
    })

    it('should mark an email as junk',async() => {
        await page.click('//*[@id="app"]/div/div/main/div/div/div[7]/div/article');
        await page.waitForSelector('i[aria-label*="More options"]');
        await page.click('i[aria-label*="More options"]');
        await page.waitForSelector('div[aria-label*="Mark as junk"]');
        await page.click('div[aria-label*="Mark as junk"]');
    })

    it('should pin and reply the mail', async() => {
        await page.click('//*[@id="app"]/div/div/main/div/div/div[8]/div/article');
        await page.waitForSelector('i[aria-label*="More options"]');
        await page.click('i[aria-label*="More options"]');
        await page.waitForSelector('div[aria-label*="Pin"]');
        await page.click('div[aria-label*="Pin"]');
        await page.waitFor(3000);
        await page.click('//*[@id="app"]/div/div/main/div/div/div[8]/div/article');
        await page.click('i[aria-label*="Reply"]');
        await page.click('div[aria-label*="Message: "]');
        await page.type('div[aria-label*="Message: "]',"test message");
        await page.click('i[aria-label*="Send"]');
        await page.waitFor(3000);
        await page.click('i[aria-label*="Back"]');
    })

    it('should flag/unflag the mail', async() => {
        await page.click('//*[@id="app"]/div/div/main/div/div/div[4]/div/article');
        await page.waitForSelector('i[aria-label*="More options"]');
        await page.click('i[aria-label*="More options"]');
        await page.waitForSelector('div[aria-label*="Flag"]');
        await page.click('div[aria-label*="Flag"]');
        await page.waitFor(3000);
        await page.click('i[aria-label*="Back"]');
    })

    it('should navigate to other folder', async() => {
        await page.waitForSelector('i[aria-label*="Folder navigation"]');
        await page.click('i[aria-label*="Folder navigation"]');
        await page.waitForSelector('//*[@id="FolderPaneDivId"]/div[2]/div[2]/div[4]');
        await page.click('//*[@id="FolderPaneDivId"]/div[2]/div[2]/div[4]');
        await page.waitFor(3000);
        await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker')
        
    })

    it('should delete emails in the deleted folder permanently', async() => {
        await page.waitForSelector('i[aria-label*="Folder navigation"]');
        await page.click('i[aria-label*="Folder navigation"]');
        await page.click('//*[@id="FolderPaneDivId"]/div[2]/div[3]/div[6]');
        await page.waitForSelector('//*[@id="app"]/div/div/main/div/div/div[4]/div/article');
        await page.click('//*[@id="app"]/div/div/main/div/div/div[4]/div/article');
        await page.waitForSelector('i[aria-label*="Delete"]');
        await page.click('i[aria-label*="Delete"]');
        await page.waitForSelector('button[aria-label*="OK"]');
        await page.click('button[aria-label*="OK"]');
        await page.goto('https://outlook-sdf.office.com/mail/inbox?features=-mini-serviceworker')
    })
    

    
})