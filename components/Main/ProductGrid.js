import Link from 'next/link'
import Image from 'next/image'
import {HiStar, HiShoppingCart} from 'react-icons/hi'

const ProductGrid = ({data}) => {
    if(!data){
        return(
            <div className='h-60 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-5xl text-green-600 animate-pulse'>...</h1>
                <h1 className='font-semibold tracking-wide'>Loading</h1>
            </div>
        )
    }
    return(
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
          {data.map((item,index)=>(
            <Link href={`/product/${item.name.replace(/[ ]/g,'_')}`} key={index}>
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
    )
}
export default ProductGrid