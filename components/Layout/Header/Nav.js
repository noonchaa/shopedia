import Image from 'next/image'
import { HiX } from "react-icons/hi"

const Nav = ({right,click}) => {

    return(
        <nav className={right==false?'hidden':'fixed top-0 bg-gray-50 shadow-xl h-screen w-80 z-50'}>
            <div className='px-4 py-2'>
                <div className='flex justify-between'>
                    <div className='w-full flex md:hidden pb-2 mb-2'>
                        <div className='relative w-9 h-9'>
                            <Image src='/logo/logo.svg' layout='fill' objectFit='contain' alt='Logo'/>
                        </div>
                        <h1 className='text-3xl font-semibold font-mono ml-4'>Shopedia</h1>
                    </div>
                    <div className='bg-gray-200 rounded-xl px-4 cursor-pointer w-min ml-auto h-10' onClick={click}>
                        <HiX className='w-9 h-9'/>
                    </div>
                </div>
                <div className='font-normal'>
                    <p>Home</p>
                </div>
            </div>
        </nav>
    )
}
export default Nav