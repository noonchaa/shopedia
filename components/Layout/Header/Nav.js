import { signOut } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { HiHome, HiX, HiDocumentText, HiClipboardList, HiAtSymbol, HiLogout, HiDesktopComputer } from "react-icons/hi"
import { auth, db } from '../../../utils/firebaseClient'
import Route from '../Route'

const Nav = ({left,click,user}) => {
    const [product, setProduct] = useState([])

    useEffect(()=>{
        getDocs(collection(db,'products')).then((doc)=>{
            const data = []
            doc.forEach((item)=>{
                data.push(item.data().brand)
            })
            setProduct(data.filter((item,index,self)=>self.indexOf(item)===index))
        }).catch(()=>setProduct([]))
        return () => {
            setProduct([])
        }
    },[user])

    return(
        <nav className={left==false?'hidden':'fixed top-0 bg-gray-50 shadow-xl w-60 z-50 min-h-screen p-4'}>
            <button className='py-1 px-2 bg-black text-white rounded-xl shadow flex items-center absolute right-4 top-4' onClick={click}>
                <HiX className='h-6 w-6'/>
            </button>
            <div className='flex mb-4'>
                <Image src='/logo/logo.svg' width={32} height={32} alt='Logo'/>
                <h1 className='text-2xl ml-2 font-medium'>Shopedia</h1>
            </div>
            {!user?'':
            <Route path='/user/profil' name={user.displayName}>
                <Image src={user.photoURL} width={32} height={32} alt='user' className='rounded-full' unoptimized={true}/>
            </Route>
            }
            <div className='flex flex-col border-t border-black pt-4'>
                <Route path='/' name='Home'>
                    <HiHome/>
                </Route>
                {product.map((item,index)=>(
                <Route path={'/brand/'+item} name={item} key={index}>
                    <HiDesktopComputer/>
                </Route>
                ))}
                <Route path='/help' name='FAQ'>
                    <HiDocumentText/>
                </Route>
                <Route path='/term' name='TOS'>
                    <HiClipboardList/>
                </Route>
                <div className='flex items-center mb-2'>
                    <HiAtSymbol/>
                    <a className='ml-1 font-medium text-lg' href='mailto:yonoraphael@gmail.com'>Contact</a>
                </div>
                {user && user.displayName!='admin'?
                <div className='flex items-center mb-2'>
                    <HiLogout/>
                    <p className='cursor-pointer ml-1 font-medium text-lg' onClick={()=>signOut(auth)}>Log Out</p>
                </div>
                :
                ''}
            </div>
            <p className='text-sm font-medium absolute bottom-0 mb-2'>shopedia @2021</p>
        </nav>
    )
}
export default Nav