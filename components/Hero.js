import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Hero = ({tagline,value,hero,produk}) => {
    const [cari, setCari] = useState('')
    const [ref, setRef] = useState('')
    const [query, setQuery] = useState([])

    const sortArray = (e) => {
        if(!e.target.value){
            setQuery([])
        } else {
            const q = produk.filter(el => el.nama.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
            setQuery(q)
        }
        setCari(e.target.value)
        setRef(e.target.value)
    }
    const chose = ({nama = String,id = String}) => {
        setRef(id)
        setCari(nama)
        setQuery([])
    }

    return(
        <header className='bg-white dark:bg-gray-800'>
        <div className="container p-6 mx-auto">
            <div className="flex flex-col-reverse md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2 md:pl-6">
                    <div className="md:max-w-lg">
                        <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">{tagline}</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{value}</p>
                        <div className="relative my-4">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>

                            <input type="text" className="w-full py-2 text-sm pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Cari Produk" onChange={(e)=>sortArray(e)} value={cari} />
                            <div className='absolute inset-x-0 top-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 z-50 rounded-lg bg-opacity-90 max-h-96 overflow-y-scroll overscroll-y-none hide'>
                            <style jsx>{`
                            .hide::-webkit-scrollbar {
                                display: none;
                            }
                            .hide{
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                            `}</style>
                            {query.map((item,index)=>(
                                <div key={index} className='border-b border-gray-700 dark:border-gray-200 py-2 px-3 cursor-pointer' onClick={()=>{chose({nama:item.nama,id:item.id})}}>
                                    <p>{item.nama}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        <Link href={ref==''?'#':'/produk/'+ref}>
                        <a className="w-full px-3 py-2 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                            {cari==''?'Cari Produk':'Lihat Produk'}
                        </a>
                        </Link>
                    </div>
                </div>
        
                <div className="flex items-center justify-center w-full mb-6 lg:mt-0 md:w-1/2 relative h-96">
                    <Image src={hero} layout='fill' objectFit='cover' priority={true} alt='New fashion' unoptimized/>
                </div>
            </div>
        </div>
        </header>
    )
}
export default Hero