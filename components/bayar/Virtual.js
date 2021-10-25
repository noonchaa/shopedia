import { arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db, RDB, refRDB } from "../../utils/firebaseClient"
import {FaCheck} from 'react-icons/fa'
import { useRouter } from "next/router"
import { get, set, update } from "@firebase/database"

const Virtual = ({user,alamat,cart,ongkir}) => {
    const [loading, setLoading] = useState('Konfirmasi')
    const [bank, setBank] = useState([])
    const [pick, setPick] = useState('')
    const uniqueNumber = new Date().getTime()
    const [va, setVa] = useState('')
    const router = useRouter()

    useEffect(()=>{
        const getBank = async () => {
            const res = await getDoc(doc(db,'utils','payList'))
            if(res.exists()){
                setBank(res.data().virtual)
            } else {
                setBank([])
            }
        }
        getBank()

        return () => setBank([])
    },[])
    
    let params = {
        payment_type:'bank_transfer',
        transaction_details: {
            order_id: user.uid.slice(0,6) + '_' + uniqueNumber.toString(),
            gross_amount: Number(cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0))+Number(ongkir.cost)
        },
        bank_transfer: {
            bank: pick
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
        payment_type:'bank_transfer',
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
        const pay = async () => {
            const res = await fetch('/api/midPay',{
                method:'POST',
                body: JSON.stringify(params)
            })
            const data = await res.json()
            orderData.pay_code.bank= pick=='echannel'?'mandiri':pick
            orderData.pay_code.code= data.biller_code?data.biller_code:''
            orderData.pay_code.code_bayar= data.bill_key?data.bill_key:data.permata_va_number?data.permata_va_number:data.va_numbers.length?data.va_numbers[0].va_number:'error'
            setVa(data.bill_key?data.biller_code.concat('_').concat(data.bill_key):data.permata_va_number?data.permata_va_number:data.va_numbers.length?data.va_numbers[0].va_number:'Server error coba refresh halaman ini')
            if(orderData.pay_code.code_bayar=='error'){
                setLoading('Server error')
            } else {
                orderData.transaction_time= await data.transaction_time
                await set(refRDB(RDB,'order/'+orderData.order_id),orderData)
                orderData.item_details.forEach( async (item)=>{
                    await get(refRDB(RDB,'product/'+item.id)).then((snap)=>{
                        update(refRDB(RDB,'product/'+item.id),{stok: snap.val().stok - item.quantity})
                    })
                })
                await updateDoc(doc(db,'users',user.uid),{order:arrayUnion(orderData.order_id),cart:[]})
                setTimeout(()=>{router.push('/status?id='+data.order_id)},4000)
            }
        }
        if(pick=='echannel'){
            params.payment_type=pick
            delete params.bank_transfer
            params={...params,echannel:{bill_info1:'Bayar',bill_info2:'belanja online'}}
            pay()
        } else if(pick=='permata') {
            params.payment_type=pick
            delete params.bank_transfer
            pay()
        } else {
            pay()
        }
        setLoading('Konfirmasi')
    }

    return(
        <div>
        <p className='px-3 pt-3 text-sm text-gray-600 dark:text-white'>*Pembayaran virtual akun dapat dilakukan beda bank</p>
        {va==''?
        <div className='grid grid-cols-2 gap-3 p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'>
            {bank.map((item,index)=>(
                <div key={index} className='cursor-pointer bg-gray-300 p-2 rounded-lg relative dark:bg-gray-900' onClick={()=>setPick(item)}>
                    <h1>{item=='echannel'?'mandiri':item}</h1>
                    {pick==item?<FaCheck className='absolute top-2 right-2'/>:''}
                </div>
            ))}
        </div>
        :''}
        {va==''?'':
        <div className='px-3 dark:text-white capitalize font-bold pb-3'>
            <p>Bank : {pick=='echannel'?'mandiri':pick}</p>
            <p>Nomor Virtual akun : {va}</p>
            <p className='text-sm italic'>**Mohon lakukan pembayaran sebelum 1X24 jam</p>
        </div>}
        {va==''?
        <div className="text-sm text-white capitalize bg-gray-900 text-center -mx-3">
            <button className='py-3 w-full' onClick={()=>payNow()}>{loading}</button>
        </div>
        :
        ''}
        </div>
    )
}
export default Virtual