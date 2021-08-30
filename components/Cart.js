const Cart = ({batal}) => {
    return(
        <div className='bg-gray-300 px-4 py-3'>
            <h1 className='text-xl font-semibold text-center mb-2 pb-2 border-black border-b-2'>Cart</h1>
            <div className='grid grid-cols-6 gap-2 pt-2'>
                <p className='font-semibold col-span-3'>Lenovo X341 Hd <span className='text-green-600'>(3)</span></p>
                <p className='font-semibold italic text-center col-span-2'>Rp.3.543.000</p>
                <p className='font-bold text-red-600 text-right col-span-1 cursor-pointer'>Hapus</p>
            </div>
            <div className='grid grid-cols-6 gap-2 pt-4'>
                <p className='font-semibold col-span-3'>Lenovo X341 Hd <span className='text-green-600'>(3)</span></p>
                <p className='font-semibold italic text-center col-span-2'>Rp.3.543.000</p>
                <p className='font-bold text-red-600 text-right col-span-1 cursor-pointer'>Hapus</p>
            </div>
            <div className='grid grid-cols-6 gap-2 pt-4'>
                <p className='font-semibold col-span-3'>Lenovo X341 Hd <span className='text-green-600'>(3)</span></p>
                <p className='font-semibold italic text-center col-span-2'>Rp.3.543.000</p>
                <p className='font-bold text-red-600 text-right col-span-1 cursor-pointer'>Hapus</p>
            </div>
            <div className='grid grid-cols-6 gap-2 my-4 border-t-2 border-black'>
                <p className='font-semibold col-span-3'>Total<span className='text-green-600'>(3)</span></p>
                <p className='font-semibold italic col-span-3'> : Rp.9.784.000</p>
            </div>
            <div className='flex justify-end'>
                <button className='bg-gray-800 rounded-md px-3 py-2 text-white font-bold text-sm tracking-wider mr-4'onClick={batal}>Batal</button>
                <button className='bg-green-500 rounded-md px-3 py-2 text-white font-bold text-sm tracking-wider mr-4'>Bayar</button>
            </div>
        </div>
    )
}
export default Cart