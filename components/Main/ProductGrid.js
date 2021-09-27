import Link from 'next/link'
import Image from 'next/image'
import {HiStar} from 'react-icons/hi'
import Troley from '../part/Troley'

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
            <div key={index} className='rounded-lg h-80 relative'>
              <Image src={item.imgUrl} layout='fill' objectFit='cover' alt='Laptop' className='rounded-lg'/>
              <div className='absolute bottom-0 left-0 z-10 p-2 w-full rounded-b-lg bg-gray-50 bg-opacity-90'>
                <Link href={`/product/${item.name.replace(/[ ]/g,'_')}`} key={index}>
                  <a>
                    <HiStar className='text-green-600 w-6 h-6'/>
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