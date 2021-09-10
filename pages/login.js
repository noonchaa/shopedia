import Link from 'next/link'
import {auth} from '../utils/firebaseClient'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useContext, useState } from 'react'
import {useRouter} from 'next/router'
import { UserContext } from '../components/User'
import Input from '../components/part/Input'
import Button from '../components/part/Button'

const Login = () => {
    const user = useContext(UserContext)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    const Signin = (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            const user = userCredential.user
            if(user.displayName=='admin'){
                router.push('/dashboard')
            } else {
                router.push('/profile')
            }
        }).catch((err)=>{
            setFail(err.code)
        })
        setLoading(false)
        setEmail('')
        setPassword('')
    }

    if(user) router.push('/')

    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-40'>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-300 shadow-xl rounded-lg' onSubmit={Signin}>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Login</h1>
                <p className='text-center text-red-600 font-semibold mb-4'>{fail==''?'':'Email atau password salah'}</p>
                <Input type='email' placeholder='Email' change={(e)=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='Password' change={(e)=>setPassword(e.target.value)}/>

                <p className='mb-4 px-4 text-black font-medium'>Atau klik disini untuk
                    <span className='text-green-600'>
                        <Link href='/register'>
                            <a> daftar</a>
                        </Link>
                    </span>
                </p>

                <div className='flex justify-end'>
                    <Button type='reset'>
                        <Link href='/'>
                            <a>Batal</a>
                        </Link>
                    </Button>
                    <Button type='submit'>
                        {loading==false?'Login':'Loading'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default Login