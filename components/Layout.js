import Head from 'next/head'

const Layout = ({children}) => {
    return(
        <>
        <Head>
            <title>Shopedia</title>
            <meta name="description" content="Ecommerce Web App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            {children}
        </main>
        <footer>
            <p>Shopedia @2021</p>
        </footer>
        </>
    )
}
export default Layout