import {  useState } from "react"
import { AuthUser } from "../User"
import Dash from "./Header/Dash"
import Header from "./Header/Header"
import Nav from "./Header/Nav"

const Layout = ({children}) => {
    const user = AuthUser()
    const [left, setLeft] = useState(false)

    return(
        <div className='max-w-screen-2xl mx-auto bg-gray-100 text-black tracking-wide'>
            {/*<Header click={()=>setLeft(!left)} user={user}/>
            {user && user.displayName=='admin'?
            <Dash left={left} click={()=>setLeft(!left)} user={user}/>
            :
    <Nav left={left} click={()=>setLeft(!left)} user={user}/>}*/}
            <main className='p-4 min-h-screen'>
                {children}
            </main>
        </div>
    )
}
export default Layout