import { signOut } from '@firebase/auth'
import Image from 'next/image'
import { HiHome, HiX, HiDocumentText, HiLogout } from "react-icons/hi"
import { auth } from '../../../utils/firebaseClient'
import Route from '../Route'

const Dash = ({left,click,user}) => {
    const adminLink = ['stock','order','packing','delivery','delivered','finished','incoming','new_product','add_admin','remove_admin']

    return(
        <nav className={left==false?'hidden':'fixed top-0 bg-gray-200 shadow-xl w-80 z-50 min-h-screen p-4'}>
            <button className='py-1 px-2 bg-black text-white rounded-xl shadow flex items-center absolute right-4 top-4' onClick={click}>
                <HiX className='h-6 w-6'/>
            </button>
            <div className='flex mb-4'>
                <Image src='/logo/logo.svg' width={32} height={32} alt='Logo'/>
                <h1 className='text-2xl ml-2 font-medium'>Dashboard</h1>
            </div>
            {!user?'':
            <div className='flex mb-4 border-t border-black pt-4 items-end'>
                <Image src={user.photoURL} width={32} height={32} alt='Logo' className='rounded-full' unoptimized={true}/>
                <h1 className='text-xl ml-2 font-medium'>Admin</h1>
            </div>
            }
            <div className='flex flex-col'>
                <Route path='/' name='Home'>
                    <HiHome/>
                </Route>
                {adminLink.map((item,index)=>(
                    <Route path={'/dashboard/'+item} name={item.replace(/[_]/g,' ')} key={index}>
                        <HiDocumentText/>
                    </Route>
                ))}
                {user && user.displayName=='admin'?
                <div className='flex items-center mb-2'>
                    <HiLogout/>
                    <p className='cursor-pointer ml-1 font-medium' onClick={()=>signOut(auth)}>Log Out</p>
                </div>
                :
                ''}
            </div>
            <p className='text-sm font-medium absolute bottom-0 mb-2'>shopedia @2021</p>
        </nav>
    )
}
export default Dash