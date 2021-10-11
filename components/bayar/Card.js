import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../utils/firebaseClient"

const Card = ({user,alamat,cart,ongkir}) => {
    const [loading, setLoading] = useState('Konfirmasi')
    const uniqueNumber = new Date().getTime()

    useEffect(()=>{
        const midtransScriptUrl = 'https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js'
        const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT
        const envType = process.env.NEXT_PUBLIC_MIDTRANS_ENV
        let scriptTag = document.createElement('script')
        scriptTag.src = midtransScriptUrl
        scriptTag.id= 'midtrans-script'
        scriptTag.type= 'text/javascript'
        scriptTag.setAttribute('data-environment',envType)
        scriptTag.setAttribute('data-client-key', myMidtransClientKey)
        document.head.appendChild(scriptTag)
        return () => {
            document.head.removeChild(scriptTag)
        }
    },[])

    const params = {
        payment_type:'credit_card',
        transaction_details: {
            order_id: user.uid.slice(0,6) + '_' + uniqueNumber.toString(),
            gross_amount: Number(cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0))+Number(ongkir.cost)
        },
        credit_card: {
            token_id: '',
            authentication: true
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
        payment_type:'credit_card',
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
        pay_code:{bank:'',code:'',code_bayar:''}
    }

    const options = {
        onSuccess: async function(response){
          const token_id = response.token_id
          params.credit_card.token_id=token_id
          const res = await fetch('/api/midPay',{
              method:'POST',body:JSON.stringify(params)
          })
          const data = await res.json()
          orderData.status= await data.transaction_status
          orderData.transaction_time= await data.transaction_time
          await setDoc(doc(db,'order',orderData.order_id),orderData)
          orderData.item_details.forEach( async (item)=>{
            const getStocks = await getDoc(doc(db,'product',item.id))
              if(getStocks.exists()){
                await updateDoc(doc(db,'product',item.id),{stok:getStocks.data().stok - item.quantity})
              }
          })
          await updateDoc(doc(db,'users',user.uid),{order:arrayUnion(orderData),cart:[]})
          MidtransNew3ds.redirect( data.redirect_url, { callbackUrl : window.location.origin+'/status?id='+data.order_id })
        },
        onFailure: function(){
          setLoading('Server error, refresh halaman ini')
        }
    }

    const payNow = (e) => {
        e.preventDefault()
        setLoading('Loading')
        const cardData = {
            "card_number": e.target.nomorKartu.value,
            "card_exp_month": e.target.bulan.value,
            "card_exp_year": e.target.tahun.value,
            "card_cvv": e.target.cvv.value
        }
        MidtransNew3ds.getCardToken(cardData, options)
        e.target.reset()
    }

    return(
        <form className='p-3' onSubmit={payNow}>
            <div className="w-full">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" aria-label="nomor kartu" id="nomorKartu" required type="tel" inputMode="numeric" autoComplete="cc-number" maxLength={19} placeholder="Nomor Kartu"/>
            </div>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="number" placeholder="Bulan" aria-label="bulan" id="bulan" required min={1} max={12} />
            </div>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="number" placeholder="Tahun" aria-label="tahun" id="tahun" required min={new Date().getFullYear()} max={2100} />
            </div>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="number" placeholder="CVV" aria-label="cvv" id="cvv" required min={1} max={999} />
            </div>
            <div className="text-sm text-white capitalize bg-gray-900 text-center -mx-3 mt-3 -mb-3">
                <button className='py-3 w-full' type='submit'>{loading}</button>
            </div>
        </form>
    )
}
export default Card