import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { db } from "../../utils/firebaseClient"

const CartItem = ({name,price,sum,user}) => {
    const [stat, setStat] = useState(false)
    const [fail, setFail] = useState('')
    const router = useRouter()
    
    const cartHandler = async (name,sum,op) => {
        setFail('')
        const res = await getDoc(doc(db,'stocks',name))
        if(res.exists()){
            if(sum == 1) {
                if(op=='add'){
                    await updateDoc(doc(db,user,name),{sum: sum + 1}).catch(()=>setFail('error'))
                } else {
                    await deleteDoc(doc(db,user,name))
                }
                return
            }
            if(sum < res.data().stock){
                if(op=='add'){
                    await updateDoc(doc(db,user,name),{sum: sum + 1}).catch(()=>setFail('error'))
                } else {
                    await updateDoc(doc(db,user,name),{sum: sum - 1}).catch(()=>setFail('error'))
                }
                return
            }
            if(sum == res.data().stock){
                if(op=='add'){
                    setStat(true)
                } else {
                    await updateDoc(doc(db,user,name),{sum: sum - 1}).catch(()=>setFail('error'))
                    setStat(false)
                }
            }
            if(sum > res.data().stock){
                if(op=='add'){
                    setStat(true)
                } else {
                    await updateDoc(doc(db,user,name),{sum: sum - 1}).catch(()=>setFail('error'))
                }
                return
            }
        } else {
            setFail('error')
        }
    }
    if(fail!='') return <p onClick={()=>router.reload()} className='mb-1 capitalize font-medium'>Server error, <span className='text-green-600'>klik disini</span></p>

    return(
        <div className='grid grid-cols-2 border-b border-gray-700'>
            <div>
                <p className='mb-1 capitalize font-medium'>{name}</p>
                <div className='font-medium mb-2 ring-1 ring-green-600 rounded-md w-max'>
                    <button className='bg-green-600 px-2 rounded-l-md font-bold mr-2' onClick={()=>cartHandler(name,sum,'min')}>
                        -
                    </button>
                    <p className='inline'>{sum}</p>
                    <button className='bg-green-600 px-2 rounded-r-md font-bold ml-2 disabled:bg-gray-100' disabled={stat} onClick={()=>cartHandler(name,sum,'add')}>
                        +
                    </button>
                </div>
            </div>
            <p className='font-medium mb-2'>Rp. {Number(price*sum).toLocaleString('ID',{'currency':'IDR'})}</p>
        </div>
    )
}
export default CartItem