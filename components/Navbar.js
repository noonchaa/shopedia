import { AuthUser } from "./User"
import Link from 'next/link'
import CheckOut from "./CheckOut"
import {GiBallerinaShoes, GiHamburgerMenu, GiHandBag, GiTShirt} from 'react-icons/gi'
import { useRouter } from "next/router"
import { useState } from "react"
import Drop from "./Drop"
import DropUp from "./DropUp"

const Navbar = ({tag,tipe,title}) => {
    const [open, setOpen] = useState(false)
    const user = AuthUser()
    const router = useRouter()
    if(user && user.displayName=='admin'){
        router.push('/dashboard')
    }
    return(
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto flex justify-between items-center">
                <div className="flex items-center justify-between">
                    <Link href='/'>
                        <a className="text-2xl font-bold text-indigo-600 dark:text-white lg:text-3xl hover:text-indigo-500 dark:hover:text-gray-300">{title}</a>
                    </Link>
                </div>

                <div className="items-center md:flex">
                    <div className="hidden md:flex md:flex-row md:mx-6">
                        {tag.map((item,index)=>(
                            <DropUp tag={item} key={index} tipe={tipe.filter(isi=>isi.tag==item).map(data=>data.tipe).filter((tip,indexTip,self)=>self.indexOf(tip)===indexTip)}/>
                        ))}
                        <Link href='/help'>
                            <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                                Bantuan
                            </a>
                        </Link>
                        <Link href='/term'>
                            <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                                Batasan
                            </a>
                        </Link>
                        {!user?
                        <Link href='/signIn'>
                            <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                                Login
                            </a>
                        </Link>
                        :
                        <Link href='/user/profile'>
                            <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                                Profil
                            </a>
                        </Link>
                        }
                    </div>
                    {!user?'':
                    <div className="flex justify-center md:block">
                        <CheckOut/>
                    </div>}
                </div>
            </div>
            <div className='fixed bottom-0 bg-white dark:bg-gray-800 md:hidden z-40 w-full'>
                <hr className="h-px bg-gray-300 border-none dark:bg-gray-700"/>
                <div className="container px-6 py-1 mx-auto flex justify-between items-center">
                    {tag.map((item,index)=>(
                        <Drop tag={item} key={index} tipe={tipe.filter(isi=>isi.tag==item).map(data=>data.tipe).filter((tip,indexTip,self)=>self.indexOf(tip)===indexTip)}>
                            {item=='tas'?<GiHandBag className='w-6 h-6 text-indigo-600 mx-auto' />:item=='sepatu'?<GiBallerinaShoes className='w-6 h-6 text-indigo-600 mx-auto' />:<GiTShirt className='w-6 h-6 text-indigo-600 mx-auto' />}
                        </Drop>
                    ))}
                    <div className="relative inline-block">
                        <button onClick={()=>setOpen(!open)} className="relative z-10 block text-gray-700 bg-white dark:text-white dark:bg-gray-800 focus:outline-none">
                        <GiHamburgerMenu className='w-6 h-6 text-indigo-600 mx-auto'/>
                        <p className='text-sm font-medium'>Menu</p>
                        </button>
                        <div className={open==false?'hidden':"absolute bottom-12 right-0 z-20 w-40 py-2 bg-white rounded-md shadow-xl dark:bg-gray-800"} onClick={()=>setOpen(!open)}>
                            {!user?
                            <Link href='/signIn'>
                                <a className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>Login</a>
                            </Link>:
                            <Link href='/user/profile'>
                                <a className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>Profil</a>
                            </Link>
                        }
                        <Link href='/help'>
                            <a className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>Bantuan</a>
                        </Link>
                        <Link href='/term'>
                            <a className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>Batasan</a>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar