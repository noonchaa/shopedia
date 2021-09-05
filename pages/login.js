import Link from 'next/link'
import {auth} from '../utils/firebaseClient'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useContext, useState } from 'react'
import {useRouter} from 'next/router'
import { UserContext } from '../components/User'

const Login = () => {
    const user = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gagal, setGagal] = useState('')
    const router = useRouter()

    const Signin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password).then(()=>{
            router.push('/')
        }).catch((error)=>{
            setGagal(error.code)
        })
    }
    if(user) {router.push('/')}

    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-40'>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-50 bg-opacity-50 shadow-xl rounded-lg' onSubmit={Signin}>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Login</h1>
                <p className='text-center text-red-600 font-semibold mb-4'>{gagal==''?'':'Email atau password salah'}</p>
                <input type='email' placeholder='email@example.com' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' placeholder='password' className='px-4 py-2 w-full mb-2 rounded-lg' required onChange={(e)=>setPassword(e.target.value)} />
                <p className='mb-4 px-4 text-black font-medium'>Or Click here to <span className='text-green-600'>
                    <Link href='/register'>
                        <a>register</a>
                    </Link>
                </span></p>
                <div className='flex justify-end'>
                <button className='bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm mr-4' type='reset'>
                    <Link href='/'>
                        <a>Cancel</a>
                    </Link>
                </button>
                <button className='bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2' type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login