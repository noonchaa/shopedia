import { collection, doc, getDocs, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { db } from "../../utils/firebaseClient"

const Packing = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Packing'))
        }).catch(()=>setOrder([]))
        return () => {
            setOrder([])
        }
    },[])

    const upAWB = async (e) => {
        e.preventDefault()
        await updateDoc(doc(db,'orders',e.target.order_id.value),{status:'Dalam pengiriman',resi:{nomor:e.target.resi.value,expedisi:e.target.exp.value}})
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Packing'))
        }).catch(()=>setOrder([]))
    }

    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Selesai Packing</h1>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>*Mohon masukan satu nomor resi dan expedisi kemudian klik update</p>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-4 border border-black font-bold tracking-wider capitalize'>
                <p className='py-2'>Order ID</p>
                <p className='border-l border-r border-black py-2'>Nomor Resi</p>
                <p className='border-r border-black py-2'>Expedisi</p>
                <p className='py-2'>Update</p>
            </div>
            {order.map((item,index)=>(
            <div className='max-w-3xl mx-auto text-center grid grid-cols-4 border border-black font-bold tracking-wider capitalize' key={index}>
                <p className='py-2'>{item.order_id}</p>
                <form className='grid grid-cols-3 col-span-3' onSubmit={upAWB}>
                <input type='text' id='order_id' defaultValue={item.order_id} className='hidden'/>
                <input type='text' id='resi' placeholder='Nomor Resi' className='bg-gray-100 ring-black ring-1 px-3'/>
                <input type='text' id='exp' placeholder='Expedisi' className='bg-gray-100 ring-black ring-1 px-3'/>
                <div className='flex justify-center items-center'>
                    <button type='submit' className='px-3 rounded-xl bg-black text-white text-sm font-bold py-1'>Update</button>
                </div>
                </form>
            </div>
            ))}
        </Layout>
    )
}
export default Packing