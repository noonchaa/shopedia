const midtransClient = require('midtrans-client')

let coreApi = new midtransClient.CoreApi({
    isProducton: false,
    serverKey:'SB-Mid-server-QSRzuv0tLUocvW72lypXPUaO',
    clientKey:'SB-Mid-client-5AIwEY7xlLNRT_xr'
})

export default async function midtransHandler(req,res){
    const params = req.body
    const data = {}
    await coreApi.charge(params).then((chargeResponse)=>{
        Object.assign(data,chargeResponse)
    }).catch((err)=>{
        Object.assign(data,err.ApiResponse)
    })
    res.status(200).json(data)
}