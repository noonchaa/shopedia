import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore"
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
                const cekCart = await getDoc(doc(db,user.uid,namaProduct))
                if(cekCart.exists()){
                    await updateDoc(doc(db,user.uid,namaProduct),{sum: cekCart.data().sum + 1})
                    setTimeout(()=>{setText('Tambah ke keranjang')},3000)
                } else {
                    setDoc(doc(db,user.uid,namaProduct),{
                        name: namaProduct,
                        price: harga,
                        sum: 1
                    })
                    setTimeout(()=>{setText('Tambah ke keranjang')},3000)
                }
            }
        }
    }

    return(
        <button className='px-4 py-2 bg-black text-white rounded-xl font-bold tracking-wider' onClick={addToCart} >
            <h1 className='font-bold tracking-wider capitalize text-sm'>{text}</h1>
        </button>
    )
}
export default Troley