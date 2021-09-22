import { useContext, useState } from "react"
import { oneDoc, upDoc } from "../../utils/firebaseHandler"
import { UserContext } from "../User"

const Troley = ({namaProduct,harga}) => {
    const user = useContext(UserContext)
    const [text, setText] = useState('Tambah ke keranjang')

    const addToCart = () => {
        setText('Loading')
        if(!user){
            setText('Silahkan Login untuk belanja')
            setTimeout(()=>{setText('Tambah ke keranjang')},3000)
        } else if(user.displayName=='admin'){
            setText('You are admin')
            setTimeout(()=>{setText('Tambah ke keranjang')},3000)
        } else {
            const getCart = async () => {
                const data = []
                await oneDoc('users',user.displayName.toLowerCase(),data)
                const cartArray = data[0].cart
                const findProduct = cartArray.findIndex((item)=>item.name==namaProduct)
                if(findProduct==-1){
                    cartArray.push({
                        name:namaProduct,
                        price: harga,
                        sum: 1
                    })
                    await upDoc('users',user.displayName.toLowerCase(),{cart:cartArray})
                } else {
                    const oldSum = cartArray[findProduct].sum
                    cartArray.splice(findProduct,1,{
                        name: namaProduct,
                        price: harga,
                        sum: oldSum+1
                    })
                    await upDoc('users',user.displayName.toLowerCase(),{cart:cartArray})
                }
                setTimeout(()=>{setText('Tambah ke keranjang')},1000)
            }
            getCart()
        }
    }

    return(
        <button className='p-2 bg-gray-50 bg-opacity-50 rounded-md shadow-md' onClick={addToCart} >
            <h1 className='font-bold tracking-wider capitalize text-green-600 text-sm'>{text}</h1>
        </button>
    )
}
export default Troley