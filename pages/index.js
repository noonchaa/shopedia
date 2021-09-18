import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Base from '../components/Base'
import Product from '../components/Product'
import { db } from '../utils/firebaseClient'

export default function Home() {
  const [products, setProducts] = useState([])
  const [imgUrl, setImgUrl] = useState(['/logo.png'])

  useEffect(()=>{
    const getProducts = async () => {
      const res = await getDocs(query(collection(db,'products'),orderBy('added','desc')))
      const data = []
      res.forEach((doc)=>{
        data.push(doc.data())
      })
      setProducts(data)
    }
    getProducts()
  },[])

  return (
    <Base>
      <div className='flex flex-col md:flex-row'>
        <div className='relative w-full h-96 md:w-1/2'>
          <Image src='https://firebasestorage.googleapis.com/v0/b/shopedia-c22d1.appspot.com/o/lenovo%2Flegiony7000se.webp?alt=media&token=e0a21e7b-60b7-4612-a435-bbef7c188c4e' layout='fill' objectFit='cover' priority={true} alt='jumbotron' className='rounded-xl'/>
        </div>
        <div className='text-center pt-16 w-full md:w-1/2 md:pl-4'>
          <h1 className='text-2xl font-bold text-green-600 tracking-widest mb-8'>Shopedia</h1>
          <h1 className='text-2xl font-light text-green-600 tracking-widest mb-8'>
            A shopping destination to discover the latest laptops
          </h1>
          <form className='flex justify-between px-4'>
            <input className='p-2 bg-gray-50 bg-opacity-20 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' placeholder='Find laptops' type='text'/>
            <button type='submit' className='bg-gray-50 bg-opacity-20 shadow rounded-md ml-4 px-4 font-bold text-sm'>Search</button>
          </form>
        </div>
      </div>
      <Product/>
      <Product/>
    </Base>
  )
}
