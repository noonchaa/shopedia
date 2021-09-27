import { useEffect, useState } from "react"
import { AuthUser } from "../User"
import { collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"
import Cart from "./Header/Cart"
import Dash from "./Header/Dash"
import Header from "./Header/Header"
import Nav from "./Header/Nav"

const Layout = ({children}) => {
    const user = AuthUser()
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(()=>{
        onSnapshot(collection(db,!user?'no user':user.displayName.toLowerCase()),(doc)=>{
            const data = []
            doc.forEach((item)=>{
                data.push(item.data())
            })
            setCart(data)
        })
        return () => {
            setCart([])
        }
    },[user])

    return(
        <div className='max-w-screen-2xl mx-auto bg-gray-100 text-black tracking-wide'>
            <Header click={()=>setLeft(!left)} bag={()=>setRight(!right)} user={user} cart={cart}/>
            {user && user.displayName=='admin'?
            <Dash left={left} click={()=>setLeft(!left)} user={user}/>
            :
            <Nav left={left} click={()=>setLeft(!left)} user={user}/>}
            <Cart right={right} click={()=>setRight(!right)} user={user} cart={cart}/>
            <main className='p-4 h-screen'>
                {children}
            </main>
        </div>
    )
}
export default Layout