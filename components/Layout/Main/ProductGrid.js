import Link from 'next/link'
import Image from 'next/image'
import {HiStar} from 'react-icons/hi'
import Troley from '../Troley'

const ProductGrid = ({data}) => {
  const rating = [1,2,4]
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
            <div key={index} className='rounded-xl h-80 relative bg-white'>
              <Image src={item.imgUrl} layout='fill' objectFit='cover' alt='Laptop' className='rounded-xl' unoptimized={true}/>
              <div className='absolute bottom-0 left-0 z-10 p-2 w-full rounded-b-xl bg-black bg-opacity-80 text-white'>
                <Link href={`/product/${item.name.replace(/[ ]/g,'_')}`} key={index}>
                  <a>
                    <div className='flex flex-row'>
                      {rating.map((item,index)=>(
                        <HiStar className='w-6 h-6 mr-2' key={index}/>
                      ))}
                    </div>
                    <h1 className='text-xl capitalize font-semibold'>
                      {item.name}
                    </h1>
                    <p className='text-lg font-light mb-2'>
                      Rp. {Number(item.price).toLocaleString('ID',{'currency':'IDR'})}
                    </p>
                  </a>
                </Link>
                <Troley namaProduct={item.name} harga={item.price} />
              </div>
            </div>
          ))}
        </div>
    )
}
export default ProductGrid