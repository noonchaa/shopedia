import Layout from "../components/Layout"
import Image from 'next/image'
import { AiFillStar,AiOutlineShoppingCart } from 'react-icons/ai'
import Product from "../components/Product"

const Item = () => {
    return(
        <Layout>
            <div className='grid grid-cols-1 md:grid-cols-2 mb-8 bg-gray-100'>
                <div className='h-60 relative'>
                    <Image src='/image.jpg' layout='fill' objectFit='cover' priority={true} quality={90} alt='Product'/>
                </div>
                <div className='p-4'>
                    <AiFillStar className='w-10 h-10 text-green-500 mb-2'/>
                    <h1 className='text-2xl capitalize font-semibold'>MacBook Air</h1>
                    <h1 className='text-lg font-light'>Rp. 14.000.000</h1>
                    <AiOutlineShoppingCart className='w-12 h-12 cursor-pointer mt-4'/>
                </div>
            </div>
            <div className='px-4 grid grid-cols-1 md:grid-cols-2'>
                <div>
                    <h1 className='text-2xl capitalize font-medium mb-2'>Spesifikasi</h1>
                    <h2 className='font-medium'>CPU : <span className='font-medium italic'>AMD Ryzen 7 4.5Ghz 8 Core</span></h2>
                    <h2 className='font-medium'>RAM : <span className='font-medium italic'>16GB DDR4</span></h2>
                    <h2 className='font-medium'>GPU : <span className='font-medium italic'>Radeon Vega 11 Dedicated</span></h2>
                    <h2 className='font-medium'>SCREEN : <span className='font-medium italic'>14 Inch</span></h2>
                    <h2 className='font-medium'>BATTERY : <span className='font-medium italic'>12.000 Watt 20 hours</span></h2>
                    <h2 className='font-medium'>OS : <span className='font-medium italic'>Windows 10 Enterprice</span></h2>
                </div>
                <div className='mt-4 md:mt-0'>
                    <h1 className='text-2xl capitalize font-medium mb-2'>Deskripsi</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus, nisl maximus consectetur luctus, diam magna pretium nulla, in bibendum orci leo ac lorem. Pellentesque porta sodales libero, in condimentum purus consequat sed. Nullam scelerisque ante sed ligula vulputate suscipit. Suspendisse eget eros eu augue vehicula fermentum. Vestibulum id iaculis sem. Etiam purus metus, suscipit sit amet urna eu, tempus hendrerit massa. Cras elementum purus ac orci dapibus, sit amet ullamcorper mi feugiat. Nunc consequat, est nec sollicitudin blandit, orci tellus feugiat nisl, non convallis risus ex id turpis. Phasellus purus magna, eleifend condimentum justo quis, hendrerit iaculis lorem. Maecenas eu elementum mauris, non lacinia lorem. Donec dapibus dolor ut porttitor pharetra.
                    </p>
                </div>
            </div>
            <Product/>
        </Layout>
    )
}

export default Item