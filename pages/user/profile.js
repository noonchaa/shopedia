import {HiPencilAlt,HiCheck,HiX} from 'react-icons/hi';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/User';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { oneDoc, upDoc } from '../../utils/firebaseHandler';

const Profile = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [nama, setNama] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState([])

    useEffect(()=>{
        if(user){
            const getProfile = async () => {
                const data = []
                await oneDoc('users',user.displayName.toLowerCase(),data)
                setUserData(data)
            }
            getProfile()
        }
        return () => {
            setUserData([])
        }
    },[user])

    const submitUpdate = async (e) => {
        e.preventDefault()
        const data = {
            name: nama,
            phone: phone,
            address: address
        }
        await upDoc('users',user.displayName.toLowerCase(),data).then(()=>{
            setEdit(!edit)
        }).catch(()=>{
            router.push('/')
        })
    };

    return(
        <Layout>
            <div className='my-8'>
                <h1 className='text-xl font-semibold italic text-green-600 ml-4'>Profile</h1>
                {userData.map((item,index)=>(
                    <div key={index} className={edit==false?'bg-gray-50 bg-opacity-5 shadow-xl my-4 rounded-lg px-4 py-3 border border-gray-100 max-w-lg':'hidden'}>
                        <HiPencilAlt className='w-8 h-8 text-green-500 ml-auto mb-4 cursor-pointer' onClick={()=>setEdit(!edit)}/>
                        <p className='font-semibold mb-2'>Nama : <span className='italic'>{item.name}</span></p>
                        <p className='font-semibold mb-2'>Telepon : <span className='italic'>{item.phone}</span></p>
                        <p className='font-semibold mb-2'>Alamat : <span className='italic'>{item.address}</span></p>
                    </div>
                ))}
                <form className={edit==false?'hidden':'bg-gray-50 bg-opacity-5 shadow-xl my-4 rounded-lg px-4 py-3 border border-gray-100 max-w-lg'} onSubmit={submitUpdate} >
                    <div className='text-right mb-4'>
                        <button type='reset' className='mr-4' onClick={()=>setEdit(!edit)} >
                            <HiX className='w-8 h-8 text-red-600'/>
                        </button>
                        <button type='submit'>
                            <HiCheck className='w-8 h-8 text-green-600'/>
                        </button>
                    </div>
                    <input type='text' placeholder='nama' className='p-2 bg-gray-100 mb-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' onChange={(e)=>setNama(e.target.value)} required />
                    <input type='text' placeholder='telepon' className='p-2 bg-gray-100 mb-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' onChange={(e)=>setPhone(e.target.value)} required />
                    <input type='text' placeholder='alamat' className='p-2 bg-gray-100 mb-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' onChange={(e)=>setAddress(e.target.value)} required />
                </form>
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
        </Layout>
    );
};
export default Profile