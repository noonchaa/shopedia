import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"

const PackingData = ({data}) => {
    const {order_id,transaction_time,shipping_address,ongkir,item_details} = data
    const resi = async (e) => {
        e.preventDefault()
        await updateDoc(doc(db,'order',order_id),{status:'Delivery',resi:e.target.resi.value})
        e.target.reset()
    }
    return(
        <div className='bg-white border-2 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 relative'>
            <h2 className="font-semibold tracking-tight text-indigo-600 uppercase overflow-hidden mb-4">
                {order_id}
            </h2>
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
            <form onSubmit={resi}>
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="text" placeholder="Nomor Resi" aria-label="Nomor Resi" id="resi" required />
                </div>
    
                <div className="flex items-center justify-between mt-4">
                    <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">Update Resi</button>
                </div>
            </form>
        </div>
    )
}
export default PackingData