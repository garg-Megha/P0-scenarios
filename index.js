const dispatchTouch = async(client,type,touchPoints) => {
  await client.send('Input.dispatchTouchEvent',{type,touchPoints});
}

const getCenter = function(id) {
  const node = document.querySelector(id);
  console.log('hiiii' );
  console.log(id);
  console.log(node);
  return { x: node.offsetLeft + node.offsetWidth / 2,
           y: node.offsetTop + node.offsetHeight / 2 }
}


// const simulateSwipe = () => {
  
// function sendTouchEvent(x, y, element, eventType) {
//   const touchObj = new Touch({
//     identifier: Date.now(),
//     target: element,
//     clientX: x,
//     clientY: y,
//     pageX: x,
//     pageY: y,
//     radiusX: 2.5,
//     radiusY: 2.5,
//     rotationAngle: 10,
//     force: 0.5,
//   });

//   const touchEvent = new TouchEvent(eventType, {
//     cancelable: true,
//     bubbles: true,
//     touches: [touchObj],
//     targetTouches: [],
//     changedTouches: [touchObj],
//     shiftKey: true,
//   });

//   element.dispatchEvent(touchEvent);
// }
      
const myElement = document.querySelector('#app > div > div > main > div > div > div:nth-child(3) > div > article >div:nth-child(2)');

sendTouchEvent(176,216, myElement, 'touchstart');
sendTouchEvent(217,222, myElement, 'touchmove');
sendTouchEvent(217,222, myElement, 'touchend');
}

const getBoundingRect = function (selector) {
    const rect =  document.querySelector(selector).getBoundingClientRect();
    return{
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
      };
  }

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
      // const { x, y } = await page.evaluate(getCenter,'#app > div > div > main > div > div > div:nth-child(3) > div > article');
      // console.log(x);

      await page.evaluate(() => window.addEventListener('touchstart', e => console.log('touch start', e)));
      await page.evaluate(() => window.addEventListener('touchmove', e => console.log('touch move', e)));
      await page.evaluate(() => window.addEventListener('touchend', e => console.log('touch end', e)));
      await page.evaluate(() => window.addEventListener('mousedown', e => console.log('mouse down', e)));
      await page.evaluate(() => window.addEventListener('mouseup', e => console.log('mouse up', e)));
      // await page.evaluate(() => window.addEventListener('mousemove', e => console.log('mouse move', e)));
      await page.waitFor(1000);

      const targetBox = await page.evaluate(getBoundingRect,'#app > div > div > main > div > div > div:nth-child(3) > div > article');
      const { x, y, width, height } = targetBox || {};
      console.log('rectangle', x, y, width, height);

      // await page.evaluate(simulateSwipe);

      // await dispatchTouch(client,'touchStart',[{x,y}]);
      // await dispatchTouch(client,'touchMove',[{x:x+100,y}]);
      //await dispatchTouch(client,'touchEnd',[]);

     // await page.mouse.move(x, y + height / 2);
    // await page.mouse.down();
     // await page.mouse.move(x + width / 2, y + height / 2);
     // await page.mouse.up();


      // await page.hover('//*[@id="app"]/div/div/main/div/div/div[6]/div/article');
      // await page.mouse.down();
      // await page.mouse.up();

      // await page.click('//*[@id="app"]/div/div/main/div/div/div[6]/div/article');
      // await page.mouse.up();
      // await page.mouse.up();



      //await page.hover('//*[@id="app"]/div/div/main/div/div/div[6]/div/article');
      // await dispatchTouch(client,'touchStart',[{x,y}]);
      // await dispatchTouch(client,'touchMove',[{x:x-100,y}]);
      //await dispatchTouch(client,'touchEnd',[]);

      //await page.click('//*[@id="app"]/div/div/main/div/div/div[4]/div/article',{delay:600});   // for long press

      // await page.keyboard.down('Shift');
      // await page.keyboard.down('Control');
      // await page.keyboard.down('i');
      // await page.keyboard.up('i');
      // await page.keyboard.up('Shift');
      // await page.keyboard.up('Control');
 


  //await browser.close();
})();