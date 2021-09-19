import { useEffect, useState } from 'react'
import { db } from '../../utils/firebaseClient'
import { collection, getDocs, doc, updateDoc } from '@firebase/firestore'
import Button from "../../components/part/Button"
import Input from "../../components/part/Input"
import Layout from '../../components/Layout'

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
            stock: Number(stock) + Number(products.filter(item=>item.brand==brand).map(item=>item.stock))
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
                <select className='pl-4 my-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-100 capitalize' onChange={(e)=>setBrand(e.target.value)}>
                    <option className='text-xs' value=''>Products</option>
                {products.map(item=>item.brand).filter((item,index,self)=>self.indexOf(item)===index).map((item,index)=>(
                    <option className='text-xs' key={index} value={item}>{item}</option>
                ))}
                </select><br/>
                {brand==''?
                <select className='pl-4 my-2 focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-100 capitalize'>
                    <option className='text-xs' value=''>Series</option>
                </select>
                :
                <select className='pl-4 my-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-100 capitalize' onChange={(e)=>setSeries(e.target.value)}>
                    <option className='text-xs' value=''>Series</option>
                {products.filter(item=>item.brand==brand).map((item,index)=>(
                    <option className='text-xs' value={item.name} key={index}>{item.name}</option>
                ))}
                </select>
                }
                <Input placeholder='total datang' type='text' change={(e)=>setStock(e.target.value)} value={stock}/>
                <div className='flex justify-end'>
                    <Button type='submit'>{loading==false?'Submit':'......'}</Button>
                </div>
            </form>
        </Layout>
    )
}
export default Incoming