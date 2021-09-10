import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Admin from '../../components/Admin'
import { UserContext } from '../../components/User'
import { db } from '../../utils/firebaseClient'
import { collection, getDocs, doc, updateDoc, arrayUnion } from '@firebase/firestore'
import Button from "../../components/part/Button"
import Input from "../../components/part/Input"

const Incoming = () => {
    const user = useContext(UserContext)
    const router = useRouter()
    const [opsi, setOpsi] = useState([])
    const [serie, setSerie] = useState([])
    const [series, setSeries] = useState('')
    const [stock, setStock] = useState('')
    const [brand, setBrand] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        async function getBrands() {
            const res = await getDocs(collection(db, "brand"));
            const data = []
            const seri = []
            res.forEach((doc) => {
                data.push(doc.id)
                seri.push(doc.data())
            });
            setOpsi(data)
            setSerie(seri)
        }
        getBrands()
    },[])

    const UpdateStock = async (e) => {
        e.preventDefault()
        if(brand==''){
            alert('Mohon pilih merk laptop')
        }
        if(series==''){
            alert('Mohon pilih serie laptop')
        } else {
        setLoading(true)
        await updateDoc(doc(db,'brand',brand),{
            product : arrayUnion({
                id: series,
                name: series,
                stock: stock
            })
        })
        setLoading(false)
    }
    }

    return(
        <Admin>
            <h1 className='text-center font-semibold text-xl mt-8'>Stock Product Datang</h1>
            <form className='max-w-2xl mx-auto' onSubmit={UpdateStock}>
                <select className='pl-4 my-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-100 capitalize' onChange={(e)=>setBrand(e.target.value)}>
                    <option className='text-xs' value=''>Merk</option>
                {opsi.map((item,index)=>(
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
                {serie.filter(item=>item.id==brand)[0].product.map((item,index)=>(
                    <option className='text-xs' value={item.name} key={index}>{item.name}</option>
                ))}
                </select>
                }
                <Input placeholder='total datang' type='text' change={(e)=>setStock(e.target.value)} value={stock}/>
                <div className='flex justify-end'>
                    <Button type='reset'>Reset</Button>
                    <Button type='submit'>{loading==false?'Submit':'......'}</Button>
                </div>
            </form>
        </Admin>
    )
}
export default Incoming