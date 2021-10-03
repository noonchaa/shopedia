import { collection, doc, getDocs, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { db } from "../../utils/firebaseClient"

const Delivery = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Dalam pengiriman'))
        }).catch(()=>setOrder([]))
        return () => {
            setOrder([])
        }
    },[])

    const sampai = async (id) => {
        await updateDoc(doc(db,'orders',id),{status:'Sampai tujuan'})
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Dalam pengiriman'))
        }).catch(()=>setOrder([]))
    }
    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Dalam pengiriman</h1>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>*Cek status pengiriman di web resmi expedisi</p>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>**Klik Sampai apabila paket telah sampai ke tujuan</p>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-4 border border-black font-bold tracking-wider capitalize'>
                <p className='py-2'>Order ID</p>
                <p className='border-l border-r border-black py-2'>Nomor Resi</p>
                <p className='border-r border-black py-2'>Expedisi</p>
                <p className='py-2'>Sampai</p>
            </div>
            {order.map((item,index)=>(
            <div className='max-w-3xl mx-auto text-center grid grid-cols-4 border border-black font-bold tracking-wider capitalize' key={index}>
                <p className='py-2'>{item.order_id}</p>
                <p className='border-l border-r border-black py-2'>{item.resi.nomor}</p>
                <p className='border-r border-black py-2'>{item.resi.expedisi}</p>
                <div className='flex justify-center items-center'>
                    <button className='px-3 rounded-xl bg-black text-white text-sm font-bold py-1' onClick={()=>sampai(item.order_id)}>Sampai</button>
                </div>
            </div>
            ))}
        </Layout>
    )
}
export default Delivery