import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Route({path,name}){
    const router = useRouter()
    return(
        <Link href={path}>
            <a className={router.asPath==path?'font-bold mb-2 tracking-wider capitalize':'font-semibold mb-2 text-green-600 tracking-wider capitalize'}>
                {name}
            </a>
        </Link>
    )
}