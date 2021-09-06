import {HiPencilAlt,HiCheck,HiX} from 'react-icons/hi';
import Base from '../components/Base';
import {auth} from '../utils/firebaseClient';
import {signOut} from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/User';
import { useRouter } from 'next/router';
import { db } from '../utils/firebaseClient';
import { doc,getDoc,updateDoc } from 'firebase/firestore'

const Profile = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const [edit, setEdit] = useState(false)
    const [userProfile, setUserProfile] = useState(
        {
            name : '',
            phone : '',
            address : '',
            pesanan : []
        }
    );
    const [nama, setNama] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const docRef = doc(db, 'user', user?user.uid:'user');

    const submitUpdate = async (e) => {
        e.preventDefault()
        await updateDoc(docRef,{
            name : nama,
            phone : phone,
            address : address
        })
        setEdit(!edit)
        setNama('')
        setPhone('')
        setAddress('')
    };

    useEffect(()=>{
        const getProfile = async () => {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setUserProfile(docSnap.data())
            } else {
                console.log('Please update profile')
            }
        }
        getProfile()
        return () => {
            setNama('')
            setPhone('')
            setAddress('')
        }
    },[docRef])

    if (!user) router.push('/login');
    return(
        <Base>
            <div className='my-8'>
                <h1 className='text-xl font-semibold italic text-green-600 ml-4'>Profile</h1>
                <div className={edit==false?'bg-gray-50 bg-opacity-5 shadow-xl my-4 rounded-lg px-4 py-3 border border-gray-100 max-w-lg':'hidden'}>
                    <HiPencilAlt className='w-8 h-8 text-green-500 ml-auto mb-4' onClick={()=>setEdit(!edit)}/>
                    <p className='font-semibold mb-2'>Nama : <span className='italic'>{userProfile.name}</span></p>
                    <p className='font-semibold mb-2'>Telepon : <span className='italic'>{userProfile.phone}</span></p>
                    <p className='font-semibold mb-2'>Alamat : <span className='italic'>{userProfile.address}</span></p>
                </div>
                <form className={edit==false?'hidden':'bg-gray-50 bg-opacity-5 shadow-xl my-4 rounded-lg px-4 py-3 border border-gray-100 max-w-lg'} onSubmit={submitUpdate} >
                    <div className='text-right mb-4'>
                        <button type='reset' className='mr-4' onClick={()=>setEdit(!edit)} >
                            <HiX className='w-8 h-8 text-red-600'/>
                        </button>
                        <button type='submit'>
                            <HiCheck className='w-8 h-8 text-green-600'/>
                        </button>
                    </div>
                    <input type='text' placeholder={userProfile.name} className='p-2 bg-gray-100 mb-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' onChange={(e)=>setNama(e.target.value)} required />
                    <input type='text' placeholder={userProfile.phone} className='p-2 bg-gray-100 mb-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' onChange={(e)=>setPhone(e.target.value)} required />
                    <input type='text' placeholder={userProfile.address} className='p-2 bg-gray-100 mb-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' onChange={(e)=>setAddress(e.target.value)} required />
                </form>
            </div>

            <h1 className='text-xl font-semibold italic text-green-600 ml-4 mb-4'>Pesanan {userProfile.pesanan.length}</h1>
            {!userProfile.pesanan.length?'':
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
            }

            <div className='text-center mt-8'>
            <button className='bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur rounded-md shadow px-2 py-1 h-7' onClick={()=>{
                signOut(auth)
            }} >
                <h1 className='font-bold text-sm text-green-600'>Log Out</h1>
            </button>
            </div>
        </Base>
    );
};
export default Profile