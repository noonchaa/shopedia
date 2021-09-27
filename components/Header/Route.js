import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Route({path,name}){
    const router = useRouter()
    return(
        <Link href={path}>
            <a className={router.asPath==path?'font-bold mb-2 tracking-wider capitalize':'font-medium mb-2 tracking-wider capitalize'}>
                {name}
            </a>
        </Link>
    )
}