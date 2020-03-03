/**
   * @param {!{x?: number, y?: number}=} start
   * @param {!{x?: number, y?: number}=} end
   * @param {!{steps?: number}=} options
   */
 const swipe = async function(client, start, end, options = {}) {
    const { steps = 5 } = options;
    const _start = { x: Math.round(start.x), y: Math.round(start.y) };
    const _end = { x: Math.round(end.x), y: Math.round(end.y) };

    // Touches appear to be lost during the first frame after navigation.
    // This waits a frame before sending the tap.
    // @see https://crbug.com/613219
    // await client.send("Runtime.evaluate", {
    //   expression:
    //     "new Promise(x => requestAnimationFrame(() => requestAnimationFrame(x)))",
    //   awaitPromise: true
    // });

    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [_start]
    });

    for (let i = 1; i <= steps; i++) {
      await client.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [
          {
            x: _start.x + (_end.x - _start.x) * (i / steps),
            y: _start.y + (_end.y - _start.y) * (i / steps)
          }
        ]
      });
    }

    await client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: []
    });
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
  
   const swipeLeft = async (page,client, selector, offset) => {
      const targetBox = await page.evaluate(getBoundingRect,selector);
      const { x, y } = targetBox || {};
      return swipe(client, {x: x + offset, y}, {x, y});
  }


  module.exports={
      swipeLeft
  }