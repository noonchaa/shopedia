import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"

const GagalOrder = ({data}) => {
    const {order_id,item_details,status} = data

    const reStock = () => {
        item_details.forEach( async (isi)=>{
            const getstock = await getDoc(doc(db,'product',isi.id))
            const old = getstock.data().stok
            await updateDoc(doc(db,'product',isi.id),{stok:old+isi.quantity})
            await updateDoc(doc(db,'order',order_id),{status:'Cancel'})
        })
    }

    return(
        <div className='bg-white border-2 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 relative'>
            <h2 className="font-semibold tracking-tight text-indigo-600 uppercase overflow-hidden mb-4">
                {order_id}
            </h2>
            <p className="font-semibold tracking-tight overflow-hidden mb-4 dark:text-white capitalize">{status}</p>
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
                <button className='bg-gray-900 text-white w-full flex-none dark:text-gray-900 dark:bg-white' onClick={()=>reStock()} >Restock</button>
            </div>
        </div>
    )
}
export default GagalOrder