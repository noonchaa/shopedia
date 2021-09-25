import Image from 'next/image'

const ServerError = () => {
    return(
        <div>
            <div className='relative p-4 mt-16 max-w-xs mx-auto h-80'>
            <Image src='/svg/server.svg' layout='fill' objectFit='cover' alt='Server Down'/>
            </div>
            <h1 className='text-center mt-4 text-2xl text-red-600 font-medium'>Maintenance server</h1>
            <p className='text-center mt-3 font-medium italic'>Kami akan segera kembali online</p>
        </div>
    )
}
export default ServerError