import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import Image from 'next/image'
import Base from '../components/Base'
import { db } from '../utils/firebaseClient'
import Link from 'next/link'
import {HiStar,HiShoppingCart} from 'react-icons/hi'

export const getStaticProps = async () => {
  const res = await getDocs(query(collection(db,'products'),orderBy('added','desc')))
  const url = []
  const data = []
  res.forEach((doc)=>{
    const resData = doc.data()
    delete resData.added
    data.push(resData)
    url.push(doc.data().imgUrl)
  })
  return {
    props: {url:{imgUrl:url[0]},data:data},
    revalidate:1
  }
}

export default function Home({url,data}) {

  return (
    <Base>
      <div className='flex flex-col md:flex-row'>
        <div className='relative w-full h-96 md:w-1/2'>
          <Image src={url.imgUrl} layout='fill' objectFit='cover' priority={true} alt='jumbotron' className='rounded-xl'/>
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
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
        {data.map((item,index)=>(
          <Link href={`/${item.name.replace(/[ ]/g,'_')}`} key={index}>
            <a className='bg-gray-100 rounded-lg'>
              <div className='relative h-40 mb-2'>
                  <Image src={item.imgUrl} layout='fill' objectFit='cover' quality={80} alt='Laptop' className='rounded-t-lg' />
              </div>
              <div className='px-2 pb-2 flex justify-between items-center'>
                  <div>
                      <HiStar className='text-green-600 w-8 h-8' />
                      <h1 className='text-2xl capitalize font-semibold'>{item.name}</h1>
                      <h1 className='text-lg font-light'>Rp. {Number(item.price).toLocaleString('ID',{'currency':'IDR'})}</h1>
                  </div>
                  <HiShoppingCart className='w-12 h-12 cursor-pointer text-green-600'/>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Base>
  )
}
