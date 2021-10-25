import { signOut } from '@firebase/auth'
import Link from 'next/link'
import { useState } from 'react'
import { auth } from '../../utils/firebaseClient'
import Toggle from '../Toggle'
import { AuthUser } from '../User'
import {useRouter} from 'next/router'

const Admin = ({children}) => {
    const user = AuthUser()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const keluar = () => {
        signOut(auth)
        setTimeout(()=>{router.push('/')},2000)
    }

    if(!user || user && user.displayName !== 'admin') return <h1 className='text-center my-20 text-2xl text-red-600'>Anda tidak terauthentifikasi untuk mengakses halaman ini</h1>
    return(
        <div className='min-h-screen bg-white dark:bg-gray-900'>
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold text-gray-700">
                            <Link href='/dashboard'>
                            <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">Dashboard</a>
                            </Link>
                        </div>
    
                        
                        <div className="flex md:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu" onClick={()=>setOpen(!open)}>
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
    
                    
                    <div className={open==false?"hidden flex-1 md:flex md:items-center md:justify-between":'flex-1 md:flex md:items-center md:justify-between'}>
                        <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                            <Link href='/dashboard/update'>
                                <a className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">Update Produk</a>
                            </Link>
                            <Link href='/dashboard/upload'>
                                <a className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">Upload Produk</a>
                            </Link>
                            <Link href='/dashboard/utils'>
                                <a className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">Utility</a>
                            </Link>
                        </div>
    
                        <div className="flex flex-col md:flex-row mt-4 md:mt-0">
                            <p className="md:px-2 py-1 md:mx-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">{user?user.email:''}</p>
                            <button type="button" className="flex items-center focus:outline-none" onClick={()=>keluar()}>
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Log Out</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <main>
            {children}
        </main>
        <Toggle/>
        </div>
    )
}
export default Admin