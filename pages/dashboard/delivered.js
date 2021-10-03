import { collection, doc, getDocs, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { db } from "../../utils/firebaseClient"

const Delivered = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Sampai tujuan'))
        }).catch(()=>setOrder([]))
        return () => {
            setOrder([])
        }
    },[])

    const selesai = async (id) => {
        await updateDoc(doc(db,'orders',id),{status:'Selesai'})
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Sampai tujuan'))
        }).catch(()=>setOrder([]))
    }
    const retur = async (id) => {
        await updateDoc(doc(db,'orders',id),{status:'Batal'})
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Sampai tujuan'))
        }).catch(()=>setOrder([]))
    }

    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Sampai tujuan</h1>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>*Paket telah sampai tujuan, menunggu feedback dari pelanggan</p>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>**Klik selesai apabila tidak ada feedback dari pelanggan</p>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black font-bold tracking-wider capitalize'>
                <p className='py-2'>Order ID</p>
                <p className='border-l border-r border-black py-2'>Status</p>
                <p className='py-2'>Selesai</p>
            </div>
            {order.map((item,index)=>(
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black font-bold tracking-wider capitalize' key={index}>
                <p className='py-2'>{item.order_id}</p>
                <p className='border-l border-r border-black py-2'>{item.status}</p>
                <div className='flex justify-center items-center'>
                    <button className='px-3 rounded-xl bg-black text-white text-sm font-bold py-1 mr-2' onClick={()=>selesai(item.order_id)}>Selesai</button>
                    <button className='px-3 rounded-xl bg-black text-white text-sm font-bold py-1' onClick={()=>retur(item.order_id)}>Return</button>
                </div>
            </div>
            ))}
        </Layout>
    )
}
export default Delivered