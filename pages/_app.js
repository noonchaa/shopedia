import 'tailwindcss/tailwind.css'
import {User} from '../components/User'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(
  <User>
    <Head>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </User>
  )
}

export default MyApp
