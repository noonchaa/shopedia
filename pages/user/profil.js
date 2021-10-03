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
            city_id: '',
            city_name: '',
            lengkap: '',
            postal_code: '',
            province: '',
            province_id: '',
            type: ''
        },
        orders: []
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
                    <p className='font-semibold mb-2'>Kota : <span className='italic'>{userData.address.type} {userData.address.city_name}</span></p>
                    <p className='font-semibold mb-2'>Provinsi : <span className='italic'>{userData.address.province}</span></p>
                    <p className='font-semibold mb-2'>Kode POS : <span className='italic'>{userData.address.postal_code}</span></p>
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
                    <Input type='text' placeholder='Kota' value={userData.address.city_name} onChange={(e)=>setUserData({...userData,address:{city_name:e.target.value}})}/>
                    <Input type='text' placeholder='Provinsi' value={userData.address.province} onChange={(e)=>setUserData({...userData,address:{province:e.target.value}})}/>
                    <Input type='text' placeholder='Kode POS' value={userData.address.postal_code} onChange={(e)=>setUserData({...userData,address:{postal_code:e.target.value}})}/>
                </form>
            </div>

            <h1 className='text-xl font-semibold italic ml-4 mb-4'>Pesanan</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {userData.orders.map((item,index)=>(
                    <div className='bg-gray-200 shadow rounded-xl px-4 py-3' key={index}>
                    <p className='font-medium mb-2'>ID : <span className='italic font-bold text-lg'>{item.order_id}</span></p>
                    <p className='font-medium mb-2'>Items :</p>
                    {item.item_details.map((isi,indexItem)=>(
                        <div key={indexItem} className='ml-4 mb-4 border-b border-gray-400'>
                            <p className='font-medium mb-2'>Nama : <span className='italic capitalize'>{isi.name}</span></p>
                            <p className='font-medium mb-2'>Jumlah : <span className='italic capitalize'>{isi.quantity} units</span></p>
                            <p className='font-medium mb-2'>Harga : <span className='italic capitalize'>Rp. {Number(isi.price).toLocaleString('ID',{'currency':'IDR'})}</span></p>
                        </div>
                    ))}
                    <p className='font-medium mb-2'>Kurir :</p>
                    <p className='font-medium mb-2 ml-4'>Nama expedisi : <span className='italic uppercase'>{item.ongkir.expedisi}</span> </p>
                    <p className='font-medium mb-2 ml-4'>Service : <span className='italic uppercase'>{item.ongkir.service}</span> </p>
                    <p className='font-medium mb-2 ml-4'>Ongkir : <span className='italic uppercase'>Rp. {Number(item.ongkir.biaya).toLocaleString('ID',{'currency':'IDR'})}</span> </p>
                    <p className='font-medium mb-2 ml-4'>Resi pengiriman : <span className='italic uppercase'>{item.ongkir.resi}</span> </p>
                    <p className='font-medium mb-2'>Total : <span className='italic font-bold text-lg'>Rp. {Number(item.gross_amount).toLocaleString('ID',{'currency':'IDR'})}</span></p>
                    <div className='text-right mr-4 my-4'>
                        <button className='px-4 py-2 rounded-xl bg-black text-white font-bold tracking-wider' onClick={()=>router.push('/cek_order?id='+item.order_id)}>Cek Status</button>
                    </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};
export default Profile