export default async function Cost(req,res){
    const {dest,kurir,berat} = JSON.parse(req.body)
    const cost = await fetch('https://api.rajaongkir.com/starter/cost',{
        method:'POST',
        headers: {key:'b1a33ddcf74756234f061b52f8c0813b', 'content-type': 'application/json'},
        body: JSON.stringify({origin: '455', destination: dest, weight: berat, courier: kurir})
    })
    const costData = await cost.json()
    res.status(200).json(costData)
}