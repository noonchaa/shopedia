import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore"
import { useState } from "react"
import { db } from "../../utils/firebaseClient"

const Shopee = ({user,alamat,cart,ongkir}) => {
    const [loading, setLoading] = useState('Konfirmasi')
    const uniqueNumber = new Date().getTime()
    const [pay, setPay] = useState('')
    
    let params = {
        payment_type:'shopeepay',
        transaction_details: {
            order_id: user.uid.slice(0,6) + '_' + uniqueNumber.toString(),
            gross_amount: Number(cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0))+Number(ongkir.cost)
        },
        shopeepay: {
            callback_url: window.location.origin+'/status?id='+user.uid.slice(0,6) + '_' + uniqueNumber.toString()
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
        payment_type:'shopeepay',
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
        orderData.transaction_time= await data.transaction_time
        orderData.pay_code.bank= data.payment_type
        orderData.pay_code.code_bayar= data.actions.filter(item=>item.name=='deeplink-redirect')[0].url
        await setDoc(doc(db,'order',orderData.order_id),orderData)
        orderData.item_details.forEach( async (item)=>{
          const getStocks = await getDoc(doc(db,'product',item.id))
            if(getStocks.exists()){
              await updateDoc(doc(db,'product',item.id),{stok:getStocks.data().stok - item.quantity})
            }
        })
        await updateDoc(doc(db,'users',user.uid),{order:arrayUnion(orderData.order_id),cart:[]})
        setPay(orderData.pay_code.code_bayar)
    }
    return(
        <div className='px-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'>
            {pay==''?'':
            <>
            <p className='py-3'>*Lakukan pembayaran sebelum 5 menit</p>
            <div className="text-sm text-white capitalize bg-gray-900 text-center -mx-3">
                <a href={pay}>
                    <button className='py-3 w-full'>Buka Shopee</button>
                </a>
            </div>
            </>
            }
            {pay!=''?'':
            <div className="text-sm text-white capitalize bg-gray-900 text-center -mx-3">
                <button className='py-3 w-full' onClick={()=>payNow()}>{loading}</button>
            </div>
            }
        </div>
    )
}
export default Shopee