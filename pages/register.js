import { createUserWithEmailAndPassword } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Seo from '../components/Seo'
import { auth, db } from '../utils/firebaseClient'
import {HiX} from 'react-icons/hi'

const Register = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState('')

    const formSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        createUserWithEmailAndPassword(auth,e.target.email.value,e.target.password.value).then( async (userCredential)=>{
            const user = userCredential.user
            await setDoc(doc(db,'users',user.uid),{
                nama: e.target.nama.value,
                cart: [],
                order: [],
                email: e.target.email.value,
                foto:'',
                alamat:{city_id:'',city_name:'',postal_code:'',province:'',province_id:'',type:'',full:''},
                phone:''
            })
            setLoading(false)
            router.push('/')
        }).catch(()=>{
            setLoading(false)
            setFail('Maaf server sedang sibuk, coba beberapa saat lagi')
        })
    }
    return(
        <div className='bg-gray-800 min-h-screen flex justify-center px-6'>
            <Seo title='Daftar'/>
        <div className="w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="px-6 py-4">
                <HiX className='w-8 h-8 cursor-pointer' onClick={()=>router.push('/')} />
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Shopedia</h2>
    
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Selamat datang</h3>
    
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Masuk atau buat akun</p>
    
                <form onSubmit={formSubmit}>
                    <p className={fail==''?'hidden':'my-1 text-center text-red-600'}>{fail}</p>
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="text" placeholder="Nama" aria-label="Nama" id="nama" required />
                    </div>
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Alamat Email" aria-label="Email Address" id="email" required />
                    </div>
    
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password" id="password" required/>
                    </div>
    
                    <div className="flex items-center justify-between mt-4">
    
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">{loading==false?'Daftar':'Loading'}</button>
                    </div>
                </form>
            </div>
    
            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">Sudah punya akun? </span>
                <Link href='/signIn'>
                <a className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Masuk</a>
                </Link>
            </div>
        </div>
        </div>
    )
}
export default Register