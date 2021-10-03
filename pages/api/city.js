export default async function City(req,res){
    const city = await fetch('https://api.rajaongkir.com/starter/city',{
        method:'GET',
        headers: {key:'b1a33ddcf74756234f061b52f8c0813b'}
    })
    const cityData = await city.json()
    res.status(200).json(cityData)
}