import Base from '../components/Base'
import Link from 'next/link'

const Brand = () => {
    return(
        <Base>
            <h1 className='text-center font-bold tracking-widest text-green-600 text-xl hidden md:block'>Shopedia</h1>
            <div className='mt-11'>
                <div className='flex justify-between items-center px-8 max-w-xl mx-auto mb-8'>
                    <Link href='/apple'>
                        <a className='text-2xl font-medium tracking-wider'>Apple</a>
                    </Link>
                    <Link href='/apple'>
                        <a className='bg-gray-50 bg-opacity-20 shadow rounded-md p-2 font-bold text-xs'>48 Products</a>
                    </Link>
                </div>
                <div className='flex justify-between items-center px-8 max-w-xl mx-auto mb-8'>
                    <Link href='/apple'>
                        <a className='text-2xl font-medium tracking-wider'>Lenovo</a>
                    </Link>
                    <Link href='/apple'>
                        <a className='bg-gray-50 bg-opacity-20 shadow rounded-md p-2 font-bold text-xs'>48 Products</a>
                    </Link>
                </div>
                <div className='flex justify-between items-center px-8 max-w-xl mx-auto mb-8'>
                    <Link href='/apple'>
                        <a className='text-2xl font-medium tracking-wider'>Asus</a>
                    </Link>
                    <Link href='/apple'>
                        <a className='bg-gray-50 bg-opacity-20 shadow rounded-md p-2 font-bold text-xs'>48 Products</a>
                    </Link>
                </div>
            </div>
        </Base>
    )
}
export default Brand