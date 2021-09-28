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
    const [prov, setProv] = useState([])
    const [kab, setKab] = useState([])
    const [kec, setKec] = useState([])
    const [desa, setDesa] = useState([])
    const [address, setAddress] = useState({
        prov: '',
        kab: '',
        kec: '',
        desa: '',
        lengkap: ''
    })

    useEffect(()=>{
        const getProv = async () => {
            const res = await fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            const data = await res.json()
            setProv(data.provinsi)
        }
        getProv()
        return () => {
            setProv([])
        }
    },[])

    const getKab = async (e) => {
        const {id,name} = JSON.parse(e.target.value)
        const kab = await fetch('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi='+id)
        const dataKab = await kab.json()
        setKab(dataKab.kota_kabupaten)
        setAddress({...address,prov:name})
    }
    const getKec = async (e) => {
        const {id,name} = JSON.parse(e.target.value)
        const kec = await fetch('https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota='+id)
        const dataKec = await kec.json()
        setKec(dataKec.kecamatan)
        setAddress({...address,kab:name})
    }
    const getDesa = async (e) => {
        const {id,name} = JSON.parse(e.target.value)
        const desa = await fetch('https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan='+id)
        const dataDesa = await desa.json()
        setDesa(dataDesa.kelurahan)
        setAddress({...address,kec:name})
    }

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

    const submitForm = (e) => {
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
                    displayName:name,
                    photoURL:imgUrl
                }).catch(()=>setFail('Detail profil gagal disimpan, silahkan lengkapi di halaman profil'))
                setDoc(doc(db,'user',user.uid),{
                    name: name,
                    email: email,
                    phone: Number(phone),
                    address: address,
                    order: []
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
             onChange={(e)=>getKab(e)} required>
                {prov.map((data,index)=>(
                    <option key={index} value={JSON.stringify({id:data.id,name:data.nama})}>{data.nama}</option>
                ))}
            </select><br/>
            <select  className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200 appearance-none'
             onChange={(e)=>getKec(e)} required>
                {kab.map((data,index)=>(
                    <option key={index} value={JSON.stringify({id:data.id,name:data.nama})}>{data.nama}</option>
                ))}
            </select><br/>
            <select  className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200 appearance-none'
             onChange={(e)=>getDesa(e)}>
                {kec.map((data,index)=>(
                    <option key={index} value={JSON.stringify({id:data.id,name:data.nama})}>{data.nama}</option>
                ))}
            </select><br/>
            <select  className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black font-medium capitalize bg-gray-200 appearance-none'
             onChange={(e)=>setAddress({...address,desa:e.target.value})}>
                {desa.map((data,index)=>(
                    <option key={index} value={data.nama}>{data.nama}</option>
                ))}
            </select><br/>
            <textarea className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black bg-gray-200 placeholder-black placeholder-opacity-80' onChange={(e)=>setAddress({...address,lengkap:e.target.value})} value={address.lengkap} placeholder='Mohon lengkapi alamat anda bila provinsi, kota, kecamatan atau desa anda tidak tercantum di pilihan diatas, beserta detail jalan dan nomor rumah untuk memastikan pesanan anda nantinya sampai tujuan.' required rows={6}/>
            <p className={fail==''?'hidden':'mb-4 font-medium text-lg capitalize text-red-600'}>{fail}</p>
        </Form>
    )
}
export default Daftar