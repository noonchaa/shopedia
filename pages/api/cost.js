export default async function Cost(req,res){
    const {dest,kurir,berat} = JSON.parse(req.body)
    const cost = await fetch('https://api.rajaongkir.com/starter/cost',{
        method:'POST',
        headers: {key:process.env.RAJA_ONGKIR, 'content-type': 'application/json'},
        body: JSON.stringify({origin: '151', destination: dest, weight: berat, courier: kurir})
    })
    const costData = await cost.json()
    res.status(200).json(costData)
}