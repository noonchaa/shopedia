import Head from 'next/head'
import {HiMenu,HiX} from 'react-icons/hi'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebaseClient'
import {signOut} from 'firebase/auth'

const Admin = ({children}) => {
    const router = useRouter()
    const [show,setShow] = useState(false)
    return(
        <div className='text-black max-w-screen-2xl mx-auto'>
            <Head>
                <title>Shopedia</title>
                <meta name="description" content="Ecommerce Web App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
                <button className='flex py-1 px-2 bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur rounded-md shadow h-7' onClick={()=>setShow(!show)}>
                    <HiMenu className='text-green-600 h-5 w-5'/>
                    <h1 className='font-bold text-sm text-green-600'>Menu</h1>
                </button>
            </header>
            <aside className={show==false?'hidden':'fixed top-0 p-4 z-50 w-full h-screen max-w-xs bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
                <HiX className='text-green-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={()=>setShow(!show)} />
                <div className='pl-4 flex flex-col'>
                    <Link href='/'>
                        <a className='font-bold tracking-wider mb-2'>Home</a>
                    </Link>
                    <Link href='/dashboard'>
                        <a className={router.asPath=='/dashboard'?'font-bold tracking-wider capitalize mb-2':'font-semibold tracking-wider capitalize mb-2'}>Stock</a>
                    </Link>
                    <Link href='/dashboard/order'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Order</a>
                    </Link>
                    <Link href='/dashboard/packing'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Packing</a>
                    </Link>
                    <Link href='/dashboard/delivery'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Delivery</a>
                    </Link>
                    <Link href='/dashboard/delivered'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Delivered</a>
                    </Link>
                    <Link href='/dashboard/finished'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Finished</a>
                    </Link>
                    <Link href='/dashboard/incoming'>
                        <a className={router.asPath=='/dashboard/incoming'?'font-bold tracking-wider capitalize mb-2':'font-semibold tracking-wider capitalize mb-2'}>Incoming</a>
                    </Link>
                    <Link href='/dashboard/new'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>New Product</a>
                    </Link>
                    <Link href='/dashboard/addAdmin'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Add Admin</a>
                    </Link>
                    <Link href='/dashboard/deleteAdmin'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Remove Admin</a>
                    </Link>
                    <h1 className='font-semibold tracking-wider capitalize mb-2 cursor-pointer'
                        onClick={()=>{
                            signOut(auth)
                            router.push('/')
                        }}
                    >
                        Log Out
                    </h1>
                </div>
                <p className='text-sm font-semibold text-center w-full absolute bottom-0'>shopedia @2021</p>
            </aside>
            <main className='p-4'>
                {children}
            </main>
        </div>
    )
}
export default Admin