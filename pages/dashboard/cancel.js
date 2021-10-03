import { collection, doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HiCheck, HiRefresh } from 'react-icons/hi'
import Layout from '../../components/Layout/Layout'
import { db } from '../../utils/firebaseClient'

const Cancel = () => {
    const router = useRouter()
    const [cancel, setCancel] = useState([])
    const [cancelId, setCancelId] = useState('')

    useEffect(()=>{
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setCancel(data.filter(item=>item.status=='Batal'))
        }).catch(()=>setCancel([]))
        return () => {
            setCancel([])
        }
    },[])

    const cancelOrder = async (order) => {
        await updateDoc(doc(db,'orders',order.order_id),{status:'Proses pengembalian dana'})
        order.item_details.forEach( async (item)=>{
            const stock = await getDoc(doc(db,'stocks',item.name))
            const oldSum = stock.data().stock
            await updateDoc(doc(db,'stocks',item.name),{stock:oldSum+item.quantity})
        })
        const data = []
        getDocs(collection(db,'orders')).then((doc)=>{
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setCancel(data.filter(item=>item.status=='Batal'))
        }).catch(()=>setCancel([]))
    }

    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Order Batal</h1>
            <h1 className='text-right max-w-3xl mx-auto font-bold mb-4 cursor-pointer' onClick={()=>router.reload()}>Refresh <HiRefresh className='inline'/></h1>
            <p className='text-sm font-bold text-gray-700 max-w-3xl mx-auto text-right'>*Klik ok untuk konfirmasi pengembalian dana</p>
            <div className='max-w-3xl mx-auto text-center grid grid-cols-3 border border-black font-bold tracking-wider capitalize'>
                <select className='pl-4 py-1 focus:outline-none capitalize bg-gray-100 col-span-2' onChange={(e)=>setCancelId(e.target.value)}>
                    <option value=''>Order ID</option>
                    {cancel.map((item,index)=>(
                        <option value={item.order_id} key={index}>{item.order_id}</option>
                    ))}
                </select>
                <h1 className='border-l border-black py-2'>Update status</h1>
            </div>
            {cancelId==''?
            cancel.map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto grid grid-cols-3 border border-black'>
                    <div className='px-4 py-2 col-span-2'>
                        <h1 className='text-xl font-medium capitalize'>{item.order_id}</h1>
                        <p className='font-bold'>Rp. {Number(item.gross_amount).toLocaleString('ID',{'currency':'IDR'})}</p>
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
                    <div className='text-center border-l border-black'>
                        <HiCheck className='mx-auto w-6 h-6 my-4 text-green-600 cursor-pointer' onClick={()=>cancelOrder(item)}/>
                    </div>
                </div>
            ))
            :
            cancel.filter(item=>item.order_id==cancelId).map((item,index)=>(
                <div key={index} className='max-w-3xl mx-auto grid grid-cols-3 border border-black'>
                    <div className='px-4 py-2 col-span-2'>
                        <h1 className='text-xl font-medium capitalize'>{item.order_id}</h1>
                        <p className='font-bold'>Rp. {Number(item.gross_amount).toLocaleString('ID',{'currency':'IDR'})}</p>
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
                    <div className='text-center border-l border-black'>
                        <HiCheck className='mx-auto w-6 h-6 my-4 text-green-600 cursor-pointer' onClick={()=>cancelOrder(item)}/>
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
export default Cancel