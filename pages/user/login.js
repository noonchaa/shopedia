import Link from 'next/link'
import {auth} from '../../utils/firebaseClient'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useContext, useState } from 'react'
import {useRouter} from 'next/router'
import { UserContext } from '../../components/User'
import Input from '../../components/part/Input'
import Button from '../../components/part/Button'
import Seo from '../../components/Seo'

const Login = () => {
    const user = useContext(UserContext)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState('')

    const Signin = (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        setSucces('')
        signInWithEmailAndPassword(auth,email,password).then(()=>{
            setSucces('Login Succes')
        }).catch((err)=>{
            setFail(err.code)
        })
        setLoading(false)
        setEmail('')
        setPassword('')
    }

    if(user){
        setTimeout(()=>{
            user.displayName=='admin'?router.push('/dashboard/stock'):router.push('/user/profile')
        },1000)
    }

    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-40'>
            <Seo title='Login'/>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-300 shadow-xl rounded-lg' onSubmit={Signin}>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Login</h1>
                <p className='text-center text-red-600 font-semibold mb-4'>{fail==''?'':'Email atau password salah'}</p>
                <p className='text-center text-green-600 font-semibold mb-4'>{succes}</p>
                <Input type='email' placeholder='Email' value={email} change={(e)=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='Password' value={password} change={(e)=>setPassword(e.target.value)}/>

                <p className='mb-4 px-4 text-black font-medium'>Atau klik disini untuk
                    <span className='text-green-600'>
                        <Link href='/user/register'>
                            <a> daftar</a>
                        </Link>
                    </span>
                </p>
                <p className='mb-4 px-4 text-black font-medium'>Lupa password?
                    <span className='text-green-600'>
                        <Link href='/user/reset'>
                            <a> klik disini</a>
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