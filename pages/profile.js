import {FaUserEdit} from 'react-icons/fa'
import Base from '../components/Base'

const Profile = () => {
    return(
        <Base>
            <div className='my-8'>
                <h1 className='text-xl font-semibold italic text-green-600 ml-4'>Profile</h1>
                <div className='bg-gray-50 bg-opacity-5 shadow-xl my-4 rounded-lg px-4 py-3 border border-gray-100 max-w-lg'>
                    <FaUserEdit className='w-8 h-8 text-green-500 ml-auto mb-4'/>
                    <p className='font-semibold mb-2'>Nama : <span className='italic'>John Wick</span></p>
                    <p className='font-semibold mb-2'>Telepon : <span className='italic'>081234567890</span></p>
                    <p className='font-semibold mb-2'>Alamat : <span className='italic'>121 Mill Neck, Long Island, NY.</span></p>
                </div>
            </div>
            <h1 className='text-xl font-semibold italic text-green-600 ml-4 mb-4'>Pesanan</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-gray-50 bg-opacity-5 shadow-xl rounded-lg px-4 py-3 border border-gray-100'>
                    <p className='font-semibold mb-2'>ID : <span className='italic'>458751</span></p>
                    <p className='font-semibold mb-2 italic'>Lenovo x-546 pro</p>
                    <p className='font-semibold mb-2 italic'>MacBook Pro @954</p>
                    <p className='font-semibold mb-2 italic'>Asus Z-73 Ultra</p>
                    <p className='font-semibold mb-2 text-right'>Menunggu Pembayaran</p>
                </div>
                <div className='bg-gray-50 bg-opacity-5 shadow-xl rounded-lg px-4 py-3 border border-gray-100'>
                    <p className='font-semibold mb-2'>ID : <span className='italic'>458751</span></p>
                    <p className='font-semibold mb-2 italic'>Lenovo x-546 pro</p>
                    <p className='font-semibold mb-2 italic'>MacBook Pro @954</p>
                    <p className='font-semibold mb-2 italic'>Asus Z-73 Ultra</p>
                    <p className='font-semibold mb-2 text-right'>Dalam Perjalanan</p>
                </div>
            </div>
        </Base>
    )
}
export default Profile