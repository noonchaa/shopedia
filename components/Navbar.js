import { AuthUser } from "./User"
import Link from 'next/link'
import CheckOut from "./CheckOut"
import {GiBallerinaShoes, GiCowled, GiExitDoor, GiHandBag, GiTShirt} from 'react-icons/gi'

const Navbar = ({tag}) => {
    const user = AuthUser()
    return(
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto flex justify-between items-center">
                <div className="flex items-center justify-between">
                    <Link href='/'>
                        <a className="text-2xl font-bold text-indigo-600 dark:text-white lg:text-3xl hover:text-indigo-500 dark:hover:text-gray-300">Shopedia</a>
                    </Link>
                </div>

                <div className="items-center md:flex">
                    <div className="hidden md:flex md:flex-row md:mx-6">
                        {tag.map((item,index)=>(
                            <Link href={'/tag/'+item} key={index}>
                                <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0 capitalize">{item}</a>
                            </Link>
                        ))}
                        <Link href='/help'>
                            <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                                FAQ
                            </a>
                        </Link>
                        <Link href='/term'>
                            <a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                                ToS
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
                        <Link href={'/tag/'+item} key={index}>
                            <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 w-12 h-12 capitalize flex justify-center items-center flex-col">
                                {item=='tas'?<GiHandBag className='w-6 h-6 text-indigo-600' />:item=='sepatu'?<GiBallerinaShoes className='w-6 h-6 text-indigo-600' />:<GiTShirt className='w-6 h-6 text-indigo-600' />}
                                <p>{item}</p>
                            </a>
                        </Link>
                    ))}
                    {!user?
                    <Link href='/signIn'>
                        <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 w-12 h-12 flex flex-col justify-center items-center">
                            <GiExitDoor className='w-6 h-6 text-indigo-600' />
                                <p>Login</p>
                        </a>
                    </Link>
                    :
                    <Link href='/user/profile'>
                        <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 w-12 h-12 flex flex-col justify-center items-center">
                            <GiCowled className='w-6 h-6 text-indigo-600' />
                                <p>Profil</p>
                        </a>
                    </Link>
                    }
                </div>
            </div>
        </nav>
    )
}
export default Navbar