import Link from 'next/link'

const Drop = ({children,tag,tipe,show,open}) => {

    return(
        <div className="relative inline-block">
            <button onClick={show} className="relative z-10 block text-gray-700 bg-white dark:text-white dark:bg-gray-800 focus:outline-none">
            {children}
            <p className='text-sm font-medium capitalize'>{tag}</p>
            </button>
            <div className={open==tag?'absolute bottom-12 left-0 z-20 w-40 py-2 bg-white rounded-md shadow-xl dark:bg-gray-800':"hidden"} onClick={show}>
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
export default Drop