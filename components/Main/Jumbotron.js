import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Jumbotron = ({imgUrl}) => {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const searchHandler = (e) => {
        e.preventDefault()
        router.push('/product/'+search.replace(/[ ]/g,'_'))
    }
    
    return(
    <div className='flex flex-col md:flex-row'>
        <div className='relative w-full h-96 md:w-1/2'>
        {!imgUrl?
        <h1 className='text-center font-semibold italic'>... Loading ...</h1>
        :
        <Image src={imgUrl} layout='fill' objectFit='cover' priority={true} alt='jumbotron' className='rounded-xl'/>
        }
        </div>
        <div className='text-center pt-16 w-full md:w-1/2 md:pl-4'>
        <h1 className='text-2xl font-bold text-green-600 tracking-widest mb-8'>Shopedia</h1>
        <h1 className='text-2xl font-light text-green-600 tracking-widest mb-8'>
            A shopping destination to discover the latest laptops
        </h1>
        <form className='flex justify-between px-4' onSubmit={searchHandler}>
            <input className='p-2 bg-gray-50 bg-opacity-20 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm' placeholder='Find laptops' type='text' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button type='submit' className='bg-gray-50 bg-opacity-20 shadow rounded-md ml-4 px-4 font-bold text-sm'>Search</button>
        </form>
        </div>
    </div>
    )
}
export default Jumbotron