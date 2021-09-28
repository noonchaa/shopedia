import { useEffect, useState } from 'react'
import { db } from '../../utils/firebaseClient'
import { collection,getDocs } from '@firebase/firestore'
import Layout from '../../components/Layout/Layout'

const Dashboard = () => {
    const [products, setProducts] = useState([])
    const [brand, setBrand] = useState('')

    useEffect(()=>{
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
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Stock Product</h1>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black font-bold tracking-wider capitalize p-2'>
                <select className='pl-4 py-1 focus:outline-none capitalize bg-gray-100' onChange={(e)=>setBrand(e.target.value)}>
                    <option className='text-xs' value=''>All</option>
                    {products.map(item=>item.brand).filter((item,index,self)=>self.indexOf(item)===index).map((item,index)=>(
                    <option className='text-xs' key={index} value={item}>{item}</option>
                    ))}
                </select>
                <h1 className='border-r border-l border-black'>Series</h1>
                <h1>Stocks</h1>
            </div>
            {brand==''?
            products.map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black p-2'>
                    <p className='font-semibold tracking-wide capitalize'>{item.brand}</p>
                    <p className='font-semibold tracking-wide capitalize border-r border-l border-black px-2'>{item.name}</p>
                    <p className='font-semibold tracking-wide capitalize'>{item.stock}</p>
                </div>
            )):
            products.filter(item=>item.brand==brand).map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black p-2'>
                    <p className='font-semibold tracking-wide capitalize'>{item.brand}</p>
                    <p className='font-semibold tracking-wide capitalize border-r border-l border-black px-2'>{item.name}</p>
                    <p className='font-semibold tracking-wide capitalize'>{item.stock}</p>
                </div>
            ))}
            <div className='max-w-3xl mx-auto text-right px-4 mt-8'>
                <button type='button' className='py-2 px-4 bg-black text-white rounded-xl font-medium tracking-wider' onClick={()=>window.print()}>Print</button>
            </div>
        </Layout>
    )
}
export default Dashboard