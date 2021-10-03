import { useEffect, useState } from "react"
import Form from "../components/Layout/Form/Form"
import Input from '../components/Layout/Form/Input'
import Image from 'next/image'
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage"
import { auth, db, storage } from "../utils/firebaseClient"
import { HiEye } from "react-icons/hi"
import { doc, setDoc } from "@firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"
import { useRouter } from "next/router"

const Daftar = () => {
    const router = useRouter()
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('/svg/user.svg')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [see, setSee] = useState(false)
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState('')
    const [listCity, setListCity] = useState([])
    const [provinsi, setProvinsi] = useState('')

    useEffect(()=>{
        const getCity = async () => {
            const city = await fetch('/api/city')
            const cityData = await city.json()
            setListCity(cityData.rajaongkir.results)
        }
        getCity()

        return () => {
            setListCity([])
        }
    },[])

    const getImgUrl = () => {
        setFail('')
        if(!img){
            setFail('Mohon pilih foto')
        } else {
            uploadBytes(ref(storage,`user/${img.name}`),img).then((doc)=>{
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

    const submitForm = async (e) => {
        e.preventDefault()
        setFail('')
        setLoading(true)
        const kota = JSON.parse(e.target.kota.value)
        if(password!==password1) {
            setFail('Mohon masukan password yang sama')
            setLoading(false)
        } else {
            await createUserWithEmailAndPassword(auth,email,password).then( async (userCredential)=>{
                const user = userCredential.user
                await updateProfile(auth.currentUser,{
                    displayName:name,
                    photoURL:imgUrl
                }).catch(()=>setFail('Detail profil gagal disimpan, silahkan lengkapi di halaman profil'))
                await setDoc(doc(db,'user',user.uid),{
                    name: name,
                    email: email,
                    phone: Number(phone),
                    address: {...kota,lengkap:e.target.lengkap.value},
                    cart:[],
                    orders: []
                }).catch(()=>setFail('Detail profil gagal disimpan, silahkan lengkapi di halaman profil'))
                setLoading(false)
                reset()
                router.back()
            }).catch(()=>setFail('Pendaftaran gagal, mohon ulangi beberapa saat lagi'))
        }
    }

    return(
        <Form type='daftar' submit={submitForm} loading={loading}>
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
            <select  className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200 appearance-none'
                onChange={(e)=>setProvinsi(e.target.value)}>
                <option value=''>Provinsi</option>
                {listCity.map(item=>item.province).filter((item,index,self)=>self.indexOf(item)===index).map((item,index)=>(
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <select id='kota' className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200 appearance-none'>
                <option value=''>Kota</option>
                {listCity.filter(item=>item.province==provinsi).map((item,index)=>(
                    <option value={JSON.stringify(item)} key={index}>{item.type} {item.city_name}</option>
                ))}
            </select>
            <textarea id='lengkap' className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black bg-gray-200 placeholder-black placeholder-opacity-80' placeholder='Alamat lengkap' required rows={6}/>
            <p className={fail==''?'hidden':'mb-4 font-medium text-lg capitalize text-red-600'}>{fail}</p>
        </Form>
    )
}
export default Daftar