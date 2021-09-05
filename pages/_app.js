import 'tailwindcss/tailwind.css'
import User from '../components/User'

function MyApp({ Component, pageProps }) {
  return(
  <User>
    <Component {...pageProps} />
  </User>
  )
}

export default MyApp
