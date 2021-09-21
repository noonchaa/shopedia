import { useState } from "react"
import Input from "../../components/part/Input"
import Button from "../../components/part/Button"
import Link from 'next/link'
import { sendPasswordResetEmail } from "@firebase/auth"
import { auth } from "../../utils/firebaseClient"
import { useRouter } from "next/router"

const Reset = () => {
    const [email, setEmail] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const resetHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        if(email==''){
            setFail('Silahkan masukan email anda')
        }
        sendPasswordResetEmail(auth,email).then(()=>{
            setFail('Email untuk reset password telah dikirim ke '+email)
            setTimeout(()=>{router.push('/')},3000)
        }).catch(()=>{
            setFail('Silahkan masukan email anda')
        })
        setLoading(false)
        setEmail('')
    }
    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-40'>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-300 shadow-xl rounded-lg' onSubmit={resetHandler}>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Reset Password</h1>
                <p className='text-center text-red-600 font-semibold mb-4'>{fail}</p>
                <Input type='email' placeholder='Email' value={email} change={(e)=>setEmail(e.target.value)}/>
                <div className='flex justify-end'>
                    <Button type='reset'>
                        <Link href='/'>
                            <a>Batal</a>
                        </Link>
                    </Button>
                    <Button type='submit'>
                        {loading==false?'Kirim':'Loading'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default Reset