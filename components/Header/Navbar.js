import Menu from "./Menu"
import Link from 'next/link'
import {HiMenu, HiBell, HiShoppingCart} from 'react-icons/hi'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../User"
import LeftDrawer from "./LeftDrawer"
import { doc, onSnapshot } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"

const Navbar = ({click}) => {
    const user = useContext(UserContext)
    const [show, setShow] = useState(false)
    const [cartData, setCartData] = useState([])

    useEffect(()=>{
        if(user){
            onSnapshot(doc(db,'users',user.displayName.toLowerCase()),(doc)=>{
                setCartData(doc.data().cart)
            })
        }
    },[user])

    return(
        <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
            <Menu className='flex' click={click}>
                <HiMenu className='w-5 h-5'/>
                <h1>Menu</h1>
            </Menu>
            {!user?
            <Menu>
                <Link href='/user/login'>
                    <a>Log In . SignUp</a>
                </Link>
            </Menu>
            :user.displayName=='admin'?
            <Menu className='relative pr-2 animate-pulse'>
                <HiBell className='w-5 h-5'/>
            </Menu>
            :
            <>
            <Menu className='pr-4 relative' click={()=>setShow(!show)}>
                <HiShoppingCart className='h-5 w-5'/>
                <p className='absolute top-0 right-0 mr-1'>{cartData.length}</p>
            </Menu>
            <LeftDrawer show={show} click={()=>setShow(!show)} cart={cartData} />
            </>
            }
        </header>
    )
}
export default Navbar