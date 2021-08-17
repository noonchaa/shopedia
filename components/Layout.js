import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({children}) => {
    return(
        <div className='max-w-screen-2xl mx-auto'>
        <Head>
            <title>Shopedia</title>
            <meta name="description" content="Ecommerce Web App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Navbar/>
            {children}
        </main>
        <footer>
            <p>Shopedia @2021</p>
        </footer>
        </div>
    )
}
export default Layout