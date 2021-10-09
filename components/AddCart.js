import { arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore"
import { useState } from "react"
import { db } from "../utils/firebaseClient"
import { AuthUser } from "./User"

const AddCart = ({dark,id,harga,nama,size,warna,foto,berat}) => {
    const user = AuthUser()
    const [text, setText] = useState('Keranjang')

    const updateCart = async () => {
        if(!user){
            setText('Silahkan Login')
            setTimeout(()=>{setText('Keranjang')},2000)
        } else {
            const stock = await getDoc(doc(db,'product',id))
            if(stock.data().stok==0){
                setText('Stok Habis')
                setTimeout(()=>{setText('Keranjang')},2000)
            } else {
                setText('Loading')
                const userData = await getDoc(doc(db,'users',user.uid))
                const cekCart = userData.data().cart.filter(item=>item.id==id)
                if(!cekCart.length){
                    updateDoc(doc(db,'users',user.uid),{
                        cart: arrayUnion({
                            nama: nama,
                            id: id,
                            harga: harga,
                            qty: 1,
                            size: [size],
                            warna: warna,
                            foto: foto,
                            berat: berat
                        })
                    })
                    setTimeout(()=>{setText('Keranjang')},500)
                } else {
                    const cart = userData.data().cart
                    const indexItem = cart.findIndex((item)=>item.id==id)
                    const oldQty = cekCart[0].qty
                    const oldSize = cekCart[0].size
                    oldSize.splice(0,0,size)
                    cart.splice(indexItem,1,{
                        nama: nama,
                        id: id,
                        harga: harga,
                        qty: oldQty+1,
                        size: oldSize,
                        warna: warna,
                        foto: foto,
                        berat: berat
                    })
                    updateDoc(doc(db,'users',user.uid),{
                        cart: cart
                    })
                    setTimeout(()=>{setText('Keranjang')},500)
                }
            }
        }
        
    }
    return(
        <button
            className={dark?"px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 dark:bg-white rounded hover:bg-gray-700 dark:hover:bg-gray-100 focus:bg-gray-700 dark:focus:bg-gray-100 dark:text-gray-900 focus:outline-none":"px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"}
            onClick={()=>updateCart()}
            >
            {text}
        </button>
    )
}
export default AddCart