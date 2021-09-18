import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Admin from '../../components/Admin'
import { UserContext } from '../../components/User'
import { db } from '../../utils/firebaseClient'
import { collection,getDocs } from '@firebase/firestore'

const Dashboard = () => {
    //retrieve currently signin user
    const user = useContext(UserContext)
    //next/router for redirecting to another page
    const router = useRouter()
    //set initial state
    const [products, setProducts] = useState([])
    const [brand, setBrand] = useState('')

    useEffect(()=>{
        //get list of products stocks onMount
        const getStocks = async () => {
            const res = await getDocs(collection(db, 'stocks'))
            const data = []
            res.forEach((doc)=>{
                data.push(doc.data())
            })
            setProducts(data)
        }
        getStocks()
    },[])

    return(
        <Admin>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border-b p-2 mt-8 font-bold tracking-wider capitalize text-green-600'>
                <select className='pl-4 py-1 focus:outline-none focus:ring-1 focus:ring-green-600 capitalize' onChange={(e)=>setBrand(e.target.value)}>
                    <option className='text-xs' value=''>All</option>
                    {products.map((item,index)=>(
                    <option className='text-xs' key={index} value={item.brand}>{item.brand}</option>
                    ))}
                </select>
                <h1>Series</h1>
                <h1>Stocks</h1>
            </div>
            {brand==''?
            products.map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto text-center grid grid-cols-3 border-b p-2'>
                    <p className='font-semibold tracking-wide capitalize'>{item.brand}</p>
                    <p className='font-semibold tracking-wide capitalize'>{item.name}</p>
                    <p className='font-semibold tracking-wide capitalize'>{item.stock}</p>
                </div>
            )):
            products.filter(item=>item.brand==brand).map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto text-center grid grid-cols-3 border-b p-2'>
                    <p className='font-semibold tracking-wide capitalize'>{item.brand}</p>
                    <p className='font-semibold tracking-wide capitalize'>{item.name}</p>
                    <p className='font-semibold tracking-wide capitalize'>{item.stock}</p>
                </div>
            ))}
        </Admin>
    )
}
export default Dashboard