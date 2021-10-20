import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"

const PendingData = ({data}) => {
    const {order_id,transaction_time,shipping_address,ongkir,item_details,status} = data

    const cekStatus = async () => {
        const res = await fetch('/api/cekPay?id='+order_id)
        const data = await res.json()
        if(data.transaction_status=='capture'||data.transaction_status=='settlement'){
            await updateDoc(doc(db,'order',order_id),{status:'Lunas'})
        } else if(data.transaction_status=='pending'){
            await updateDoc(doc(db,'order',order_id),{status:'Menunggu pembayaran'})
        } else {
            await updateDoc(doc(db,'order',order_id),{status:'Pembayaran gagal'})
        }
    }

    return(
        <div className='bg-white border-2 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 relative'>
            <h2 className="font-semibold tracking-tight text-indigo-600 uppercase overflow-hidden mb-4">
                {order_id}
            </h2>
            <p className="font-semibold tracking-tight overflow-hidden mb-4 dark:text-white capitalize">{status}</p>
            <p className="font-semibold tracking-tight overflow-hidden mb-4 dark:text-white capitalize">{new Date(transaction_time).toLocaleString('ID',{'weekday':'long','day':'2-digit','month':'short','year':'numeric','hour':'2-digit','minute':'2-digit'})} WIB</p>
            <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pengiriman :</p>
            <div className='px-3 mb-4'>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Penerima : {shipping_address.first_name}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Telepon : {shipping_address.phone}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Alamat : {shipping_address.address.lengkap}, {shipping_address.address.type} {shipping_address.address.city_name}, {shipping_address.address.province}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Expedisi : {ongkir.name}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Service : {ongkir.id}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Ongkir : Rp. {Number(ongkir.price).toLocaleString('ID',{'currency':'IDR'})}</p>
                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Resi : </p>
            </div>
            <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pesanan :</p>
            <ul className="list-disc ml-3 mb-10">
                {item_details.map((isi,indexIsi)=>(
                <li className="text-gray-500 dark:text-gray-400" key={indexIsi}>
                    <p>{isi.name} {isi.size.filter(siz=>siz!='').map(siz=>siz.concat(', '))}</p>
                    <p className='italic font-medium'>{isi.quantity} X {isi.price} = Rp. {Number(isi.price*isi.quantity).toLocaleString('ID',{'currency':'IDR'})}</p>
                </li>
                ))}
            </ul>
            <div className='flex justify-center w-1/2 ml-auto border border-gray-900 dark:border-white absolute right-6 bottom-6'>
                <button className='bg-gray-900 text-white w-full flex-none dark:text-gray-900 dark:bg-white' onClick={()=>cekStatus()} >Cek Status</button>
            </div>
        </div>
    )
}
export default PendingData