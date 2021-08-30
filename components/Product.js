import Image from 'next/image'
import { AiFillStar,AiOutlineShoppingCart } from 'react-icons/ai'
import Link from 'next/link'

const Product = () => {
    return(
        <div className='mx-4 mt-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8'>
            <Link href='/item'>
            <a className='bg-gray-100 rounded-lg'>
                <div className='relative h-40 mb-2'>
                    <Image src='/image.jpg' layout='fill' objectFit='cover' quality={80} alt='Laptop' className='rounded-t-lg' />
                </div>
                <div className='px-2 pb-2 flex justify-between items-center'>
                    <div>
                        <AiFillStar className='text-green-600 w-8 h-8' />
                        <h1 className='text-2xl capitalize font-semibold'>MacBook Air</h1>
                        <h1 className='text-lg font-light'>Rp. 14.000.000</h1>
                    </div>
                    <AiOutlineShoppingCart className='w-12 h-12 cursor-pointer'/>
                </div>
            </a>
            </Link>
            <div className='bg-gray-100 rounded-lg'>
                <div className='relative h-40 mb-2'>
                    <Image src='/image.jpg' layout='fill' objectFit='cover' quality={80} alt='Laptop' className='rounded-t-lg' />
                </div>
                <div className='px-2 pb-2 flex justify-between items-center'>
                    <div>
                        <AiFillStar className='text-green-600 w-8 h-8' />
                        <h1 className='text-2xl capitalize font-semibold'>MacBook Air</h1>
                        <h1 className='text-lg font-light'>Rp. 14.000.000</h1>
                    </div>
                    <AiOutlineShoppingCart className='w-12 h-12 cursor-pointer'/>
                </div>
            </div>
            <div className='bg-gray-100 rounded-lg'>
                <div className='relative h-40 mb-2'>
                    <Image src='/image.jpg' layout='fill' objectFit='cover' quality={80} alt='Laptop' className='rounded-t-lg' />
                </div>
                <div className='px-2 pb-2 flex justify-between items-center'>
                    <div>
                        <AiFillStar className='text-green-600 w-8 h-8' />
                        <h1 className='text-2xl capitalize font-semibold'>MacBook Air</h1>
                        <h1 className='text-lg font-light'>Rp. 14.000.000</h1>
                    </div>
                    <AiOutlineShoppingCart className='w-12 h-12 cursor-pointer'/>
                </div>
            </div>
            <div className='bg-gray-100 rounded-lg'>
                <div className='relative h-40 mb-2'>
                    <Image src='/image.jpg' layout='fill' objectFit='cover' quality={80} alt='Laptop' className='rounded-t-lg' />
                </div>
                <div className='px-2 pb-2 flex justify-between items-center'>
                    <div>
                        <AiFillStar className='text-green-600 w-8 h-8' />
                        <h1 className='text-2xl capitalize font-semibold'>MacBook Air</h1>
                        <h1 className='text-lg font-light'>Rp. 14.000.000</h1>
                    </div>
                    <AiOutlineShoppingCart className='w-12 h-12 cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}
export default Product