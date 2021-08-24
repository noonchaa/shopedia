import Image from 'next/image'

const Jumbotron = () => {
    return(
        <div className='h-96 relative'>
            <Image src='/image.jpg' priority={true} layout='fill' objectFit='cover' quality={100} alt='New Product'/>
        </div>
    )
}
export default Jumbotron