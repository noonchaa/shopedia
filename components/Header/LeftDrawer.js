import {doc, getDoc} from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {HiX} from 'react-icons/hi'
import { db } from '../../utils/firebaseClient'
import CartItem from './CartItem'

const LeftDrawer = ({show,click,user,cart}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [payList, setpayList] = useState([])

    useEffect(()=>{
        const getList = async () => {
            const pay = await getDoc(doc(db,'utils','payList'))
            if(pay.exists()){
                setpayList(pay.data().payList)
            } else {
                setpayList([])
            }
        }
        getList()
    },[])

    return(
        <aside className={show==false?'hidden':'fixed top-0 right-0 p-4 z-50 w-80 h-screen bg-gray-50 bg-opacity-30 backdrop-filter backdrop-blur-lg'}>
            <HiX className='text-red-600 h-5 w-5 mr-auto mb-4 cursor-pointer' onClick={click}/>
            <h1 className='text-2xl font-bold text-green-600 tracking-widest mb-4 text-center'>Keranjang</h1>
            <div className='grid grid-cols-2 border-b border-gray-700'>
                <p className='font-bold mb-2'>Product</p>
                <p className='font-bold mb-2'>Harga</p>
            </div>
            {cart.map((item,index)=>(
                <CartItem key={index} name={item.name} price={item.price} sum={item.sum} user={user}/>
            ))}
            <div className='grid grid-cols-2'>
                <p className='font-bold mb-2'>Total</p>
                <p className='font-bold mb-2'>Rp. {cart.map(item=>Number(item.price*item.sum)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <div className='flex justify-end'>
                <button className={open==false?'bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2 disabled:bg-gray-800':'bg-gray-800 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2 disabled:bg-gray-800'} disabled={!cart.length?true:false} onClick={()=>setOpen(!open)}>
                    {!cart.length?'Keranjang Kosong':open==false?'Bayar':'Batal'}
                </button>
            </div>
            <div className={open==false?'hidden':'grid grid-cols-2 gap-2 border-t border-gray-700 mt-4 py-2'}>
                {payList.map((item,index)=>(
                    <button
                    key={index}
                    className='font-bold text-sm rounded-md ring-1 ring-green-600 py-2 focus:text-white focus:bg-green-600 capitalize'
                    onClick={()=>router.push('/pay/'+item.toLowerCase().replace(/[ ]/g,'_'))}>
                        {item}
                    </button>
                ))}
            </div>
        </aside>
    )
}
export default LeftDrawer