import Head from 'next/head'
import {HiMenu} from 'react-icons/hi'
import Link from 'next/link'

const Base = ({children}) => {
    return(
        <div className='text-black max-w-screen-2xl mx-auto'>
            <Head>
                <title>Shopedia</title>
                <meta name="description" content="Ecommerce Web App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
                <button className='flex py-1 px-2 bg-gray-50 bg-opacity-20 rounded-md shadow h-7'>
                    <HiMenu className='text-green-600 h-5 w-5'/>
                    <h1 className='font-bold text-sm text-green-600'>Menu</h1>
                </button>
                <Link href='/login'>
                    <a className='bg-gray-50 bg-opacity-20 rounded-md shadow px-2 py-1 h-7'>
                        <h1 className='font-bold text-sm text-green-600'>Log In . SignUp</h1>
                    </a>
                </Link>
            </header>
            <main className='p-4'>
                {children}
            </main>
            <footer className='fixed bottom-0 max-w-screen-2xl mx-auto px-4 py-2 w-full flex flex-col md:flex-row justify-between bg-gray-50 bg-opacity-50'>
                <div className='flex justify-between w-full max-w-xl'>
                    <Link href='/brand'>
                        <a className='text-sm font-semibold'>Brand list</a>
                    </Link>
                    <Link href='/help'>
                        <a className='text-sm font-semibold'>FAQ</a>
                    </Link>
                    <Link href='/term'>
                        <a className='text-sm font-semibold'>TOS</a>
                    </Link>
                    <a href='mailto:yonoraphael@gmail.com' className='text-sm font-semibold'>Contact</a>
                </div>
                <p className='text-sm font-semibold text-center mt-1 md:mt-0'>shopedia @2021</p>
            </footer>
        </div>
    )
}
export default Base