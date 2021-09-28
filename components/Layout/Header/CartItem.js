import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi"
import { db } from "../../../utils/firebaseClient"

const CartItem = ({name,price,sum,user}) => {
    const [stat, setStat] = useState(false)
    const [fail, setFail] = useState('')
    const router = useRouter()
    
    const cartHandler = async (name,sum,op) => {
        setFail('')
        const res = await getDoc(doc(db,'stocks',name))
        const userData = await getDoc(doc(db,'user',user.uid))
        const cart = userData.data().cart
        const cekCart = cart.filter(item=>item.name==name)
        const indexItem = cart.findIndex((item)=>item.name==name)
        const oldSum = cekCart[0].sum
        if(res.exists()){
            if(sum == 1) {
                if(op=='add'){
                    cart.splice(indexItem,1,{
                        name: name,
                        price: price,
                        sum: oldSum+1
                    })
                    await updateDoc(doc(db,'user',user.uid),{
                        cart: cart
                    })
                } else {
                    cart.splice(indexItem,1)
                    await updateDoc(doc(db,'user',user.uid),{
                        cart: cart
                    })
                }
                return
            }
            if(sum < res.data().stock){
                if(op=='add'){
                    cart.splice(indexItem,1,{
                        name: name,
                        price: price,
                        sum: oldSum+1
                    })
                    await updateDoc(doc(db,'user',user.uid),{
                        cart: cart
                    })
                } else {
                    cart.splice(indexItem,1,{
                        name: name,
                        price: price,
                        sum: oldSum-1
                    })
                    await updateDoc(doc(db,'user',user.uid),{
                        cart: cart
                    })
                }
                return
            }
            if(sum == res.data().stock){
                if(op=='add'){
                    setStat(true)
                } else {
                    cart.splice(indexItem,1,{
                        name: name,
                        price: price,
                        sum: oldSum-1
                    })
                    await updateDoc(doc(db,'user',user.uid),{
                        cart: cart
                    })
                    setStat(false)
                }
            }
            if(sum > res.data().stock){
                if(op=='add'){
                    setStat(true)
                } else {
                    cart.splice(indexItem,1,{
                        name: name,
                        price: price,
                        sum: oldSum-1
                    })
                    await updateDoc(doc(db,'user',user.uid),{
                        cart: cart
                    })
                }
                return
            }
        } else {
            setFail('error')
        }
    }
    if(fail!='') return <p onClick={()=>router.reload()} className='mb-1 capitalize font-medium'>Server error, <span className='text-green-600'>klik disini</span></p>

    return(
        <div className='grid grid-cols-3 gap-4 mt-4'>
            <div className='col-span-2'>
                <p className='font-bold capitalize'>{name}</p>
                <p className='font-bold text-xs capitalize'>Rp. {Number(price*sum).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <div className='flex justify-end items-end'>
                <button  onClick={()=>cartHandler(name,sum,'min')}>
                    <HiMinusCircle className='h-7 w-7'/>
                </button>
                <p className='mx-1 font-bold'>{sum}</p>
                <button disabled={stat} onClick={()=>cartHandler(name,sum,'add')}>
                    <HiPlusCircle className={stat==true?'h-7 w-7 text-white':'h-7 w-7'}/>
                </button>
            </div>
        </div>
    )
}
export default CartItem