import { useContext, useState } from "react"
import { HiBell, HiMenu, HiShoppingCart } from "react-icons/hi"
import Menu from "./Header/Menu"
import { UserContext } from "./User"
import Link from 'next/link'
import RightDrawer from "./Header/RightDrawer"
import Navbar from "./Header/Navbar"

const Layout = ({children}) => {
    const [show, setShow] = useState(false)
    return(
        <div className='text-black max-w-screen-2xl mx-auto'>
            <Navbar click={()=>setShow(!show)} />
            <RightDrawer show={show} click={()=>setShow(!show)} />
            <main className='p-4'>
                {children}
            </main>
        </div>
    )
}
export default Layout