import { useState } from "react"
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {auth, db, storage} from '../../utils/firebaseClient'
import { doc, setDoc } from "@firebase/firestore"
import Form from '../../components/Layout/Form/Form'
import Input from '../../components/Layout/Form/Input'
import Image from 'next/image'
import { HiEye } from "react-icons/hi"
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage"
import { useRouter } from "next/router"

const AddAdmin = () => {
    const router = useRouter()
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('/svg/user.svg')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [see, setSee] = useState(false)
    const [phone, setPhone] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)
  
    const getImgUrl = () => {
        setFail('')
        if(!img){
            setFail('Mohon pilih foto')
        } else {
            uploadBytes(ref(storage,`admin/${img.name}`),img).then((doc)=>{
                getDownloadURL(ref(storage, doc.ref.fullPath)).then((url)=>{
                    setImgUrl(url)
                })
            })
        }
    }

    const reset = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPassword1('')
        setSee(false)
        setPhone('')
    }

    const addAdmin = (e) => {
        e.preventDefault()
        setFail('')
        setLoading(true)
        if(password!==password1) {
            setFail('Mohon masukan password yang sama')
            setLoading(false)
        } else {
            createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
                const user = userCredential.user
                updateProfile(auth.currentUser,{
                    displayName:'admin',
                    photoURL:imgUrl
                }).catch(()=>setFail('Detail profil gagal disimpan, silahkan lengkapi di halaman profil'))
                setDoc(doc(db,'admin',user.uid),{
                    name: name,
                    email: email,
                    phone: Number(phone),
                    role: 'admin'
                }).catch(()=>setFail('Detail profil gagal disimpan, silahkan lengkapi di halaman profil'))
                setLoading(false)
                reset()
                router.back()
            }).catch(()=>setFail('Pendaftaran gagal, mohon ulangi beberapa saat lagi'))
        }
    }

    return(
        <Form type='daftar' loading={loading} submit={addAdmin}>
            <p className='my-2 font-medium'>Upload foto profile</p>
            <div className='relative w-20 h-20 mb-2 mx-auto rounded-full'>
                <Image src={imgUrl} layout='fill' id='img1' objectFit='cover' alt={name} className='rounded-full hover:bg-gray-300'/>
            </div>
            <div className={imgUrl=='/svg/user.svg'?'text-left mb-4':'hidden'}>
                <input className='text-sm mb-2' type='file' onChange={(e)=>setImg(e.target.files[0])}/><br/>
                <button type='button' className='px-4 py-2 bg-black text-white rounded-xl font-bold tracking-wider text-xs' onClick={()=>getImgUrl()}>Upload</button>
            </div>
            <p className={fail==''?'hidden':'mb-4 font-medium text-lg text-red-600'}>{fail}</p>
            <Input type='text' placeholder='Nama' required min={3} max={32} value={name} onChange={(e)=>setName(e.target.value)}/>
            <Input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input type={see===false?'password':'text'} placeholder='Password' required min={8} max={24} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Input type={see===false?'password':'text'} placeholder='Konfirmasi password' required min={8} max={24} value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
            <p className='text-right mb-4 -mt-2 cursor-pointer font-medium mr-4' onClick={()=>setSee(!see)}>Lihat password <span><HiEye className='w-5 h-5 inline' /></span></p>
            <Input type='tel' placeholder='Nomor telepon' required min={6} max={15} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </Form>
    )
}
export default AddAdmin