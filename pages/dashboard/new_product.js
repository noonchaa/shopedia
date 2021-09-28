import { useState } from "react"
import Input from "../../components/Layout/Form/Input"
import { storage } from "../../utils/firebaseClient"
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage'
import {HiCheck} from 'react-icons/hi'
import {doc, setDoc, updateDoc, getDoc} from 'firebase/firestore'
import { db } from "../../utils/firebaseClient"
import Layout from "../../components/Layout/Layout"

const NewProduct = () => {
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [total, setTotal] = useState('')
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [cpu, setCpu] = useState('')
    const [ram, setRam] = useState('')
    const [gpu, setGpu] = useState('')
    const [disk, setDisk] = useState('')
    const [screen, setScreen] = useState('')
    const [bat, setBat] = useState('')
    const [os, setOs] = useState('')
    const [desc, setDesc] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    const getImgUrl = () => {
        setFail('')
        if(brand==''||img==''){
            setFail('Mohon isi Brand kemudian pilih file')
        } else {
            uploadBytes(ref(storage, `${brand.toLowerCase()}/${img.name}`),img).then((doc)=>{
                getDownloadURL(ref(storage, doc.ref.fullPath)).then((url)=>{
                    setImgUrl(url)
                })
            })
        }
    }

    const reset = () => {
        setBrand('')
        setName('')
        setPrice('')
        setTotal('')
        setImg('')
        setImgUrl('')
        setCpu('')
        setRam('')
        setGpu('')
        setDisk('')
        setScreen('')
        setBat('')
        setOs('')
        setDesc('')
    }

    const productDetail = {
        brand: brand,
        name: name.toLowerCase(),
        price: price,
        imgUrl: imgUrl,
        cpu: cpu,
        ram: ram,
        gpu: gpu,
        disk: disk,
        screen: screen,
        battery: bat,
        OS: os,
        descriptions: desc,
        added: new Date()
    }

    const productStock = {
        brand: brand,
        name: name.toLowerCase(),
        stock: Number(total)
    }

    const addProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        const res = await getDoc(doc(db,'products',name.toLowerCase()))
        const resStock = await getDoc(doc(db,'stocks',name.toLowerCase()))
        if(res.exists()&&resStock.exists()){
            updateDoc(doc(db,'products',name.toLowerCase()),productDetail).catch((err)=>setFail(err.code))
            updateDoc(doc(db,'stocks',name.toLowerCase()),productStock).catch((err)=>setFail(err.code))
            setLoading(false)
            reset()
        } else {
            setDoc(doc(db,'products',name.toLowerCase()),productDetail).catch((err)=>setFail(err.code))
            setDoc(doc(db,'stocks',name.toLowerCase()),productStock).catch((err)=>setFail(err.code))
            setLoading(false)
            reset()
        }
    }

    return(
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-12 mb-4'>Product Baru</h1>
            <p className='text-center text-red-600 font-semibold mb-4'>{fail}</p>
            <form className='max-w-2xl mx-auto' onSubmit={addProduct}>
                <Input type='text' required placeholder='Brand' value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                <Input type='text' required placeholder='Series' value={name} onChange={(e)=>setName(e.target.value)}/>
                <Input type='number' required placeholder='Harga' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <Input type='number' required placeholder='Jumlah product' value={total} onChange={(e)=>setTotal(e.target.value)}/>
                <label className='text-sm text-gray-600'>Foto product</label><br/>
                {imgUrl==''?
                <div>
                    <input className='text-sm text-gray-600' type='file' onChange={(e)=>setImg(e.target.files[0])}/><br/>
                    <button className='bg-black text-white px-4 py-2 rounded-lg font-medium text-sm my-2' type='button' onClick={getImgUrl}>
                        Upload
                    </button>
                </div>
                :
                    <HiCheck className='w-8 h-8'/>
                }
                <Input type='text' required placeholder='Cpu' value={cpu} onChange={(e)=>setCpu(e.target.value)}/>
                <Input type='number' required placeholder='Ram' value={ram} onChange={(e)=>setRam(e.target.value)}/>
                <Input type='text' required placeholder='Gpu' value={gpu} onChange={(e)=>setGpu(e.target.value)}/>
                <Input type='text' required placeholder='Penyimpanan' value={disk} onChange={(e)=>setDisk(e.target.value)}/>
                <Input type='number' required placeholder='Ukuran Layar' value={screen} onChange={(e)=>setScreen(e.target.value)}/>
                <Input type='text' required placeholder='Baterai' value={bat} onChange={(e)=>setBat(e.target.value)}/>
                <Input type='text' required placeholder='Sistem Operasi' value={os} onChange={(e)=>setOs(e.target.value)}/>
                <textarea placeholder='Deskripsi' className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black bg-gray-200 placeholder-black placeholder-opacity-80' value={desc} onChange={(e)=>setDesc(e.target.value)} required/>
                <button type='submit' className={loading==false?'px-4 py-2 bg-black text-white rounded-xl font-bold tracking-wider w-60':'px-4 py-2 bg-gray-50 rounded-xl font-bold tracking-wider w-60'}>Input</button>
            </form>
        </Layout>
    )
}
export default NewProduct