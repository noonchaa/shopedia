import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Route({path,name,children}){
    const router = useRouter()
    return(
        <div className='flex items-center mb-2 capitalize'>
            {children}
            <Link href={path}>
                <a className={router.asPath==path?'font-bold ml-1':'ml-1 font-medium'}>{name}</a>
            </Link>
        </div>
    )
}