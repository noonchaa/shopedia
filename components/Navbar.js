import { useState } from "react"
import {CgMenuRightAlt,CgMenuRight} from 'react-icons/cg'
import Link from 'next/link'

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const Menu = () => {
        return(
            <div className='flex justify-evenly align-middle'>
                <Link href='/login'>
                    <a className='bg-green-600 rounded-md px-4 py-1 text-white text-lg font-semibold tracking-wider ml-4'>
                        Login
                    </a>
                </Link>
                <Link href='/login'>
                    <a className='bg-green-600 rounded-md px-4 py-1 text-white text-lg font-semibold tracking-wider ml-4'>
                    Register
                    </a>
                </Link>
            </div>
        )
    }
    return(
        <div className='bg-gray-200'>
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
        </div>
    )
}
export default Navbar