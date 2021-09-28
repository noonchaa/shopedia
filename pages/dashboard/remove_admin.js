import { useState } from "react"
import { doc, deleteDoc } from "@firebase/firestore"
import { auth, db } from "../../utils/firebaseClient"
import {deleteUser, reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth'
import { AuthUser } from "../../components/User"
import Form from "../../components/Layout/Form/Form"
import Input from "../../components/Layout/Form/Input"

const DeleteAdmin = () => {
    const user = AuthUser()
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const deleteAdmin = (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        reauthenticateWithCredential(auth.currentUser,EmailAuthProvider.credential(email,pass)).then(()=>{
            deleteUser(auth.currentUser).then(()=>{
                deleteDoc(doc(db,'admin',user.uid))
            }).catch(()=>{
                setFail('Gagal hapus detail admin')
            })
        }).catch(()=>{
            setFail('Email atau password salah')
        })
        setEmail('')
        setPass('')
        setLoading(false)
    }

    return(
        <Form type='admin' loading={loading} submit={deleteAdmin}>
            <p className='my-2 font-medium'>{`Tindakan ini akan menghapus admin yang sekarang login ${!user?'':user.email}, pastikan anda login dengan akun admin yang ingin anda hapus`}</p>
            <p className={fail==''?'hidden':'mb-4 font-medium text-lg text-red-600'}>{fail}</p>
            <Input type='email' placeholder='Alamat email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input type='password' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
        </Form>
    )
}
export default DeleteAdmin