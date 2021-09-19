import { HiX } from "react-icons/hi"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../User"
import { collection, getDocs } from "@firebase/firestore"
import { auth, db } from "../../utils/firebaseClient"
import { signOut } from "@firebase/auth"

const RightDrawer = ({show,click}) => {
    const router = useRouter()
    const user = useContext(UserContext)
    const adminLink = ['stock','order','packing','delivery','delivered','finished','incoming','new_product','add_admin','remove_admin']
    const [brand, setBrand] = useState([])

    useEffect(()=>{
        const getStocks = async () => {
            const res = await getDocs(collection(db, 'stocks'))
            const data = []
            res.forEach((doc)=>{
                data.push(doc.data())
            })
            setBrand(data.map(item=>item.brand).filter((item,index,self)=>self.indexOf(item)===index))
        }
        getStocks()
    },[])

    return(
        <aside className={show==false?'hidden':'fixed top-0 p-4 z-50 w-full h-screen max-w-xs bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur'}>
            <HiX className='text-green-600 h-5 w-5 ml-auto mb-4 cursor-pointer' onClick={click}/>
            <div className='pl-4 flex flex-col tracking-wider capitalize'>
                <Link href='/'>
                    <a className={router.asPath=='/'?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>Home</a>
                </Link>
                {!user?
                brand.map((item,index)=>(
                    <Link href={'/brand/'+item} key={index}>
                        <a className={router.asPath==('/brand'+item)?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>
                            {item}
                        </a>
                    </Link>
                ))
                :user.displayName=='admin'?
                adminLink.map((item,index)=>(
                    <Link href={'/dashboard/'+item} key={index}>
                        <a className={router.asPath==('/dashboard/'+item)?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>
                            {item.replace(/[_]/g,' ')}
                        </a>
                    </Link>
                ))
                :
                <>
                {brand.map((item,index)=>(
                    <Link href={'/brand/'+item} key={index}>
                        <a className={router.asPath==('/brand'+item)?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>
                            {item}
                        </a>
                    </Link>
                ))}
                <Link href='/profile'>
                    <a className={router.asPath=='/profile'?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>Profile</a>
                </Link>
                </>
                }
                <Link href='/help'>
                    <a className={router.asPath=='/help'?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>FAQ</a>
                </Link>
                <Link href='/term'>
                    <a className={router.asPath=='/term'?'font-bold mb-2':'font-semibold mb-2 text-green-600'}>TOS</a>
                </Link>
                <a href='mailto:yonoraphael@gmail.com' className='font-semibold mb-2 text-green-600'>Contact</a>
                <h1 className='text-green-600 font-semibold mb-2 cursor-pointer' onClick={()=>signOut(auth)}>Log Out</h1>
                <p className='text-sm font-semibold text-center w-full absolute bottom-0 text-green-600'>shopedia @2021</p>
            </div>
        </aside>
    )
}
export default RightDrawer