export default async function City(req,res){
    const city = await fetch('https://api.rajaongkir.com/starter/city',{
        method:'GET',
        headers: {key:process.env.RAJA_ONGKIR}
    })
    const cityData = await city.json()
    res.status(200).json(cityData)
}