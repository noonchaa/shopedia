import Link from 'next/link'
import { useState } from 'react'
import { auth,db } from '../utils/firebaseClient'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {doc,setDoc} from 'firebase/firestore'

const Register = () => {
    const [email, setEmail] = useState('')
    const [same ,setSame] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [user, setUser] = useState('')

    const register = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            setUser(user.user)
        }).catch((error)=>{
            console.log(error.code,error.message)
        })
        await setDoc(doc(db,'user',user.uid),{
            id : user.uid,
            name : name,
            phone : phone,
            address : address
        }).catch((error)=>{
            console.log(error.code,error.message)
        })
    }
    console.log(user)

    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-4'>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-50 bg-opacity-50 shadow-xl rounded-lg' onSubmit={register}>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Register</h1>
                <input type='text' placeholder='John Wick' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setName(e.target.value)} />
                <input type='email' placeholder='email@example.com' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' placeholder='password' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setSame(e.target.value)} />
                <p className={same!=password?'text-red-600':'hidden'}>Mohon masukan password yang sama</p>
                <input type='password' placeholder='confirm password' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setPassword(e.target.value)} />
                <input type='number' placeholder='081234567890' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setPhone(e.target.value)} />
                <input type='text' placeholder='Address' className='px-4 py-2 w-full mb-4 rounded-lg' required onChange={(e)=>setAddress(e.target.value)} />
                <p className='mb-4 px-4 text-black font-medium'>Or Click here to <span className='text-green-600'>
                    <Link href='/login'>
                        <a>login</a>
                    </Link>
                </span></p>
                <div className='flex justify-end'>
                <button className='bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm mr-4' type='reset'>
                    <Link href='/'>
                        <a>Cancel</a>
                    </Link>
                </button>
                <button disabled={same!=password?true:false} className='bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2' type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}
export default Register