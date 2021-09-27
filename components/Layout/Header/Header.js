import {HiShoppingBag,HiMenuAlt1, HiBell} from 'react-icons/hi'
import Link from 'next/link'

const Header = ({click,bag,user,cart}) => {

    return(
        <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
            <button className='py-1 pr-4 pl-2 bg-black text-white rounded-xl shadow flex items-center' onClick={click}>
                <HiMenuAlt1 className='h-6 w-6'/>
                <p className='text-lg font-medium'>Menu</p>
            </button>
            {user && user.displayName!='admin'?
            <button className='py-1 px-4 bg-black text-white rounded-xl shadow flex items-center' onClick={bag}>
                <HiShoppingBag className='h-6 w-6'/>
                <p className='text-lg font-medium ml-2'>{cart.length}</p>
            </button>
            :user && user.displayNam=='admin'?
            <button className='py-1 px-4 bg-black text-white rounded-xl shadow flex items-center' onClick={bag}>
                <HiBell className='h-6 w-6'/>
                <p className='text-lg font-medium'>2</p>
            </button>
            :
            <button className='py-1 px-4 bg-black text-white rounded-xl shadow flex items-center'>
                <Link href='/user/login'>
                    <a className='text-lg font-medium tracking-wider'>Login</a>
                </Link>
            </button>}
        </header>
    )
}
export default Header