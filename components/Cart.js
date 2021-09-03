import {HiX} from 'react-icons/hi'

const Cart = ({batal}) => {
    return(
        <div className='px-4'>
            <h1 className='font-bold tracking-wider mb-2'>Cart</h1>
            <div className='grid grid-cols-6 gap-2 pt-2'>
                <p className='col-span-3 tracking-wide '>Lenovo X341 Hd</p>
                <p className='italic col-span-2'>Rp.3.543.000</p>
                <div className='flex justify-between'>
                    <button className='px-2 rounded font-black bg-opacity-5 bg-gray-50 shadow-xl border border-gray-100'>
                        -
                    </button>
                    <h1 className='px-1 text-green-600'>3</h1>
                    <button className='px-2 rounded font-black bg-opacity-5 bg-gray-50 shadow-xl border border-gray-100'>
                        +
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-2 pt-2'>
                <p className='col-span-3 tracking-wide '>Lenovo X341 Hd</p>
                <p className='italic col-span-2'>Rp.3.543.000</p>
                <div className='flex justify-between'>
                    <button className='px-2 rounded font-black bg-opacity-5 bg-gray-50 shadow-xl border border-gray-100'>
                        -
                    </button>
                    <h1 className='px-1 text-green-600'>3</h1>
                    <button className='px-2 rounded font-black bg-opacity-5 bg-gray-50 shadow-xl border border-gray-100'>
                        +
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-2 pt-2'>
                <p className='col-span-3 tracking-wide '>Lenovo X341 Hd</p>
                <p className='italic col-span-2'>Rp.3.543.000</p>
                <div className='flex justify-between'>
                    <button className='px-2 rounded font-black bg-opacity-5 bg-gray-50 shadow-xl border border-gray-100'>
                        -
                    </button>
                    <h1 className='px-1 text-green-600'>3</h1>
                    <button className='px-2 rounded font-black bg-opacity-5 bg-gray-50 shadow-xl border border-gray-100'>
                        +
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-2 my-4 border-t border-black'>
                <p className='font-semibold col-span-3'>Total <span className='text-green-600'>(9)</span></p>
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