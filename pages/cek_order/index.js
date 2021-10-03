import { doc, getDoc } from "@firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { HiX } from "react-icons/hi"
import Layout from "../../components/Layout/Layout"
import { db } from "../../utils/firebaseClient"

const CekOrder = () => {
    const router = useRouter()
    const [order, setOrder] = useState('')

    useEffect(()=>{
        getDoc(doc(db,'orders',router.query.id)).then((doc)=>{
            setOrder(doc.data())
        })
    },[router])

    return(
        <Layout>
            {!order?
            <h1 className='text-center mt-16 font-bold tracking-wider text-2xl animate-pulse'>... Loading ...</h1>
            :
            <div className='w-full max-w-md bg-gray-50 border border-black mx-auto md:my-16 rounded-xl p-4 shadow'>
                <HiX className='h-8 w-8 cursor-pointer' onClick={()=>router.back()}/>
                <p className='text-center text-2xl tracking-wider font-bold mb-2'>Shopedia</p>
                <p className='tracking-wider font-medium mb-2'>Order ID : {order.order_id}</p>
                <p className='tracking-wider font-medium mb-2 capitalize'>Pembayaran : {order.payment_type.replace(/[_]/g,' ')}</p>
                <p className='tracking-wider font-medium mb-2 capitalize'>Status : <span className='font-bold tracking-widest'>{order.status}</span></p>
                <p className='tracking-wider font-medium mb-2 capitalize'>pengiriman :</p>
                <div className='mx-4'>
                    <p className='tracking-wider font-medium mb-2 capitalize'>penerima : {order.shipping_address.first_name}</p>
                    <p className='tracking-wider font-medium mb-2 capitalize'>Telpon : 0{order.shipping_address.phone}</p>
                    <p className='tracking-wider font-medium mb-2 capitalize'>Alamat : </p>
                    <p className='tracking-wider font-medium mb-2 capitalize'>{order.shipping_address.address.lengkap}, {order.shipping_address.address.type} {order.shipping_address.address.city_name}, {order.shipping_address.address.province}, {order.shipping_address.address.postal_code}</p>
                </div>
                <p className='tracking-wider font-medium mb-2 capitalize'>Pesanan :</p>
                {order.item_details.map((item,index)=>(
                    <div className='mx-4 mb-4 border-b border-gray-400' key={index}>
                        <p className='tracking-wider font-medium mb-2 capitalize'>Nama : {item.name}</p>
                        <p className='tracking-wider font-medium mb-2 capitalize'>Jumlah : {item.quantity}</p>
                        <p className='tracking-wider font-medium mb-2 capitalize'>Harga : Rp. {Number(item.price).toLocaleString('ID',{'currency':'IDR'})}</p>
                    </div>
                ))}
                <p className='font-medium mb-2'>Kurir :</p>
                <p className='font-medium mb-2 ml-4'>Nama expedisi : <span className='italic uppercase'>{order.ongkir.expedisi}</span> </p>
                <p className='font-medium mb-2 ml-4'>Service : <span className='italic uppercase'>{order.ongkir.service}</span> </p>
                <p className='font-medium mb-2 ml-4'>Ongkir : <span className='italic uppercase'>Rp. {Number(order.ongkir.biaya).toLocaleString('ID',{'currency':'IDR'})}</span> </p>
                <p className='font-medium mb-2 ml-4'>Resi pengiriman : <span className='italic uppercase'>{order.ongkir.resi}</span> </p>
                <p className='tracking-wider font-medium mb-2'>Total : Rp. {Number(order.gross_amount).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            }
        </Layout>
    )
}
export default CekOrder