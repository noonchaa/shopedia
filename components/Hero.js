import Image from 'next/image'

const Hero = ({tagline,value,hero}) => {
    return(
        <header className='bg-white dark:bg-gray-800'>
        <div className="container px-6 py-16 mx-auto">
            <div className="items-center lg:flex">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">{tagline}</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{value}</p>
                        <button className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                            <a href='#produk'>Mulai Belanja</a>
                        </button>
                    </div>
                </div>
        
                <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 relative h-80">
                    <Image src={hero} layout='fill' objectFit='cover' priority={true} alt='New fashion' unoptimized/>
                </div>
            </div>
        </div>
        </header>
    )
}
export default Hero