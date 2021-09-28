import { useState } from "react"
import Input from '../components/Layout/Form/Input'
import Form from "../components/Layout/Form/Form"
import { useRouter } from "next/router"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { auth } from "../utils/firebaseClient"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        setCount(count+1)
        if(count>=2){
            setFail(`Anda telah gagal login 3 kali, mengalihkan ke halaman reset`)
            setTimeout(()=>{router.push('/reset')},1000)
        } else {
            signInWithEmailAndPassword(auth,email,password).then(()=>{
                setLoading(false)
                router.back()
            }).catch(()=>{
                setFail(`Email atau password salah`)
                setLoading(false)
            })
        }
    }

    return(
    <Form type='login' submit={submitHandler} loading={loading}>
        <p className={fail==''?'hidden':'mb-4 font-medium text-lg text-red-600'}>{fail}</p>
        <Input type='email' placeholder='Alamat email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </Form>
    )
}
export default Login