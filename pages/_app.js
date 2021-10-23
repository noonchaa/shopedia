import 'tailwindcss/tailwind.css'
import UserContextComp from '../components/User'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(
  <UserContextComp>
    <Head>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </UserContextComp>
  )
}

export default MyApp
