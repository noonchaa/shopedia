import Image from 'next/image'

const Fall = () => {
    return(
        <header className='bg-white dark:bg-gray-800'>
        <div className="container px-6 py-16 mx-auto">
            <div className="items-center lg:flex">
                <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 relative h-80">
                    <Image src='/blur.png' layout='fill' objectFit='cover' alt='blur' className='bg-gray-400 opacity-10 animate-pulse'/>
                </div>
        
                <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 relative h-80">
                    <Image src='/blur.png' layout='fill' objectFit='cover' alt='blur' className='bg-gray-400 opacity-10 animate-pulse'/>
                </div>
            </div>
        </div>
        </header>
    )
}
export default Fall