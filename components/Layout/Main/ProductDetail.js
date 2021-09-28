import Image from 'next/image'
import {HiStar} from 'react-icons/hi'
import Troley from '../Troley'

const ProductDetail = ({data}) => {
    const rating = [1,2,5,8]
    if(!data){
        return(
            <div className='h-60 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-5xl animate-pulse'>...</h1>
                <h1 className='font-semibold tracking-wide'>Loading</h1>
            </div>
        )
    }
    return(
        <>
        <div className='grid grid-cols-1 md:grid-cols-2 mb-8 bg-white rounded-xl'>
            <div className='h-96 relative'>
                <Image src={data.imgUrl} layout='fill' objectFit='cover' priority={true} quality={90} alt='Product' className='rounded-t-xl md:rounded-l-xl md:rounded-tr-none' unoptimized={true}/>
            </div>
            <div className='p-4'>
                <div className='flex flex-row mb-1'>
                    {rating.map((item,index)=>(
                    <HiStar className='w-6 h-6 mr-2' key={index}/>
                    ))}
                </div>
                <h1 className='text-2xl capitalize font-semibold mb-2'>{data.brand} {data.name}</h1>
                <h1 className='text-lg font-light mb-2'>Rp. {Number(data.price).toLocaleString('ID',{'currency':'IDR'})}</h1>
                <h2 className='font-medium'>CPU : <span className='font-medium italic'>{data.cpu}</span></h2>
                <h2 className='font-medium'>RAM : <span className='font-medium italic'>{data.ram}</span></h2>
                <h2 className='font-medium'>GPU : <span className='font-medium italic'>{data.gpu}</span></h2>
                <h2 className='font-medium'>DISK : <span className='font-medium italic'>{data.disk}</span></h2>
                <h2 className='font-medium'>SCREEN : <span className='font-medium italic'>{data.screen}</span></h2>
                <h2 className='font-medium'>BATTERY : <span className='font-medium italic'>{data.battery}</span></h2>
                <h2 className='font-medium mb-4'>OS : <span className='font-medium italic'>{data.OS}</span></h2>
                <Troley namaProduct={data.name} harga={data.price} />
            </div>
        </div>
        <div className='mt-4 md:mt-0'>
            <h1 className='text-2xl capitalize font-medium mb-2'>Deskripsi</h1>
            <p>{data.descriptions}</p>
        </div>
        </>
    )
}
export default ProductDetail