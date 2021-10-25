import { off, onValue } from "@firebase/database"
import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import Order from "../../components/admin/Order"
import Print from "../../components/admin/Print"
import { RDB, refRDB } from "../../utils/firebaseClient"

const Lunas = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        onValue(refRDB(RDB,'order'),(snap)=>{
            setOrder(Object.values(snap.val()).filter(item=>item.status=='Lunas'))
        })
        
        return () => {
            off(refRDB(RDB,'order'))
        }
    },[])

    return(
        <Admin>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-6 container mx-auto'>
                {order.sort((a,b)=>new Date(a.transaction_time)-new Date(b.transaction_time)).map((item,index)=>(
                    <Order data={item} key={index}/>
                ))}
            </div>
            <Print/>
        </Admin>
    )
}
export default Lunas