import Head from 'next/head'
import {HiMenu,HiX} from 'react-icons/hi'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebaseClient'
import {signOut} from 'firebase/auth'

const Admin = ({children}) => {
    //next/router for redirecting to another page
    const router = useRouter()
    //set state for hide/show side menu
    const [show,setShow] = useState(false)

    return(
        <div className='text-black max-w-screen-2xl mx-auto'>

            {/* set meta tag title and descriptions */}
            <Head>
                <title>Dashboard Admin</title>
                <meta name="description" content='Ecommerce Web App Admin'/>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* header top left menu button */}
            <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
                <button
                className='flex py-1 px-2 bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur rounded-md shadow h-7'
                onClick={()=>setShow(!show)}>
                    <HiMenu className='text-green-600 h-5 w-5'/>
                    <h1 className='font-bold text-sm text-green-600'>Menu</h1>
                </button>
            </header>

            {/* navigation link */}
            <aside className={show==false?'hidden':'fixed top-0 p-4 z-50 w-full h-screen max-w-xs bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
                <HiX className='text-green-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={()=>setShow(!show)} />
                {/* link wraper */}
                <div className='pl-4 flex flex-col tracking-wider capitalize'>
                    <Link href='/'>
                        <a className='font-bold mb-2 italic'>Home</a>
                    </Link>
                    <Link href='/dashboard'>
                        <a className={router.asPath=='/dashboard'?'font-bold mb-2':'font-semibold mb-2'}>Stock</a>
                    </Link>
                    <Link href='/dashboard/order'>
                        <a className={router.asPath=='/dashboard/order'?'font-bold mb-2':'font-semibold mb-2'}>Order</a>
                    </Link>
                    <Link href='/dashboard/packing'>
                        <a className={router.asPath=='/dashboard/packing'?'font-bold mb-2':'font-semibold mb-2'}>Packing</a>
                    </Link>
                    <Link href='/dashboard/delivery'>
                        <a className={router.asPath=='/dashboard/delivery'?'font-bold mb-2':'font-semibold mb-2'}>Delivery</a>
                    </Link>
                    <Link href='/dashboard/delivered'>
                        <a className={router.asPath=='/dashboard/delivered'?'font-bold mb-2':'font-semibold mb-2'}>Delivered</a>
                    </Link>
                    <Link href='/dashboard/finished'>
                        <a className={router.asPath=='/dashboard/finished'?'font-bold mb-2':'font-semibold mb-2'}>Finished</a>
                    </Link>
                    <Link href='/dashboard/incoming'>
                        <a className={router.asPath=='/dashboard/incoming'?'font-bold mb-2':'font-semibold mb-2'}>Incoming</a>
                    </Link>
                    <Link href='/dashboard/new'>
                        <a className={router.asPath=='/dashboard/new'?'font-bold mb-2':'font-semibold mb-2'}>New Product</a>
                    </Link>
                    <Link href='/dashboard/addAdmin'>
                        <a className={router.asPath=='/dashboard/addAdmin'?'font-bold mb-2':'font-semibold mb-2'}>Add Admin</a>
                    </Link>
                    <Link href='/dashboard/deleteAdmin'>
                        <a className={router.asPath=='/dashboard/deleteAdmin'?'font-bold mb-2':'font-semibold mb-2'}>Remove Admin</a>
                    </Link>
                    <h1 className='font-semibold mb-2 cursor-pointer'
                        onClick={()=>{
                            signOut(auth)
                            router.push('/')
                        }}
                    >Log Out</h1>
                </div>
                {/* footer text */}
                <p className='text-sm font-semibold text-center w-full absolute bottom-0'>shopedia @2021</p>
            </aside>

            {/* rendered component */}
            <main className='p-4'>
                {children}
            </main>
        </div>
    )
}
export default Admin