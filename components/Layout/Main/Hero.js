import Image from 'next/image'
import { useState } from 'react'

const Hero = ({imgUrl}) => {
    const [search, setSearch] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()
    }

    return(
        <div className='flex flex-col md:flex-row'>
            <div className='relative w-full h-96 md:w-1/2 z-40'>
                {!imgUrl?
                <h1 className='text-center font-semibold italic'>... Loading ...</h1>
                :
                <Image src={imgUrl} layout='fill' objectFit='cover' priority={true} alt='jumbotron' className='rounded-xl'/>
                }
            </div>
            <div className='text-center w-full md:w-1/2 md:pl-4 flex flex-col justify-center items-center py-16 md:py-0'>
                <h1 className='text-6xl tracking-widest mb-8 font-medium'>Shopedia</h1>
                <h1 className='text-2xl font-light tracking-widest mb-8'>
                    A shopping destination to discover the latest laptops
                </h1>
                <form className='flex justify-between px-4 w-full' onSubmit={searchHandler}>
                    <input className='p-2 bg-gray-50 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-black text-sm' placeholder='Find laptops' type='text' value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button type='submit' className='shadow rounded-md ml-4 px-4 font-bold text-sm bg-gray-50'>Search</button>
                </form>
            </div>
        </div>
    )
}
export default Hero