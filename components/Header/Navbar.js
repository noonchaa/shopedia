import Menu from "./Menu"
import Link from 'next/link'
import {HiMenu, HiBell, HiShoppingCart} from 'react-icons/hi'
import { useContext } from "react"
import { UserContext } from "../User"

const Navbar = ({click}) => {
    const user = useContext(UserContext)
    return(
        <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
            <Menu className='flex' click={click}>
                <HiMenu className='w-5 h-5'/>
                <h1>Menu</h1>
            </Menu>
            {!user?
            <Menu>
                <Link href='/login'>
                    <a>Log In . SignUp</a>
                </Link>
            </Menu>
            :user.displayName=='admin'?
            <Menu className='relative pr-2 animate-pulse'>
                <HiBell className='w-5 h-5'/>
            </Menu>
            :
            <Menu className='relative pr-4'>
                <HiShoppingCart className='h-5 w-5'/>
                <p className='absolute top-0 right-0 mr-1'>2</p>
            </Menu>
            }
        </header>
    )
}
export default Navbar