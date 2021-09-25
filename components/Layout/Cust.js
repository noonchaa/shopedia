import { useState } from "react"
import Header from "./Header/Header"
import Nav from "./Header/Nav"

const Cust = ({children}) => {
    const [right, setRight] = useState(false)
    return(
        <div className='max-w-screen-2xl mx-auto bg-gray-50 text-black tracking-wide'>
            <Header click={()=>setRight(!right)}/>
            <Nav right={right} click={()=>setRight(!right)}/>
            <main className='px-4 h-screen'>
                {children}
            </main>
        </div>
    )
}
export default Cust