import { collection, onSnapshot } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import FinishData from "../../components/admin/Finish"
import { db } from "../../utils/firebaseClient"

const Finish = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const getOrder = async () => {
            onSnapshot(collection(db,'order'),(doc)=>{
                const fav = []
                doc.forEach((isi)=>{
                    fav.push(isi.data())
                })
                setOrder(fav.filter((item)=>item.status == 'Finish'))
            })
        }
        getOrder()
        
        return () => {
            getOrder()
            setOrder([])
        }
    },[])

    return(
        <Admin>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-6'>
                {order.sort((a,b)=>new Date(a.transaction_time)-new Date(b.transaction_time)).map((item,index)=>(
                    <FinishData data={item} key={index}/>
                ))}
            </div>
        </Admin>
    )
}
export default Finish