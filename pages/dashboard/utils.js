import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import { auth, RDB, refRDB, storage } from "../../utils/firebaseClient"
import Image from 'next/image'
import {FaEdit, FaFileCsv} from 'react-icons/fa'
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage"
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from "@firebase/auth"
import { off, onValue, remove, set, update } from "@firebase/database"
import { useRouter } from "next/router"

const Utils = () => {
    const [site, setSite] = useState('')
    const [admin, setAdmin] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        onValue(refRDB(RDB,'util/site'),(snap)=>{
            setSite(snap.val())
        })
        if(auth.currentUser){
            onValue(refRDB(RDB,'admin/'+auth.currentUser.uid),(snap)=>{
                setAdmin(snap.val())
            })
        }

        return () => {
            off(refRDB(RDB,'util/site'))
            if(auth.currentUser){
                off(refRDB(RDB,'admin/'+auth.currentUser.uid))
            }
        }
    },[])

    const updateSite = (e) => {
        e.preventDefault()
        setLoading(true)
        uploadBytes(ref(storage,'/hero/'+e.target.hero.files[0].name),e.target.hero.files[0]).then(()=>{
            getDownloadURL(ref(storage,'/hero/'+e.target.hero.files[0].name)).then((url)=>{
                update(refRDB(RDB,'util/site'),{
                    hero: url,
                    siteTitle: e.target.nama.value,
                    tagline: e.target.tagline.value,
                    value: e.target.value.value,
                    email: e.target.email.value,
                    phone: e.target.phone.value
                })
                e.target.reset()
            })
        }).catch(()=>{
            alert('Server Error, mohon coba beberapa saat lagi')
        })
        setLoading(false)
    }
    const upFile = (e) => {
        e.preventDefault()
        setLoading(true)
        uploadBytes(ref(storage,'/template/'+e.target.csv.files[0].name),e.target.csv.files[0]).then(()=>{
            getDownloadURL(ref(storage,'/template/'+e.target.csv.files[0].name)).then((url)=>{
                update(refRDB(RDB,'util/site'),{template: url})
                e.target.reset()
            })
        }).catch(()=>{
            alert('Server Error, mohon coba beberapa saat lagi')
        })
        setLoading(false)
    }

    const addAdmin = (e) => {
        e.preventDefault()
        setLoading(true)
        createUserWithEmailAndPassword(auth,e.target.emailAdmin.value,e.target.password.value).then(async(userCredential)=>{
            const user = userCredential.user
            await updateProfile(auth.currentUser,{
                displayName: 'admin'
            })
            set(refRDB(RDB,'admin/'+user.uid),{
                name: e.target.namaAdmin.value,
                email: e.target.emailAdmin.value,
                phone: e.target.telepon.value.toString(),
                role: 'admin'
            })
            e.target.reset()
        }).catch(()=>{
            alert('Server Error, mohon coba beberapa saat lagi')
        })
        setLoading(false)
        router.reload()
    }

    const delAdmin = (e) => {
        e.preventDefault()
        setLoading(true)
        reauthenticateWithCredential(auth.currentUser,EmailAuthProvider.credential(e.target.delEmail.value,e.target.delPassword.value)).then(()=>{
            remove(refRDB(RDB,'admin/'+auth.currentUser.uid))
            deleteUser(auth.currentUser)
            e.target.reset()
        }).catch(()=>{
            alert('Server Error, mohon coba beberapa saat lagi')
        })
        setLoading(false)
        router.reload()
    }
    return (
        <Admin>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
            <h1 className='text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4'>Website Setting</h1>
            <form onSubmit={updateSite}>
                <div className='flex justify-center items-center'>
                    <input type='file' accept='image/*' className='opacity-0 w-0 h-0' id='hero' required/>
                    <label htmlFor='hero' className='relative w-80 h-80 cursor-pointer'>
                        <Image src={site==''?'/hero.jpg':site.hero} layout='fill' objectFit='contain' alt='Hero Image' className='rounded-lg'/>
                        <FaEdit className='w-8 h-8 absolute top-0 right-0 z-20 text-gray-600 opacity-50'/>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="nama">Nama Website</label>
                        <input id="nama" type="text" placeholder={site.siteTitle} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="tagline">Tagline Website</label>
                        <textarea rows={2} id="tagline" type="text" placeholder={site.tagline} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="value">Value Website</label>
                        <textarea rows={7} id="value" type="text" placeholder={site.value} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder={site.email} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="phone">Telepon</label>
                        <input id="phone" type="text" placeholder={site.phone} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">{loading==false?'Simpan':'Loading'}</button>
                </div>
            </form>
        </section>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
            <h1 className='text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4'>Ubah Template Upload Massal</h1>
                <form onSubmit={upFile} className='flex flex-col justify-center items-center'>
                    <input type='file' accept='.csv' className='opacity-0' id='csv' required/>
                    <label htmlFor='csv' className='border border-gray-900 rounded-lg dark:border-white p-4 dark:text-white cursor-pointer'>
                        <FaFileCsv className='w-20 h-20 mb-2'/>
                        <p>Pilih File</p>
                    </label>
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mt-4" type='submit'>{loading==false?'Upload':'Loading'}</button>
                </form>
        </section>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
            <h1 className='text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4'>Tambah Admin</h1>
            <p className='text-gray-700 dark:text-gray-200 font-medium text-sm'>*Otomatis Login ke akun admin yang baru</p>
            <form onSubmit={addAdmin}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="namaAdmin">Nama</label>
                        <input id="namaAdmin" type="text" placeholder={admin==''?'Nama Admin':admin.name} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAdmin">Email</label>
                        <input id="emailAdmin" type="email" placeholder={admin==''?'Email':admin.email} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder='Password' required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="telepon">Telepon</label>
                        <input id="telepon" type="tel" placeholder={admin==''?'Telepon':admin.phone} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">{loading==false?'Tambah':'Loading'}</button>
                </div>
            </form>
        </section>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-6 pb-6">
            <h1 className='text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4'>Hapus Admin</h1>
            <p className='text-gray-700 dark:text-gray-200 font-medium text-sm'>*Harus Login dengan akun admin yang ingin di hapus</p>
            <form onSubmit={delAdmin}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="delEmail">Email</label>
                        <input id="delEmail" type="email" placeholder='Email' required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="delPassword">Password</label>
                        <input id="delPassword" type="password" placeholder='Password' required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">{loading==false?'Hapus':'Loading'}</button>
                </div>
            </form>
        </section>
        </Admin>
    )
}
export default Utils