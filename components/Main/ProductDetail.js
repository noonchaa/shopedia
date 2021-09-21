import Image from 'next/image'
import {HiStar, HiShoppingCart} from 'react-icons/hi'

const ProductDetail = ({data}) => {
    if(!data){
        return(
            <div className='h-60 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-5xl text-green-600 animate-pulse'>...</h1>
                <h1 className='font-semibold tracking-wide'>Loading</h1>
            </div>
        )
    }
    return(
        <>
        <div className='grid grid-cols-1 md:grid-cols-2 mb-8 bg-gray-100 rounded-xl'>
            <div className='h-96 relative'>
                <Image src={data.imgUrl} layout='fill' objectFit='cover' priority={true} quality={90} alt='Product' className='rounded-t-xl md:rounded-l-xl md:rounded-tr-none'/>
            </div>
            <div className='p-4'>
                <HiStar className='w-10 h-10 text-green-500 mb-2'/>
                <h1 className='text-2xl capitalize font-semibold'>{data.brand}</h1>
                <h1 className='text-2xl capitalize font-semibold'>{data.name}</h1>
                <h1 className='text-lg font-light'>Rp. {Number(data.price).toLocaleString('ID',{'currency':'IDR'})}</h1>
                <HiShoppingCart className='w-12 h-12 cursor-pointer mt-4'/>
            </div>
        </div>
        <div className='px-4 grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h1 className='text-2xl capitalize font-medium mb-2'>Spesifikasi</h1>
                <h2 className='font-medium'>CPU : <span className='font-medium italic'>{data.cpu}</span></h2>
                <h2 className='font-medium'>RAM : <span className='font-medium italic'>{data.ram}</span></h2>
                <h2 className='font-medium'>GPU : <span className='font-medium italic'>{data.gpu}</span></h2>
                <h2 className='font-medium'>DISK : <span className='font-medium italic'>{data.disk}</span></h2>
                <h2 className='font-medium'>SCREEN : <span className='font-medium italic'>{data.screen}</span></h2>
                <h2 className='font-medium'>BATTERY : <span className='font-medium italic'>{data.battery}</span></h2>
                <h2 className='font-medium'>OS : <span className='font-medium italic'>{data.OS}</span></h2>
            </div>
            <div className='mt-4 md:mt-0'>
                <h1 className='text-2xl capitalize font-medium mb-2'>Deskripsi</h1>
                <p>{data.descriptions}</p>
            </div>
        </div>
        </>
    )
}
export default ProductDetail