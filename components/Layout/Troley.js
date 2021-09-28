import { arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore"
import { useState } from "react"
import { db } from "../../utils/firebaseClient"
import { AuthUser } from "../User"

const Troley = ({namaProduct,harga}) => {
    const user = AuthUser()
    const [text, setText] = useState('Tambah ke keranjang')

    const addToCart = async () => {
        setText('Loading')
        if(!user){
            setText('Silahkan Login untuk belanja')
            setTimeout(()=>{setText('Tambah ke keranjang')},3000)
            return
        }
        if(user.displayName=='admin'){
            setText('You are admin')
            setTimeout(()=>{setText('Tambah ke keranjang')},3000)
            return
        }
        const res = await getDoc(doc(db,'stocks',namaProduct))
        if(res.exists()){
            if(res.data().stock == 0) {
                setText('Stock Habis')
                setTimeout(()=>{setText('Tambah ke keranjang')},3000)
            } else {
                const userData = await getDoc(doc(db,'user',user.uid))
                if(userData.exists()){
                    const cekCart = userData.data().cart.filter(item=>item.name==namaProduct)
                    if(!cekCart.length){
                        updateDoc(doc(db,'user',user.uid),{
                            cart: arrayUnion({
                                name: namaProduct,
                                price: harga,
                                sum: 1
                            })
                        })
                        setTimeout(()=>{setText('Tambah ke keranjang')},3000)
                    } else {
                        const cart = userData.data().cart
                        const indexItem = cart.findIndex((item)=>item.name==namaProduct)
                        const oldSum = cekCart[0].sum
                        cart.splice(indexItem,1,{
                            name: namaProduct,
                            price: harga,
                            sum: oldSum+1
                        })
                        updateDoc(doc(db,'user',user.uid),{
                            cart: cart
                        })
                        setTimeout(()=>{setText('Tambah ke keranjang')},3000)
                    }
                } else {
                    setText('Stock Habis')
                    setTimeout(()=>{setText('Tambah ke keranjang')},3000)
                }
            }
        } else {
            setText('Stock Habis')
            setTimeout(()=>{setText('Tambah ke keranjang')},3000)
        }
    }

    return(
        <button className='px-4 py-2 bg-black text-white rounded-xl font-bold tracking-wider' onClick={addToCart} >
            <h1 className='font-bold tracking-wider capitalize text-sm'>{text}</h1>
        </button>
    )
}
export default Troley