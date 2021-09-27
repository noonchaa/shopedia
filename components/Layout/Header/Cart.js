import { HiX } from "react-icons/hi"
import CartItem from "./CartItem"

const Cart = ({right,user,click, cart}) => {

    return(
        <aside className={right==false?'hidden':'fixed top-0 right-0 bg-gray-200 shadow-xl w-80 z-50 min-h-screen p-4'}>
            <button className='py-1 px-2 bg-black text-white rounded-xl shadow flex items-center absolute left-4 top-4' onClick={click}>
                <HiX className='h-6 w-6'/>
            </button>
            <h1 className='text-2xl font-medium text-center'>Keranjang</h1>
            <div className='border-t border-b border-black mt-4 pb-4'>
            {cart.map((item,index)=>(
                <CartItem name={item.name} price={item.price} sum={item.sum} user={!user?'no user':user.displayName.toLowerCase()} key={index}/>
            ))}
            </div>
            <div className='my-4 flex justify-between'>
                <p className='font-bold text-lg'>Total</p>
                <p className='font-bold text-xl'>Rp. {cart.map(item=>Number(item.price*item.sum)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <div className='text-center'>
                <button className='py-2 px-4 bg-black text-white rounded-xl shadow font-bold'>
                    Check Out
                </button>
            </div>
        </aside>
    )
}
export default Cart