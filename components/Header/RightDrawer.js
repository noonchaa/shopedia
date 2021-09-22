import { HiX } from "react-icons/hi"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../User"
import { allDocs, LogOut } from "../../utils/firebaseHandler"
import Route from "./Route"

const RightDrawer = ({show,click}) => {
    const user = useContext(UserContext)
    const adminLink = ['stock','order','packing','delivery','delivered','finished','incoming','new_product','add_admin','remove_admin']
    const [brand, setBrand] = useState([])

    useEffect(()=>{
        const getStocks = async () => {
            const data = []
            await allDocs('stocks',data)
            setBrand(data.map(item=>item.brand).filter((item,index,self)=>self.indexOf(item)===index))
        }
        getStocks()
    },[])

    return(
        <aside className={show==false?'hidden':'fixed top-0 p-4 z-50 w-full h-screen max-w-xs bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
            <HiX className='text-red-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={click}/>
            <h1 className='text-2xl font-bold text-green-600 tracking-widest mb-4 pl-4'>Shopedia</h1>
            <div className='pl-4 flex flex-col'>
                <Route path='/' name='home'/>
                {!user?
                    brand.map((item,index)=>(
                        <Route path={'/brand/'+item} name={item} key={index}/>
                    ))
                    :user.displayName=='admin'?
                    adminLink.map((item,index)=>(
                        <Route path={'/dashboard/'+item} name={item.replace(/[_]/g,' ')} key={index}/>
                    ))
                    :
                    <>
                    {brand.map((item,index)=>(
                        <Route path={'/brand/'+item} name={item} key={index}/>
                    ))}
                    <Route path='/user/profile' name='profile'/>
                    </>
                }
                <Route path='/help' name='FAQ'/>
                <Route path='/term' name='TOS'/>
                <a href='mailto:yonoraphael@gmail.com' className='font-semibold mb-2 text-green-600'>Contact</a>
                {!user?
                    ''
                    :
                    <h1 className='text-green-600 font-semibold mb-2 cursor-pointer' onClick={()=>LogOut()}>Log Out</h1>
                }
                <p className='text-sm font-semibold text-center w-full absolute bottom-0 text-green-600'>shopedia @2021</p>
            </div>
        </aside>
    )
}
export default RightDrawer