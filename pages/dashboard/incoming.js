import { useEffect, useState } from 'react'
import { db } from '../../utils/firebaseClient'
import { collection, getDocs, doc, updateDoc } from '@firebase/firestore'
import Button from "../../components/part/Button"
import Input from "../../components/Layout/Form/Input"
import Layout from '../../components/Layout/Layout'

const Incoming = () => {
    const [products, setProducts] = useState([])
    const [brand, setBrand] = useState('')
    const [series, setSeries] = useState('')
    const [stock, setStock] = useState('')
    const [loading, setLoading] = useState(false)

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

    const UpdateStock = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(brand==''){
            alert('Mohon pilih merk laptop')
        }
        if(series==''){
            alert('Mohon pilih serie laptop')
        } else {
        setLoading(true)
        await updateDoc(doc(db,'stocks',series),{
            stock: Number(stock) + Number(products.filter(item=>item.name==series).map(item=>item.stock))
        })
        setLoading(false)
        setBrand('')
        setSeries('')
        setStock('')
        }
    }

    return(
        <Layout>
            <h1 className='text-center font-semibold text-xl mt-8'>Stock Product Datang</h1>
            <form className='max-w-2xl mx-auto' onSubmit={UpdateStock}>
                <select className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200' onChange={(e)=>setBrand(e.target.value)}>
                {products.map(item=>item.brand).filter((item,index,self)=>self.indexOf(item)===index).map((item,index)=>(
                    <option className='text-xs' key={index} value={item}>{item}</option>
                ))}
                </select><br/>
                {brand==''?
                <select className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200'>
                    <option className='text-xs' value=''>Series</option>
                </select>
                :
                <select className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200' onChange={(e)=>setSeries(e.target.value)}>
                {products.filter(item=>item.brand==brand).map((item,index)=>(
                    <option className='text-xs' value={item.name} key={index}>{item.name}</option>
                ))}
                </select>
                }
                <Input placeholder='total datang' required type='number' onChange={(e)=>setStock(e.target.value)} value={stock}/>
                <button type='submit' className={loading==false?'px-4 py-2 bg-black text-white rounded-xl font-bold tracking-wider w-60':'px-4 py-2 bg-gray-50 rounded-xl font-bold tracking-wider w-60'}>Input</button>
            </form>
        </Layout>
    )
}
export default Incoming