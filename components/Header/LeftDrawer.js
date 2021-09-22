import { useContext } from 'react'
import {HiX} from 'react-icons/hi'
import { upDoc } from '../../utils/firebaseHandler'
import Button from '../part/Button'
import { UserContext } from '../User'

const LeftDrawer = ({show,click,cart}) => {
    const user = useContext(UserContext)

    const upSum = async (name='',price='',opp='') => {
        const cartArray= cart
        const indexSum = cartArray.findIndex((item)=>item.name==name)
        const oldSum = cartArray[indexSum].sum
        if(oldSum==1){
            opp=='min'?cartArray.splice(indexSum,1):cartArray.splice(indexSum,1,{
                name: name,
                price: price,
                sum: oldSum+1
            })
            await upDoc('users',user.displayName.toLowerCase(),{cart:cartArray})
        } else {
            cartArray.splice(indexSum,1,{
                name: name,
                price: price,
                sum: opp=='add'?oldSum+1:opp=='min'?oldSum-1:oldSum
            })
            await upDoc('users',user.displayName.toLowerCase(),{cart:cartArray})
        }
    }

    return(
        <aside className={show==false?'hidden':'fixed top-0 right-0 p-4 z-50 w-80 h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
            <HiX className='text-red-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={click}/>
            <h1 className='text-2xl font-bold text-green-600 tracking-widest mb-4 text-center'>Keranjang</h1>
            <div className='grid grid-cols-2 border-b border-gray-700'>
                <p className='font-bold mb-2'>Product</p>
                <p className='font-bold mb-2'>Harga</p>
            </div>
            {cart.map((item,index)=>(
            <div className='grid grid-cols-2 border-b border-gray-700' key={index}>
                <div>
                    <p className='mb-1 capitalize font-medium'>{item.name}</p>
                    <div className='font-medium mb-2 ring-1 ring-green-600 rounded-md w-max'>
                        <button className='bg-green-600 px-2 rounded-l-md font-bold mr-2' onClick={()=>upSum(item.name,item.price,'min')}>-</button>
                        <p className='inline'>{item.sum}</p>
                        <button className='bg-green-600 px-2 rounded-r-md font-bold ml-2' onClick={()=>upSum(item.name,item.price,'add')}>+</button>
                    </div>
                </div>
                <p className='font-medium mb-2'>Rp. {Number(item.price*item.sum).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            ))}
            <div className='grid grid-cols-2'>
                <p className='font-bold mb-2'>Total</p>
                <p className='font-bold mb-2'>Rp. {cart.map(item=>Number(item.price*item.sum)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <div className='flex justify-end'>
                <button className='bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2'>
                    Bayar
                </button>
            </div>
        </aside>
    )
}
export default LeftDrawer