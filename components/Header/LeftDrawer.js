import {HiX} from 'react-icons/hi'
const LeftDrawer = ({show,click,cart}) => {
    return(
        <aside className={show==false?'hidden':'fixed top-0 right-0 p-4 z-50 w-80 h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
            <HiX className='text-red-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={click}/>
            <h1 className='text-2xl font-bold text-green-600 tracking-widest mb-4 text-center'>Keranjang</h1>
            <div className='grid grid-cols-2 border-b border-gray-700'>
                <p className='font-semibold mb-2'>Product</p>
                <p className='font-semibold mb-2'>Harga</p>
            </div>
            {cart.map((item,index)=>(
            <div className='grid grid-cols-2 border-b border-gray-700' key={index}>
                <p className='font-semibold mb-2 capitalize'>{item.name}</p>
                <p className='font-semibold mb-2'>Rp. {Number(item.price).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            ))}
            <div className='grid grid-cols-2'>
                <p className='font-semibold mb-2'>Total</p>
                <p className='font-semibold mb-2'>Rp. {cart.map(item=>Number(item.price)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
        </aside>
    )
}
export default LeftDrawer