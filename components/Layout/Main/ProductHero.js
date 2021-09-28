import Image from 'next/image'

const ProductHero = ({data}) => {
    if(!data){
        return(
            <div className='h-60 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-5xl text-green-600 animate-pulse'>...</h1>
                <h1 className='font-semibold tracking-wide'>Loading</h1>
            </div>
        )
    }
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 mb-8 rounded-xl bg-white'>
            <div className='h-96 relative'>
                <Image src={data.imgUrl} layout='fill' objectFit='cover' priority={true} quality={90} alt='Product' className='rounded-t-xl md:rounded-l-xl md:rounded-tr-none' unoptimized={true}/>
            </div>
            <div className='p-4 flex flex-col justify-center'>
                <h1 className='text-2xl capitalize font-semibold mb-2'>{data.brand}</h1>
                <h1 className='text-2xl capitalize font-semibold mb-2'>{data.name}</h1>
                <p className='text-lg font-light'>{data.descriptions}</p>
            </div>
        </div>
    )
}
export default ProductHero