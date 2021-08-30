import { useState } from "react"
import {CgMenuRightAlt,CgMenuRight} from 'react-icons/cg'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Cart from "./Cart"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [cart, setCart] = useState(false)

    const Menu = () => {
        return(
            <div className='flex justify-evenly align-middle pb-4 md:pb-0'>
                <Link href='/login'>
                    <a className='bg-green-600 rounded-md px-4 py-1 text-white text-lg font-semibold tracking-wider ml-4'>
                        Login
                    </a>
                </Link>
                <Link href='/register'>
                    <a className='bg-green-600 rounded-md px-4 py-1 text-white text-lg font-semibold tracking-wider ml-4'>
                    Register
                    </a>
                </Link>
                <div className='relative ml-4' onClick={()=>setCart(!cart)}>
                    <AiOutlineShoppingCart className='w-8 h-8 cursor-pointer'/>
                    <div className='absolute top-0 right-0 p-px bg-green-500 rounded-full'>
                        <p className='font-bold text-base leading-4 text-white'>2</p>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className='bg-gray-200 relative'>
            <div className='flex justify-between align-middle px-4 py-3'>
                <Link href='/'>
                    <a className='text-4xl font-semibold text-green-500'>
                        Shopedia
                    </a>
                </Link>
                <div className='md:hidden' onClick={()=>setOpen(!open)}>
                    {open==false?
                    <CgMenuRightAlt className='w-10 h-10 text-green-500'/>:
                    <CgMenuRight className='w-10 h-10 text-green-500'/>}
                </div>
                <div className='hidden md:block'>
                    <Menu/>
                </div>
            </div>
            <div className={open==false?'hidden':'block md:hidden'}>
                <Menu/>
            </div>
            <div className={cart==false?'hidden':'absolute top-28 md:top-16 right-0 z-20'}>
                <Cart batal={()=>setCart(!cart)}/>
            </div>
        </div>
    )
}
export default Navbar