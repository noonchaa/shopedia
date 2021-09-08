import Head from 'next/head'
import {HiMenu,HiX,HiShoppingCart} from 'react-icons/hi'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Cart from './Cart'
import { UserContext } from './User'

const Base = ({children}) => {
    const [show,setShow] = useState(false)
    const [cart, setCart] = useState(false)
    const user = useContext(UserContext)

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

                {!user?
                    <Link href='/login'>
                        <a className='bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur rounded-md shadow px-2 py-1 h-7'>
                            <h1 className='font-bold text-sm text-green-600'>Log In . SignUp</h1>
                        </a>
                    </Link>
                :
                    <button className='relative bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur rounded-md shadow px-4 py-1 h-7' onClick={()=>setCart(!cart)}>
                        <HiShoppingCart className='w-5 h-5 text-green-600'/>
                        <p className='absolute top-0 right-0 font-bold text-base leading-4 mr-1'>2</p>
                    </button>
                }
                
            </header>
            <aside className={show==false?'hidden':'fixed top-0 p-4 z-50 w-full h-screen max-w-xs bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
                <HiX className='text-green-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={()=>setShow(!show)} />
                <div className='pl-4 flex flex-col'>
                    <Link href='/'>
                        <a className='font-bold tracking-wider mb-2'>Home</a>
                    </Link>
                    <Link href='/brand'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Apple</a>
                    </Link>
                    <Link href='/brand'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>Lenovo</a>
                    </Link>
                    {user?user.email=='shopadmin@shopedia.com'?
                        <Link href='/dashboard'>
                            <a className='font-semibold tracking-wider capitalize mb-2'>Dashboard</a>
                        </Link>:
                        <Link href='/profile'>
                            <a className='font-semibold tracking-wider capitalize mb-2'>Profile</a>
                        </Link>:
                        ''}
                    <Link href='/help'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>FAQ</a>
                    </Link>
                    <Link href='/term'>
                        <a className='font-semibold tracking-wider capitalize mb-2'>TOS</a>
                    </Link>
                    <a href='mailto:yonoraphael@gmail.com' className='font-semibold tracking-wider capitalize'>Contact</a>
                </div>
                <p className='text-sm font-semibold text-center w-full absolute bottom-0'>shopedia @2021</p>
            </aside>
            <aside className={cart==false?'hidden':'fixed top-0 right-0 z-50 p-4 w-full h-screen max-w-md bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur'}>
                <Cart batal={()=>setCart(!cart)}/>
            </aside>
            <main className='p-4'>
                {children}
            </main>
        </div>
    )
}
export default Base