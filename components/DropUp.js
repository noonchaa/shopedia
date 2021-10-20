import { useState } from "react"
import Link from 'next/link'

const DropUp = ({tag,tipe}) => {
    const [open, setOpen] = useState(false)

    return(
        <div className="relative inline-block">
            <button onClick={()=>setOpen(!open)} className="relative z-10 block text-gray-700 bg-white dark:text-white dark:bg-gray-800 focus:outline-none">
                <p className='my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0 capitalize'>{tag}</p>
            </button>
            <div className={open==false?'hidden':"absolute top-5 left-0 z-20 w-40 py-2 bg-white rounded-md shadow-xl dark:bg-gray-800"} onClick={()=>setOpen(!open)}>
                <Link href={'/tag/'+tag}>
                <a className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>{'Semua '+tag}</a>
                </Link>
                {tipe.map((item,index)=>(
                    <Link href={'/kategori/'+item} key={index}>
                    <a className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>{item}</a>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default DropUp