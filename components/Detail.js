import Image from 'next/image'
import { useState } from 'react'
import AddCart from './AddCart'

const Detail = ({data}) => {
    const {foto,nama,desc,harga,warna,berat,size,id} = data
    const [uk, setUk] = useState(size[0])
    return(
        <header className='bg-white dark:bg-gray-800'>
        <div className="container px-6 py-16 mx-auto">
            <div className="items-center lg:flex"><div className='w-full md:w-1/2 mb-4'>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-96 bg-gray-300 rounded-lg shadow-md relative">
                            <Image src={foto} alt='produk' priority={true} layout='fill' objectFit='cover' className='rounded-lg shadow-md'/>
                        </div>
                        <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 z-10 md:w-80">
                            <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{id}</h3>
                            <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                <span className="font-bold text-gray-800 dark:text-gray-200">Rp. {Number(harga).toLocaleString('ID',{'currency':'IDR'})}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-6">
                    <div className="lg:max-w-lg">
                        <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl mb-6">{nama}</h1>
                        <h2 className='text-xl font-semibold text-gray-600 dark:text-gray-400'>{desc}</h2>
                        <h2 className='text-xl font-semibold text-gray-600 dark:text-gray-400 capitalize'>Warna : {warna}</h2>
                        <h2 className='text-xl font-semibold text-gray-600 dark:text-gray-400'>Berat : {berat} gram</h2>
                        <div className='flex justify-start my-4'>
                        {size.map((item,index)=>(
                            <div className={item==uk?'w-8 h-8 rounded-full bg-indigo-600 flex justify-center items-center mr-4 cursor-pointer hover:bg-indigo-500':'w-8 h-8 rounded-full bg-gray-800 dark:bg-white flex justify-center items-center mr-4 cursor-pointer hover:bg-indigo-600 dark:hover:bg-gray-100'} key={index} onClick={()=>setUk(item)}>
                                <p className='font-semibold text-white uppercase dark:text-gray-800'>{item}</p>
                            </div>
                        ))}
                        </div>
                        <AddCart dark id={id} nama={nama} harga={harga} size={!uk?'':uk} warna={warna} foto={foto} berat={berat}/>
                    </div>
                </div>
            </div>
        </div>
        </header>
    )
}
export default Detail