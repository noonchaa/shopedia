import { useRouter } from "next/router"
import { useState } from "react"
import Link from 'next/link'
import { sendPasswordResetEmail } from "@firebase/auth"
import { auth } from "../utils/firebaseClient"
import Seo from "../components/Seo"
import {HiX} from 'react-icons/hi'

const Lupa = () => {
    const router = useRouter()
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    const formSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        sendPasswordResetEmail(auth,e.target.email.value).then(()=>{
            setFail('Email dengan panduan reset password telah dikirim ke '+e.target.email.value)
            setLoading(false)
            setTimeout(()=>{router.push('/')},3000)
        }).catch(()=>{
            setFail('Mohon masukan email yang terdaftar')
            setLoading(false)
        })
    }

    return(
        <div className='bg-gray-800 min-h-screen flex justify-center px-6'>
            <Seo title='Reset Password'/>
        <div className="w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-900">
            <div className="px-6 py-4">
                <HiX className='w-8 h-8 cursor-pointer dark:text-white' onClick={()=>router.push('/')} />
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Reset Password</p>
    
                <form onSubmit={formSubmit}>
                    <p className={fail==''?'hidden':'my-1 text-center text-red-600'}>{fail}</p>
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Alamat Email" aria-label="Email Address" id="email" required />
                    </div>
    
                    <div className="flex items-center justify-between mt-4">
    
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">{loading==false?'Kirim':'Loading'}</button>
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
export default Lupa