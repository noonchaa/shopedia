import Menu from "./Menu"
import Link from 'next/link'
import {HiMenu, HiBell, HiShoppingCart} from 'react-icons/hi'
import { useEffect, useState } from "react"
import { AuthUser} from "../User"
import LeftDrawer from "./LeftDrawer"
import { collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"
import RightDrawer from "./RightDrawer"

const Navbar = () => {
    const user = AuthUser()
    const [right, setRight] = useState(false)
    const [left, setLeft] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(()=>{
        if(user){
            onSnapshot(collection(db,user.displayName.toLowerCase()),(doc)=>{
                const data = []
                doc.forEach((isi)=>{
                    data.push(isi.data())
                })
                setCart(data)
            })
        }
        return () => {
            setCart([])
        }
    },[user])

    return(
        <header className='max-w-screen-2xl mx-auto fixed top-0 p-4 z-50 flex justify-between w-full'>
            <Menu className='flex' click={()=>setRight(!right)}>
                <HiMenu className='w-5 h-5'/>
                <h1>Menu</h1>
            </Menu>
            <RightDrawer show={right} click={()=>setRight(!right)} user={user}/>
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
            <Menu className='pr-4 relative' click={()=>setLeft(!left)}>
                <HiShoppingCart className='h-5 w-5'/>
                <p className='absolute top-0 right-0 mr-1'>{cart.length}</p>
            </Menu>
            <LeftDrawer show={left} click={()=>setLeft(!left)} cart={cart} user={user?user.displayName.toLowerCase():''} />
            </>
            }
        </header>
    )
}
export default Navbar