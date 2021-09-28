import {HiPencilAlt,HiCheck,HiX} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { AuthUser } from '../../components/User';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Seo';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../../utils/firebaseClient';
import Input from '../../components/Layout/Form/Input'

const Profile = () => {
    const user = AuthUser()
    const router = useRouter();
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: 0,
        address: {
            prov: '',
            kab: '',
            kec: '',
            desa: '',
            lengkap: ''
        }
    })

    useEffect(()=>{
        if(user){
            const getProfile = async () => {
                const getData = await getDoc(doc(db,'user',user.uid))
                if(getData.exists()){
                    setUserData(getData.data())
                } else {
                    console.log('No User')
                }
            }
            return getProfile()
        }
    },[user])

    const submitUpdate = async (e) => {
        e.preventDefault()
        await updateDoc(doc(db,'user',user.uid),userData).then(()=>{
            setEdit(!edit)
        }).catch(()=>console.log('eror'))
    };

    return(
        <Layout>
            <Seo title='Profile'/>
            <div className='my-16'>
                <h1 className='text-xl font-semibold italic ml-4'>Profile</h1>
                {!userData?
                ''
                :
                <div className={edit==false?'bg-gray-200 shadow-xl my-4 rounded-xl px-4 py-3 max-w-lg':'hidden'}>
                    <HiPencilAlt className='w-8 h-8 ml-auto mb-4 cursor-pointer' onClick={()=>setEdit(!edit)}/>
                    <p className='font-semibold mb-2'>Nama : <span className='italic'>{userData.name}</span></p>
                    <p className='font-semibold mb-2'>Telepon : <span className='italic'>{userData.phone}</span></p>
                    <p className='font-semibold mb-2'>Alamat : <span className='italic'>{userData.address.lengkap}</span></p>
                    <p className='font-semibold mb-2'>Desa : <span className='italic'>{userData.address.desa}</span></p>
                    <p className='font-semibold mb-2'>Kecamatan : <span className='italic'>{userData.address.kec}</span></p>
                    <p className='font-semibold mb-2'>Kabupaten : <span className='italic'>{userData.address.kab}</span></p>
                    <p className='font-semibold mb-2'>Provinsi : <span className='italic'>{userData.address.prov}</span></p>
                </div>
                }
                <form className={edit==false?'hidden':'bg-gray-300 shadow-xl my-4 rounded-xl px-4 py-3 max-w-lg'} onSubmit={submitUpdate} >
                    <div className='text-right mb-4'>
                        <button type='reset' className='mr-4' onClick={()=>setEdit(!edit)} >
                            <HiX className='w-8 h-8'/>
                        </button>
                        <button type='submit'>
                            <HiCheck className='w-8 h-8'/>
                        </button>
                    </div>
                    <Input type='text' placeholder='Nama' value={userData.name} onChange={(e)=>setUserData({...userData,name:e.target.value})}/>
                    <Input type='tel' placeholder='Telepon' value={userData.phone} onChange={(e)=>setUserData({...userData,phone:e.target.value})}/>
                    <Input type='text' placeholder='Alamat' value={userData.address.lengkap} onChange={(e)=>setUserData({...userData,address:{lengkap:e.target.value}})}/>
                    <Input type='text' placeholder='Desa' value={userData.address.desa} onChange={(e)=>setUserData({...userData,address:{desa:e.target.value}})}/>
                    <Input type='text' placeholder='Kecamatan' value={userData.address.kec} onChange={(e)=>setUserData({...userData,address:{kec:e.target.value}})}/>
                    <Input type='text' placeholder='Kabupaten' value={userData.address.kab} onChange={(e)=>setUserData({...userData,address:{kab:e.target.value}})}/>
                    <Input type='text' placeholder='Provinsi' value={userData.address.prov} onChange={(e)=>setUserData({...userData,address:{prov:e.target.value}})}/>
                </form>
            </div>

            <h1 className='text-xl font-semibold italic ml-4 mb-4'>Pesanan</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-gray-200 shadow-xl rounded-lg px-4 py-3'>
                    <p className='font-semibold mb-2'>ID : <span className='italic'>458751</span></p>
                    <p className='font-semibold mb-2 italic'>Lenovo x-546 pro</p>
                    <p className='font-semibold mb-2 italic'>MacBook Pro @954</p>
                    <p className='font-semibold mb-2 italic'>Asus Z-73 Ultra</p>
                    <p className='font-semibold mb-2 text-right'>Menunggu Pembayaran</p>
                </div>
                <div className='bg-gray-200 shadow-xl rounded-lg px-4 py-3'>
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