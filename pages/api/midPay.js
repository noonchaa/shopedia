const midtransClient = require('midtrans-client')

let coreApi = new midtransClient.CoreApi({
    isProducton: false,
    serverKey:process.env.MIDTRANS_SERVER,
    clientKey:process.env.MIDTRANS_CLIENT
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