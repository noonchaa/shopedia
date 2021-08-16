import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import {MdShoppingBasket} from 'react-icons/md'

export default function Home() {
  return (
    <Layout>
      <h1>
        Shopedia
      </h1>
      <MdShoppingBasket/>
    </Layout>
  )
}
