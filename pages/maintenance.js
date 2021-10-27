import Image from 'next/image'

const Maintenance = () => {
    return(
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='px-6'>
            <div className='relative w-80 h-96 mx-auto'>
                <Image src='/svg/server.svg' layout='fill' objectFit='contain' alt='maintenance'/>
            </div>
            <h1 className='text-center font-bold text-2xl text-red-600'>Maintenance Server</h1>
            <h2 className='text-center font-light text-xl italic text-gray-700'>Mohon kembali beberapa saat lagi</h2>
            </div>
        </div>
    )
}
export default Maintenance