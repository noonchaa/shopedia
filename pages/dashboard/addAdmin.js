import { useState } from "react"
import Admin from "../../components/Admin"
import Input from '../../components/part/Input'
import Button from '../../components/part/Button'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {auth, db} from '../../utils/firebaseClient'
import { doc, setDoc } from "@firebase/firestore"

const AddAdmin = () => {
    //set initial state
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    const addAdmin = (e) => {
        //prevent default behavior of form submit
        e.preventDefault()
        //change loading state
        setLoading(true)
        //reset the fail message
        setFail('')
        //create user in database
        createUserWithEmailAndPassword(auth,email,pass).then(()=>{
            //update user displayName for admin role
            updateProfile(auth.currentUser,{
                displayName:'admin'
            }).catch((err)=>{
                setFail(err.code)
            })
            //add admins records to database
            setDoc(doc(db,'admins',email.toLowerCase()),{
                name: name,
                email: email.toLowerCase()
            })
        }).catch((err)=>{
            setFail(err.code)
        })
        //reset loading state
        setLoading(false)
        //reset initial state
        setName('')
        setPass('')
        setEmail('')
    }

    return(
        <Admin>
            <h1 className='text-center text-2xl font-semibold italic tracking-wider mb-3 mt-8'>Add New Admin</h1>
            <p className='text-center font-medium tracking-widest my-4 capitalize text-red-600'>{fail}</p>
            <form className='max-w-xl mx-auto' onSubmit={addAdmin}>
                <Input type='text' placeholder='Name' value={name} change={(e)=>setName(e.target.value)}/>
                <Input type='email' placeholder='Email' value={email} change={(e)=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='Password' value={pass} change={(e)=>setPass(e.target.value)}/>
                <div className='text-right'>
                    <Button type='submit'>
                        {loading==false?'Submit':'Loading'}
                    </Button>
                </div>
            </form>
        </Admin>
    )
}
export default AddAdmin