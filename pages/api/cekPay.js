const midtransClient = require('midtrans-client')

let coreApi = new midtransClient.CoreApi({
    isProducton: false,
    serverKey:process.env.MIDTRANS_SERVER,
    clientKey:process.env.MIDTRANS_CLIENT
})

export default async function cekPay(req,res){
    const {id} = await req.query
    const data = await coreApi.transaction.status(id)
    res.status(200).json(data)
}