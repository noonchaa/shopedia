import Link from 'next/link'
import { useState, useContext } from 'react'
import { auth,db } from '../utils/firebaseClient'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {doc,setDoc} from 'firebase/firestore'
import { UserContext } from '../components/User'
import Input from '../components/part/Input'
import Button from '../components/part/Button'
import {useRouter} from 'next/router'

const Register = () => {
    const user = useContext(UserContext)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm ,setConfirm] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    const register = (e) => {
        e.preventDefault();
        setLoading(true)
        setFail('')
        if(password!=confirm){
            setFail('Mohon masukan password yang sama')
        } else {
            createUserWithEmailAndPassword(auth,email,password).then(()=>{
                updateProfile(auth.currentUser,{
                    displayName: name
                }).catch((err)=>setFail(err.code))
                setDoc(doc(db,'users',name.toLowerCase()),{
                    name: name.toLowerCase(),
                    email: email.toLowerCase(),
                    phone: phone,
                    address: address,
                    added: new Date(),
                    updated: new Date()
                })
                router.push('/profile')
            }).catch((err)=>setFail(err.code))
        }
        setLoading(false)
    }

    if(user) router.push('/')

    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-4'>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-300 shadow-xl rounded-lg' onSubmit={register}>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Daftar</h1>
                <p className='text-center text-red-600 font-semibold mb-4'>{fail}</p>
                <Input type='text' placeholder='Nama' value={name} change={(e)=>setName(e.target.value)}/>
                <Input type='email' placeholder='Email' value={email} change={(e)=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='Password' value={password} change={(e)=>setPassword(e.target.value)}/>
                <Input type='password' placeholder='Konfirmasi Password' value={confirm} change={(e)=>setConfirm(e.target.value)}/>
                <p className='text-xs mb-3 font-semibold tracking-wider -mt-1 ml-2'>
                    {password!=confirm?'Mohon masukan password yang sama':''}
                </p>
                <Input type='number' placeholder='Nomor Telpon' value={phone} change={(e)=>setPhone(e.target.value)}/>
                <textarea placeholder='Alamat' className='p-2 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm mb-3 bg-gray-100' value={address} onChange={(e)=>setAddress(e.target.value)} required/>

                <p className='mb-4 px-2 text-black font-medium'>Atau klik disini untuk
                    <span className='text-green-600'>
                        <Link href='/login'>
                            <a> login</a>
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
                        {loading==false?'Daftar':'Loading'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default Register