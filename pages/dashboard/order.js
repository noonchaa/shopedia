import { collection, doc, getDocs, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { HiCheck, HiRefresh, HiX } from "react-icons/hi"
import Layout from "../../components/Layout/Layout"
import { db } from "../../utils/firebaseClient"

const Order = () => {
    const [order, setOrder] = useState([])
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data)
        }).catch(()=>{setOrder([])})
        return () => {
            setOrder([])
        }
    },[])

    const cekOrderStatus = () => {
        setLoading(true)
        order.forEach( async (item)=>{
            if(item.status=='pending'){
                const status = await fetch('/api/cekPay?id='+item.order_id)
                const statusData = await status.json()
                if(statusData.transaction_status=='pending'){
                    updateDoc(doc(db,'orders',statusData.order_id),{status:'Menunggu pembayaran'})
                }
                if(statusData.transaction_status=='capture'||statusData.transaction_status=='settlement'){
                    updateDoc(doc(db,'orders',statusData.order_id),{status:'Lunas'})
                }
                if(statusData.transaction_status=='deny'||statusData.transaction_status=='cancel'||statusData.transaction_status=='expire'||statusData.transaction_status=='failure'){
                    updateDoc(doc(db,'orders',statusData.order_id),{status:'Batal'})
                }
            }
            if(item.status=='capture'||item.status=='settlement'){
                const status = await fetch('/api/cekPay?id='+item.order_id)
                const statusData = await status.json()
                if(statusData.transaction_status=='capture'||statusData.transaction_status=='settlement'){
                    updateDoc(doc(db,'orders',statusData.order_id),{status:'Lunas'})
                }
                if(statusData.transaction_status=='deny'||statusData.transaction_status=='cancel'||statusData.transaction_status=='expire'||statusData.transaction_status=='failure'){
                    updateDoc(doc(db,'orders',statusData.order_id),{status:'Batal'})
                }
            }
            if(item.status=='deny'||item.status=='cancel'||item.status=='expire'||item.status=='failure'){
                const status = await fetch('/api/cekPay?id='+item.order_id)
                const statusData = await status.json()
                if(statusData.transaction_status=='deny'||statusData.transaction_status=='cancel'||statusData.transaction_status=='expire'||statusData.transaction_status=='failure'){
                    updateDoc(doc(db,'orders',statusData.order_id),{status:'Batal'})
                }
            }
            
        })
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data)
        }).catch(()=>{setOrder([])})
        setLoading(false)
    }

    const setPacking = async (idOrder) => {
        await updateDoc(doc(db,'orders',idOrder),{status:'Packing'})
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data)
        }).catch(()=>{setOrder([])})
    }

    const cancelOrder = async (idOrder) => {
        await updateDoc(doc(db,'orders',idOrder),{status:'Batal'})
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data)
        }).catch(()=>{setOrder([])})
    }

    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Pesanan Baru</h1>
            <h1 className='text-right max-w-3xl mx-auto font-bold mb-4 cursor-pointer' onClick={cekOrderStatus} >{loading==false?'Refresh Order':'Loading'} <HiRefresh className='inline'/></h1>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>*Klik ok jika order telah selesai packing</p>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>**Klik X jika stock aktual tidak cukup</p>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black font-bold tracking-wider capitalize'>
                <select className='pl-4 py-1 focus:outline-none capitalize bg-gray-100 col-span-2' onChange={(e)=>setOrderId(e.target.value)}>
                    <option value=''>Order ID</option>
                    {order.filter(item=>item.status=='Lunas').map((item,index)=>(
                        <option value={item.order_id} key={index}>{item.order_id}</option>
                    ))}
                </select>
                <h1 className='border-l border-black py-2'>Update status</h1>
            </div>
            {orderId==''?
            order.filter(item=>item.status=='Lunas').map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto grid grid-cols-3 border border-black'>
                    <div className='px-4 py-2 col-span-2'>
                        <h1 className='text-xl font-medium capitalize'>{item.order_id}</h1>
                        <p className='font-medium'>Detail order :</p>
                        {item.item_details.map((isi,indexIsi)=>(
                            <p className='pl-2 capitalize font-medium text-sm' key={indexIsi}>{isi.name} - {isi.quantity} Unit</p>
                        ))}
                        <p className='font-medium'>Alamat :</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.first_name}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>0{item.shipping_address.phone}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.lengkap}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.type} {item.shipping_address.address.city_name}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.province}, {item.shipping_address.address.postal_code}</p>
                    </div>
                    <div className='text-center border-l border-black'>
                        <HiCheck className='mx-auto w-6 h-6 my-4 text-green-600 cursor-pointer' onClick={()=>setPacking(item.order_id)}/>
                        <HiX className='mx-auto w-6 h-6 my-4 text-red-600 cursor-pointer' onClick={()=>cancelOrder(item.order_id)}/>
                    </div>
                </div>
            ))
            :
            order.filter(item=>item.order_id==orderId).map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto grid grid-cols-3 border border-black'>
                    <div className='px-4 py-2 col-span-2'>
                        <h1 className='text-xl font-medium capitalize'>{item.order_id}</h1>
                        <p className='font-medium'>Detail order :</p>
                        {item.item_details.map((isi,indexIsi)=>(
                            <p className='pl-2 capitalize font-medium text-sm' key={indexIsi}>{isi.name} - {isi.quantity} Unit</p>
                        ))}
                        <p className='font-medium'>Alamat :</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.first_name}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>0{item.shipping_address.phone}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.lengkap}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.type} {item.shipping_address.address.city_name}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.province}, {item.shipping_address.address.postal_code}</p>
                    </div>
                    <div className='text-center border-l border-black'>
                        <HiCheck className='mx-auto w-6 h-6 my-4 text-green-600 cursor-pointer' onClick={()=>setPacking(item.order_id)}/>
                        <HiX className='mx-auto w-6 h-6 my-4 text-red-600 cursor-pointer' onClick={()=>cancelOrder(item.order_id)}/>
                    </div>
                </div>
            ))
            }
            <div className='max-w-3xl mx-auto text-right px-4 mt-8'>
                <button type='button' className='py-2 px-4 bg-black text-white rounded-xl font-medium tracking-wider' onClick={()=>window.print()}>Print</button>
            </div>
        </Layout>
    )
}
export default Order