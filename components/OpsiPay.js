import { doc, getDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebaseClient"
import Card from "./bayar/Card"
import Virtual from "./bayar/Virtual"
import {FaCheck} from 'react-icons/fa'
import Gopay from "./bayar/Gopay"
import Shopee from "./bayar/Shopee"
import Alfa from "./bayar/Alfa"

const OpsiPay = ({user,alamat,cart,ongkir}) => {
    const [payLink, setPayLink] = useState([])
    const [pick, setPick] = useState('')

    useEffect(()=>{
        const getPay = async () => {
            const res = await getDoc(doc(db,'utils','payList'))
            if(res.exists()){
                setPayLink(res.data().payList)
            } else {
                setPayLink([])
            }
        }
        getPay()

        return () => {
            setPayLink([])
        }
    },[])
    
    return(
        <>
        {!cart.length?'':
        <div className='grid grid-cols-2 gap-3 px-3 py-6 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'>
            {payLink.map((item,index)=>(
                <div key={index} className='cursor-pointer bg-gray-300 p-2 rounded-lg relative dark:bg-gray-900' onClick={()=>setPick(item)}>
                    <h1>{item}</h1>
                    {pick==item?<FaCheck className='absolute top-2 right-2'/>:''}
                </div>
            ))}
        </div>}
        <hr className="border-gray-900 dark:border-gray-100 -mx-3"/>
        {pick=='kartu kredit'?
        <Card user={user} alamat={alamat} cart={cart} ongkir={ongkir}/>
        :pick=='virtual akun'?
        <Virtual user={user} alamat={alamat} cart={cart} ongkir={ongkir}/>
        :pick=='go pay'?
        <Gopay user={user} alamat={alamat} cart={cart} ongkir={ongkir}/>
        :pick=='shopee pay'?
        <Shopee user={user} alamat={alamat} cart={cart} ongkir={ongkir}/>
        :pick=='alfamart'?
        <Alfa user={user} alamat={alamat} cart={cart} ongkir={ongkir}/>
        :
        ''
        }
        </>
    )
}
export default OpsiPay