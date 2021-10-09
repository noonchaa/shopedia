import { signInWithEmailAndPassword } from '@firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Seo from '../components/Seo'
import { auth } from '../utils/firebaseClient'

const SignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState('')
    const [count, setCount] = useState(0)

    const formSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        setCount(count+1)
        if(count>=2){
            setFail(`Anda telah gagal login 3 kali, mengalihkan ke halaman reset password`)
            setTimeout(()=>{router.push('/lupa')},1000)
        } else {
            signInWithEmailAndPassword(auth,e.target.email.value,e.target.password.value).then(()=>{
                setLoading(false)
                router.back()
            }).catch(()=>{
                setFail(`Email atau password salah`)
                setLoading(false)
            })
        }
    }
    return(
        <div className='bg-gray-800 min-h-screen flex justify-center px-6'>
        <Seo title='Masuk'/>
        <div className="w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Shopedia</h2>
    
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Selamat datang</h3>
    
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Masuk atau buat akun</p>
    
                <form onSubmit={formSubmit}>
                    <p className={fail==''?'hidden':'my-1 text-center text-red-600'}>{fail}</p>
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Alamat Email" aria-label="Email Address" id="email" required />
                    </div>
    
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password" id="password" required/>
                    </div>
    
                    <div className="flex items-center justify-between mt-4">
                        <Link href='/lupa'>
                        <a className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>
                        </Link>
    
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">{loading==false?'Login':'Loading'}</button>
                    </div>
                </form>
            </div>
    
            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">Belum punya akun? </span>
                <Link href='/register'>
                <a className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Daftar</a>
                </Link>
            </div>
        </div>
        </div>
    )
}
export default SignIn