const midtransClient = require('midtrans-client')

let coreApi = new midtransClient.CoreApi({
    isProducton: false,
    serverKey:'SB-Mid-server-QSRzuv0tLUocvW72lypXPUaO',
    clientKey:'SB-Mid-client-5AIwEY7xlLNRT_xr'
})

export default async function cekPay(req,res){
    const {id} = req.query
    const data = {}
    await coreApi.transaction.status(id).then((response)=>{
        Object.assign(data,response)
    })
    res.status(200).json(data)
}