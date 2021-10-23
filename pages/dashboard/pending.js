import { collection, onSnapshot } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import PendingData from "../../components/admin/Pending"
import { db } from "../../utils/firebaseClient"

const Pending = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const unsub = onSnapshot(collection(db,'order'),(doc)=>{
            const data = []
            doc.forEach((isi)=>{
                data.push(isi.data())
            })
            setOrder(data.filter((item)=>item.status == 'Menunggu pembayaran'))
        })
        
        return () => unsub()
    },[])

    return(
        <Admin>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-6'>
                {order.sort((a,b)=>new Date(a.transaction_time)-new Date(b.transaction_time)).map((item,index)=>(
                    <PendingData data={item} key={index}/>
                ))}
            </div>
        </Admin>
    )
}
export default Pending