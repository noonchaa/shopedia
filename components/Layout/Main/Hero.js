import Image from 'next/image'

const Hero = ({imgUrl}) => {
    return(
        <div className='flex flex-col md:flex-row'>
            <div className='relative w-full h-96 md:w-1/2 z-40'>
                {!imgUrl?
                <h1 className='text-center font-semibold italic'>... Loading ...</h1>
                :
                <Image src={imgUrl} layout='fill' objectFit='cover' priority={true} alt='jumbotron' className='rounded-xl'/>
                }
            </div>

        </div>
    )
}
export default Hero