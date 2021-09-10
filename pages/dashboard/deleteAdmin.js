import { useContext, useState } from "react"
import Admin from "../../components/Admin"
import { doc, deleteDoc } from "@firebase/firestore"
import { auth, db } from "../../utils/firebaseClient"
import {deleteUser, reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth'
import { UserContext } from "../../components/User"
import Input from "../../components/part/Input"
import Button from "../../components/part/Button"

const DeleteAdmin = () => {
    const user = useContext(UserContext)
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
                deleteDoc(doc(db,'admins',user.email))
                setEmail('')
                setPass('')
            }).catch((err)=>{
                setFail(err.code)
            })
        }).catch((err)=>{
            setFail(err.code)
        })
        setLoading(false)
    }

    return(
        <Admin>
            <h1 className='text-center text-2xl font-semibold italic tracking-wider mb-3 mt-8'>Remove Admin</h1>
            <p className='text-center font-medium tracking-widest my-4'>{user?user.email:''}</p>
            <p className='text-center font-medium tracking-widest my-4 text-red-600'>
                {fail==''?`This action will delete currently signed admin, make sure you signin with admin account you want to delete.`:fail}
            </p>
            <form className='max-w-xl mx-auto' onSubmit={deleteAdmin}>
                <Input type='email' placeholder='Confirm Email' value={email} change={(e)=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='Confirm Password' value={pass} change={(e)=>setPass(e.target.value)}/>
                <div className='text-right'>
                    <Button type='submit'>
                        {loading==false?'Confirm Deletion':'Loading'}
                    </Button>
                </div>
            </form>
        </Admin>
    )
}
export default DeleteAdmin