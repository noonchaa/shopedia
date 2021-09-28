import { sendPasswordResetEmail } from "@firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import Form from "../components/Layout/Form/Form"
import Input from '../components/Layout/Form/Input'
import { auth } from "../utils/firebaseClient"

const Reset = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    const resetEmail = (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        sendPasswordResetEmail(auth,email).then(()=>{
            setFail('Email dengan panduan reset password telah dikirim ke '+email)
            setLoading(false)
            setTimeout(()=>{router.push('/')},1000)
        }).catch(()=>{
            setFail('Mohon masukan email yang terdaftar')
            setLoading(false)
        })
    }
    console.log(email)

    return(
        <Form type='reset' loading={loading} submit={resetEmail}>
            <p className={fail==''?'hidden':'mb-4 font-medium text-lg text-red-600'}>{fail}</p>
            <Input type='email' placeholder='Alamat email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form>
    )
}
export default Reset