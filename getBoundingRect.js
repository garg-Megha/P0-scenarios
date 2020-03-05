const getBoundingRect = async function (selector) {
    const rect =  document.querySelector(selector).getBoundingClientRect();
    return{
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
      };
}

module.exports={
    getBoundingRect
}