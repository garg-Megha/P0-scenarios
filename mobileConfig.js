const mobileConfig = async (client) => {
   return await client.send('Emulation.setEmitTouchEventsForMouse', {
    enabled:true,
    configuration:'mobile'
})
};

module.exports ={
    mobileConfig
}