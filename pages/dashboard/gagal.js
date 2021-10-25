import { off, onValue } from "@firebase/database"
import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import GagalOrder from "../../components/admin/Gagal"
import { RDB, refRDB } from "../../utils/firebaseClient"

const Gagal = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        onValue(refRDB(RDB,'order'),(snap)=>{
            setOrder(Object.values(snap.val()).filter(item=>item.status=='Pembayaran gagal'))
        })
        
        return () => {
            off(refRDB(RDB,'order'))
        }
    },[])

    return(
        <Admin>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-6 container mx-auto'>
                {order.sort((a,b)=>new Date(a.transaction_time)-new Date(b.transaction_time)).map((item,index)=>(
                    <GagalOrder data={item} key={index}/>
                ))}
            </div>
        </Admin>
    )
}
export default Gagal