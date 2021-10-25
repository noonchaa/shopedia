import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa"
import {BiRefresh} from 'react-icons/bi'
import { db, RDB, refRDB } from "../utils/firebaseClient"
import { get } from "@firebase/database"

const CartOp = ({user,item}) => {
    const [stat, setStat] = useState(false)
    const [fail, setFail] = useState('')
    const router = useRouter()
    const {foto,harga,id,nama,qty,size,warna,berat} = item
    
    const cartHandler = async (op) => {
        setFail('')
        let stok = 0
        await get(refRDB(RDB,'product/'+id)).then((snap)=>{
            stok = snap.val().stok
        })
        const userData = await getDoc(doc(db,'users',user.uid))
        const cart = userData.data().cart
        const cekCart = cart.filter(item=>item.id==id)
        const indexItem = cart.findIndex((item)=>item.id==id)
        const oldSum = cekCart[0].qty
        if(qty==1){
            if(op=='min'){
                cart.splice(indexItem,1)
                await updateDoc(doc(db,'users',user.uid),{cart: cart})
            } else {
                size.unshift(size[0])
                cart.splice(indexItem,1,{
                    foto: foto,
                    harga: harga,
                    id: id,
                    nama: nama,
                    qty: oldSum+1,
                    size : size,
                    warna: warna,
                    berat: berat
                })
                await updateDoc(doc(db,'users',user.uid),{cart: cart})
            }
            return
        }
        if(qty < stok){
            if(op=='min'){
                size.shift()
                cart.splice(indexItem,1,{
                    foto: foto,
                    harga: harga,
                    id: id,
                    nama: nama,
                    qty: oldSum-1,
                    size : size,
                    warna: warna,
                    berat: berat
                })
                await updateDoc(doc(db,'users',user.uid),{cart: cart})
            } else {
                size.unshift(size[0])
                cart.splice(indexItem,1,{
                    foto: foto,
                    harga: harga,
                    id: id,
                    nama: nama,
                    qty: oldSum+1,
                    size : size,
                    warna: warna,
                    berat: berat
                })
                await updateDoc(doc(db,'users',user.uid),{cart: cart}) 
            }
            return
        }
        if(qty == stok){
            if(op=='min'){
                size.shift()
                cart.splice(indexItem,1,{
                    foto: foto,
                    harga: harga,
                    id: id,
                    nama: nama,
                    qty: oldSum-1,
                    size : size,
                    warna: warna,
                    berat: berat
                })
                await updateDoc(doc(db,'users',user.uid),{cart: cart})
                setStat(false)
            } else {
                setStat(true)
            }
            return
        }
        if(qty > stok){
            if(op=='min'){
                size.shift()
                cart.splice(indexItem,1,{
                    foto: foto,
                    harga: harga,
                    id: id,
                    nama: nama,
                    qty: oldSum-1,
                    size : size,
                    warna: warna,
                    berat: berat
                })
                await updateDoc(doc(db,'users',user.uid),{cart: cart})
                setStat(false)
            } else {
                setStat(true)
            }
            return
        }
    }

    if(fail!='') return <p onClick={()=>router.reload()} className='text-sm font-semibold px-2 cursor-pointer'>Error <span className='inline-block animate-spin'><BiRefresh/></span></p>

    return(
        <div className='text-right flex justify-end'>
            <button onClick={()=>cartHandler('min')}>
                <FaMinusCircle className='h-6 w-6 cursor-pointer'/>
            </button>
            <p className='text-sm font-semibold px-2'>{qty}</p>
            <button disabled={stat} onClick={()=>cartHandler('plus')}>
                <FaPlusCircle className={stat==false?'w-6 h-6 cursor-pointer':'w-6 h-6 cursor-not-allowed'}/>
            </button>
        </div>
    )
}
export default CartOp