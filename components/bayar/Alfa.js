import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { db } from "../../utils/firebaseClient"

const Alfa = ({user,alamat,cart,ongkir}) => {
    const [loading, setLoading] = useState('Konfirmasi')
    const uniqueNumber = new Date().getTime()
    const [pay, setPay] = useState('')
    const router = useRouter()
    
    let params = {
        payment_type:'cstore',
        transaction_details: {
            order_id: user.uid.slice(0,6) + '_' + uniqueNumber.toString(),
            gross_amount: Number(cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0))+Number(ongkir.cost)
        },
        cstore: {
            store: 'alfamart',
            alfamart_free_text_1: 'Terima kasih telah berbelanja di toko kami'
        },
        item_details: cart.map(item=>({
            name: item.nama,
            price: item.harga,
            quantity: item.qty,
            id: item.id,
            size: item.size
        })).concat({
            name: ongkir.exp,
            price: Number(ongkir.cost),
            quantity: 1,
            id: ongkir.service
        }),
        customer_details: {
            first_name:alamat.nama,
            phone: alamat.phone,
            address: alamat
        },
        shipping_address: {
            first_name:alamat.nama,
            phone: alamat.phone,
            address: alamat
        }
    }
    const orderData = {
        payment_type:'cstore',
        order_id: user.uid.slice(0,6) + '_' + uniqueNumber.toString(),
        gross_amount: Number(cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0))+Number(ongkir.cost),
        item_details: cart.map(item=>({
            name: item.nama,
            price: item.harga,
            quantity: item.qty,
            id: item.id,
            size: item.size
        })),
        ongkir:{
            name: ongkir.exp,
            price: Number(ongkir.cost),
            id: ongkir.service
        },
        shipping_address: {
            first_name:alamat.nama,
            phone: alamat.phone,
            address: alamat
        },
        status: '',
        transaction_time:'',
        resi:'',
        pay_code: {bank:'',code:'',code_bayar:''}
    }

    const payNow = async () => {
        setLoading('Loading')
        const res = await fetch('/api/midPay',{
            method:'POST',
            body: JSON.stringify(params)
        })
        const data = await res.json()
        orderData.status= await data.transaction_status
        orderData.transaction_time= await data.transaction_time
        orderData.pay_code.bank= data.store
        orderData.pay_code.code_bayar= data.payment_code
        await setDoc(doc(db,'order',orderData.order_id),orderData)
        orderData.item_details.forEach( async (item)=>{
          const getStocks = await getDoc(doc(db,'product',item.id))
            if(getStocks.exists()){
              await updateDoc(doc(db,'product',item.id),{stok:getStocks.data().stok - item.quantity})
            }
        })
        await updateDoc(doc(db,'users',user.uid),{order:arrayUnion(orderData),cart:[]})
        setPay(orderData.pay_code.code_bayar)
        setTimeout(()=>{router.push('/status?id='+data.order_id)},4000)
    }
    return(
        <div className='px-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'>
            {pay==''?'':
            <div className='px-3 dark:text-white capitalize font-bold pb-3'>
                <p>Bank : AlfaMart</p>
                <p>Nomor Virtual akun : {pay}</p>
                <p className='text-sm italic'>**Mohon lakukan pembayaran sebelum 1X24 jam</p>
            </div>
            }
            {pay!=''?'':
            <div className="text-sm text-white capitalize bg-gray-900 text-center -mx-3">
                <button className='py-3 w-full' onClick={()=>payNow()}>{loading}</button>
            </div>
            }
        </div>
    )
}
export default Alfa