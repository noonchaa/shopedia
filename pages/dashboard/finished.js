import { collection, getDocs } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { db } from "../../utils/firebaseClient"

const Finished = () => {
    const [order, setOrder] = useState([])
    const [orderId, setOrderId] = useState('')

    useEffect(()=>{
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter(item=>item.status=='Selesai'))
        }).catch(()=>{setOrder([])})
        return () => {
            setOrder([])
        }
    },[])
    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Order selesai</h1>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black font-bold tracking-wider capitalize'>
                <select className='pl-4 py-1 focus:outline-none capitalize bg-gray-100 col-span-3' onChange={(e)=>setOrderId(e.target.value)}>
                    <option value=''>Order ID</option>
                    {order.map((item,index)=>(
                        <option value={item.order_id} key={index}>{item.order_id}</option>
                    ))}
                </select>
            </div>
            {orderId==''?
            order.map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto grid grid-cols-3 border border-black'>
                    <div className='px-4 py-2 col-span-3'>
                        <h1 className='text-xl font-medium capitalize'>{item.order_id}</h1>
                        <p className='font-medium'>Detail order :</p>
                        {item.item_details.map((isi,indexIsi)=>(
                            <p className='pl-2 capitalize font-medium text-sm' key={indexIsi}>{isi.name} - {isi.quantity} Unit</p>
                        ))}
                        <p className='font-medium'>Alamat :</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.first_name}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>0{item.shipping_address.phone}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.lengkap}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.desa}, {item.shipping_address.address.kec}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.kab}, {item.shipping_address.address.prov}</p>
                    </div>
                </div>
            ))
            :
            order.filter(item=>item.order_id==orderId).map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto grid grid-cols-3 border border-black'>
                    <div className='px-4 py-2 col-span-3'>
                        <h1 className='text-xl font-medium capitalize'>{item.order_id}</h1>
                        <p className='font-medium'>Detail order :</p>
                        {item.item_details.map((isi,indexIsi)=>(
                            <p className='pl-2 capitalize font-medium text-sm' key={indexIsi}>{isi.name} - {isi.quantity} Unit</p>
                        ))}
                        <p className='font-medium'>Alamat :</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.first_name}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>0{item.shipping_address.phone}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.lengkap}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.desa}, {item.shipping_address.address.kec}</p>
                        <p className='pl-2 capitalize font-medium text-sm'>{item.shipping_address.address.kab}, {item.shipping_address.address.prov}</p>
                    </div>
                </div>
            ))
            }
        </Layout>
    )
}
export default Finished