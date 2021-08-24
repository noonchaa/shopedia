import Head from 'next/head'
import Navbar from './Navbar'
import NavLink from './NavLink'

const Layout = ({children}) => {
    return(
        <div className='max-w-screen-2xl mx-auto text-black'>
        <Head>
            <title>Shopedia</title>
            <meta name="description" content="Ecommerce Web App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Navbar/>
            <NavLink/>
        </header>
        <main>
            {children}
        </main>
        <footer className='mt-8 px-4'>
            <h1 className='text-3xl text-green-600 font-semibold'>Shopedia</h1>
            <h2 className='text-xl text-gray-800 italic font-light'>Go Further And Beyond</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 my-4 md:px-8 gap-8'>
                <div>
                    <h3 className='text-gray-800 text-xl font-light mb-2'>Product</h3>
                    <p className='text-lg mb-1 font-medium'>Apple</p>
                    <p className='text-lg mb-1 font-medium'>Lenovo</p>
                    <p className='text-lg mb-1 font-medium'>Asus</p>
                    <p className='text-lg mb-1 font-medium'>Acer</p>
                    <p className='text-lg mb-1 font-medium'>Dell</p>
                    <p className='text-lg mb-1 font-medium'>Toshiba</p>
                </div>
                <div>
                    <h3 className='text-gray-800 text-xl font-light mb-2'>Misc</h3>
                    <p className='text-lg mb-1 font-medium'>Order</p>
                    <p className='text-lg mb-1 font-medium'>Tracking</p>
                    <p className='text-lg mb-1 font-medium'>FAQ</p>
                    <p className='text-lg mb-1 font-medium'>Privacy Policy</p>
                    <p className='text-lg mb-1 font-medium'>Term of Service</p>
                </div>
                <div>
                    <h3 className='text-gray-800 text-xl font-light mb-2'>Contact</h3>
                    <p className='text-lg mb-1 font-medium'>yonoraphael@gmail.com</p>
                    <p className='text-lg mb-1 font-medium'>081219013721</p>
                </div>
            </div>
            <p className='text-center font-extralight border-t-2 border-gray-800 -mx-4 italic'>Shopedia @ 2021</p>
        </footer>
        </div>
    )
}
export default Layout