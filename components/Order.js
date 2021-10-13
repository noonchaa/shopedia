import { doc, getDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebaseClient"

const Order = ({order}) => {
    const [detail, setDetail] = useState()

    useEffect(()=>{
        const getOrder = async () => {
            const res = await getDoc(doc(db,'order',order))
            if(res.exists()){
                setDetail(res.data())
            }
        }
        getOrder()

        return () => {
            setDetail()
        }
    },[order])

    if(!detail) return <div></div>
    return(
        <div className={!detail?'hidden':'bg-white border-2 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 relative'}>
            <h2 className="font-semibold tracking-tight text-indigo-600 uppercase overflow-hidden mb-4">
                {detail.order_id}
            </h2>
            <p className="font-semibold tracking-tight overflow-hidden mb-4 dark:text-white capitalize">{new Date(detail.transaction_time).toLocaleString('ID',{'weekday':'long','day':'2-digit','month':'short','year':'numeric','hour':'2-digit','minute':'2-digit'})} WIB</p>
            {detail.status=='Lunas'?'':
            <>
            <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pembayaran :</p>
            <div className='px-3 mb-4'>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Tipe : {detail.payment_type.replace(/[_]/g,' ')}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Penyedia : {detail.pay_code.bank}</p>
                {detail.pay_code.bank=='gopay'?
                <>
                    <a href={detail.pay_code.code} target='_blank' rel='noreferrer'>
                        <button className='rounded-lg bg-gray-900 text-white px-3 py-1 my-2'>Buka QR kode</button>
                    </a><br/>
                    <a href={detail.pay_code.code_bayar} target='_blank' rel='noreferrer'>
                        <button className='rounded-lg bg-gray-900 text-white px-3 py-1'>Buka Gojek App</button>
                    </a>
                </>
                :detail.pay_code.bank=='shopeepay'?
                <a href={detail.pay_code.code_bayar} target='_blank' rel='noreferrer'>
                    <button className='rounded-lg bg-gray-900 text-white px-3 py-1 mt-2'>Buka Shopee</button>
                </a>
                :
                <>
                    <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Kode : {detail.pay_code.code}</p>
                    <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Kode bayar : {detail.pay_code.code_bayar}</p>
                </>}
            </div>
            </>
            }
            <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pengiriman :</p>
            <div className='px-3 mb-4'>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Penerima : {detail.shipping_address.first_name}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Telepon : {detail.shipping_address.phone}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Alamat : {detail.shipping_address.address.lengkap}, {detail.shipping_address.address.type} {detail.shipping_address.address.city_name}, {detail.shipping_address.address.province}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Expedisi : {detail.ongkir.name}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Service : {detail.ongkir.id}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Ongkir : Rp. {Number(detail.ongkir.price).toLocaleString('ID',{'currency':'IDR'})}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Resi : {detail.resi}</p>
            </div>
            <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pesanan :</p>
            <ul className="list-disc ml-3 mb-10">
                {detail.item_details.map((isi,indexIsi)=>(
                <li className="text-gray-500 dark:text-gray-400" key={indexIsi}>
                    <p>{isi.name} {isi.size.filter(siz=>siz!='').map(siz=>siz.concat(', '))}</p>
                    <p className='italic font-medium'>{isi.quantity} X {isi.price} = Rp. {Number(isi.price*isi.quantity).toLocaleString('ID',{'currency':'IDR'})}</p>
                </li>
                ))}
            </ul>
                <p className='dark:text-white font-bold text-lg absolute right-6 bottom-6 capitalize'>{detail.status}</p>
        </div>
    )
}
export default Order