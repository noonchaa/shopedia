import Image from 'next/image'
import {HiShoppingBag,HiMenuAlt1} from 'react-icons/hi'
import { useEffect, useState } from "react"

const Header = ({click,bag}) => {
    const [pos, setPos] = useState(0)
    const [scrol, setScrol] = useState(false)

    useEffect(()=>{
        const listenScroll = (e) => {
            let start = window.scrollY
            if(start > pos){
                setScrol(true)
            } else {
                setScrol(false)
            }
        }
        window.addEventListener('scroll',listenScroll)
        return () => {
            window.removeEventListener('scroll',listenScroll)
        }
    },[pos])

    return(
        <div className={scrol==false?'sticky top-0 z-50':'sticky top-0 shadow-xl z-50'}>
        <header className='px-4 py-2 bg-gray-50 flex justify-between'>
            <div className='flex justify-center bg-gray-200 rounded-xl px-4 cursor-pointer' onClick={click}>
                <HiMenuAlt1 className='w-9 h-9'/>
                <p className='font-medium ml-1 text-2xl'>Menu</p>
            </div>
            <div className='w-full justify-center hidden md:flex'>
                <div className='relative w-9 h-9'>
                    <Image src='/logo/logo.svg' layout='fill' objectFit='contain' alt='Logo'/>
                </div>
                <h1 className='text-3xl font-semibold font-mono ml-4'>Shopedia</h1>
            </div>
            <div className='flex justify-center bg-gray-200 rounded-xl px-4 cursor-pointer' onClick={bag}>
                <HiShoppingBag className='w-9 h-9'/>
                <p className='font-medium ml-1'>2</p>
            </div>
        </header>
        </div>
    )
}
export default Header