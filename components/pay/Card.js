import Input from "../Layout/Form/Input"
import { useEffect, useState } from "react"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"
import { useRouter } from "next/router"
import { AuthUser } from "../User"

const Card = ({order,user,nama,total,ongkir,namaKurir,service}) => {
    const currentUser = AuthUser()
    const router = useRouter()
    const [cardNumber,setCardNumber] = useState('')
    const [cardMonth, setCardMonth] = useState('')
    const [cardYear, setCardYear] = useState('')
    const [cvv, setCvv] = useState('')
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState('')
    const [status, setStatus] = useState('')
    const uniqueNumber = new Date().getMinutes() * new Date().getSeconds() * 13 * new Date().getFullYear()

    const reset = () => {
        setCardNumber('')
        setCardMonth('')
        setCardYear('')
        setCvv('')
    }
    
    const params = {
        payment_type:'credit_card',
        transaction_details: {
            order_id: nama + '_' + uniqueNumber.toString(),
            gross_amount: Number(total)+Number(ongkir)
        },
        credit_card: {
            token_id: '',
            authentication: true
        },
        item_details: order.flatMap(item=>({
            name: item.name,
            price: item.price,
            quantity: item.sum
        })).concat({
            name: namaKurir.concat(' ').concat(service),
            price: Number(ongkir),
            quantity: 1
        }),
        customer_details: {
            first_name:user.name,
            email:user.email,
            phone: user.phone,
            address: user.address
        },
        shipping_address: {
            first_name:user.name,
            email:user.email,
            phone: user.phone,
            address: user.address
        }
    }
    const orderData = {
        payment_type:'credit_card',
        order_id: nama + '_' + uniqueNumber.toString(),
        gross_amount: Number(total)+Number(ongkir),
        item_details: order.flatMap(item=>({
            name: item.name,
            price: item.price,
            quantity: item.sum
        })),
        ongkir:{
            expedisi: namaKurir,
            service: service,
            biaya: Number(ongkir),
            resi: ''
        },
        shipping_address: {
            first_name:user.name,
            email:user.email,
            phone: user.phone,
            address: user.address
        },
        status: '',
        transaction_time:''
    }

    const cardData = {
        "card_number": cardNumber,
        "card_exp_month": cardMonth,
        "card_exp_year": cardYear,
        "card_cvv": cvv,
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
          setLoading(false)
          setStatus(data)
          await setDoc(doc(db,'orders',orderData.order_id),orderData)
          orderData.item_details.forEach( async (item)=>{
            const getStocks = await getDoc(doc(db,'stocks',item.name))
              if(getStocks.exists()){
                await updateDoc(doc(db,'stocks',item.name),{stock:getStocks.data().stock - item.quantity})
              }
          })
          await updateDoc(doc(db,'user',currentUser.uid),{orders:arrayUnion(orderData),cart:[]})
          MidtransNew3ds.redirect( data.redirect_url, { callbackUrl : 'http://localhost:3000/pay/3ds?id='+data.order_id })
          setTimeout(()=>{
              setStatus('')
              reset()
          },30000)
        },
        onFailure: function(response){
          setFail(response.validation_messages[0])
          setLoading(false)
        }
    }

    useEffect(()=>{
        const midtransScriptUrl = 'https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js'
        const myMidtransClientKey = process.env.MIDTRANS_CLIENT
        const envType = 'sandbox'
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

    const cardPay = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        MidtransNew3ds.getCardToken(cardData, options)
    }

    return(
        <>
        <div className={status==''?'hidden':'text-center'}>
            <p className='font-medium text-2xl animate-pulse my-16'>... Loading ...</p>
        </div>
        <form onSubmit={cardPay} className={status!=''?'hidden':'block'}>
            <label className='text-xs font-bold ml-2'>Nomor kartu kredit</label>
            <Input placeholder='Nomor kartu kredit' type='number' value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)}/>
            <label className='text-xs font-bold ml-2'>Bulan expired</label>
            <Input placeholder='Dua Angka (02)' type='number' value={cardMonth} onChange={(e)=>setCardMonth(e.target.value)}/>
            <label className='text-xs font-bold ml-2'>Tahun expired</label>
            <Input placeholder='Empat Angka (2025)' type='number' value={cardYear} onChange={(e)=>setCardYear(e.target.value)}/>
            <label className='text-xs font-bold ml-2'>CVV</label>
            <Input placeholder='CVV' type='password' value={cvv} onChange={(e)=>setCvv(e.target.value)}/>
            <p className='text-sm font-medium mb-2 text-red-600'>{fail==''?'':'Maaf detail kartu yang anda masukan salah, mohon cek lagi.'}</p>
            <div className='text-xs font-medium text-gray-700 mb-2'>
                <p>* Ini hanya contoh, pakai kartu dibawah ini</p>
                <p>Nomor Kartu : 4811-1111-1111-1114</p>
                <p>Bulan : 12</p>
                <p>Tahun : 2025</p>
                <p>CVV : 123</p>
            </div>
            <button className='px-4 py-2 bg-white border-2 border-black rounded-xl font-bold tracking-wider mr-4' onClick={()=>router.back()} type='reset'>Batal</button>
            <button className='px-4 py-2 bg-black rounded-xl text-white font-medium tracking-wider' type='submit'>{loading==false?'Bayar':'Loading'}</button>
        </form>
        </>
    )
}
export default Card