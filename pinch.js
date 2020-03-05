const {getBoundingRect} = require('./getBoundingRect');

/**
   * @param {!{x?: number, y?: number}=} start
   * @param {!{x?: number, y?: number}=} end
   * @param {!{steps?: number}=} options
   */
  
 const swipe = async function(client, start1,start2, end1, end2, options = {}) {
    const { steps = 2 } = options;
    const _start1 = { x: Math.round(start1.x1), y: Math.round(start1.y1) };
    const _start2 = { x: Math.round(start2.x2), y: Math.round(start2.y2) };
    const _end1 = { x: Math.round(end1.x1), y: Math.round(end1.y1) };
    const _end2 = { x: Math.round(end2.x2), y: Math.round(end2.y2) };

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
      touchPoints: [_start1,_start2]
    });

    for (let i = 1; i <= steps; i++) {
      await client.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [
          {
            x: _start1.x + (_end1.x - _start1.x) * (i / steps),
            y: _start1.y + (_end1.y - _start1.y) * (i / steps)
          },

          {
            x: _start2.x + (_end2.x - _start2.x) * (i / steps),
            y: _start2.y + (_end2.y - _start2.y) * (i / steps)
          }
        ]
      });
    }

    await client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: []
    });
  }  

  
  const pinch = async (page,client, selector1, selector2, offset) => {
    const targetBox = await page.evaluate(getBoundingRect,selector1);
    const { x:x1, y:y1 } = targetBox || {};
    const targetBox1 = await page.evaluate(getBoundingRect,selector2);
    const { x:x2, y:y2 } = targetBox1 || {};
    return swipe(client, {x1,y1}, {x2,y2},{x1,y1:y1-150},{x2,y2:y2+150});
  }
module.exports = {
 pinch
}