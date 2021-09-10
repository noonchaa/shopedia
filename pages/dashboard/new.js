import { useContext, useState } from "react"
import Admin from "../../components/Admin"
import Input from "../../components/part/Input"
import Button from "../../components/part/Button"
import { storage } from "../../utils/firebaseClient"
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage'
import { UserContext } from "../../components/User"
import { useRouter } from "next/router"
import {HiCheck} from 'react-icons/hi'
import {doc, setDoc, updateDoc, arrayUnion, getDoc} from 'firebase/firestore'
import { db } from "../../utils/firebaseClient"

const NewProduct = () => {
    const user = useContext(UserContext)
    const router = useRouter()
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
        name: name.toLowerCase(),
        stock: total
    }

    const addProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        const res = await getDoc(doc(db,'products',brand.toLowerCase()))
        const resStock = await getDoc(doc(db,'stocks',brand.toLowerCase()))
        if(res.exists()&&resStock.exists()){
            updateDoc(doc(db,'products',brand.toLowerCase()),{
                series: arrayUnion(productDetail)
            }).catch((err)=>setFail(err.code))
            updateDoc(doc(db,'stocks',brand.toLowerCase()),{
                stock: arrayUnion(productStock)
            }).catch((err)=>setFail(err.code))
            setLoading(false)
            reset()
        } else {
            setDoc(doc(db,'products',brand.toLowerCase()),{
                id: brand.toLowerCase(),
                series:[productDetail]
            }).catch((err)=>setFail(err.code))
            setDoc(doc(db,'stocks',brand.toLowerCase()),{
                id: brand.toLowerCase(),
                stock:[productStock]
            }).catch((err)=>setFail(err.code))
            setLoading(false)
            reset()
        }
    }

    return(
        <Admin>
            <h1 className='text-center font-semibold text-xl mt-8 mb-4'>Product Baru</h1>
            <p className='text-center text-red-600 font-semibold mb-4'>{fail}</p>
            <form className='max-w-2xl mx-auto' onSubmit={addProduct}>
                <Input type='text' placeholder='Brand' value={brand} change={(e)=>setBrand(e.target.value)}/>
                <Input type='text' placeholder='Series' value={name} change={(e)=>setName(e.target.value)}/>
                <Input type='number' placeholder='Harga' value={price} change={(e)=>setPrice(e.target.value)}/>
                <Input type='number' placeholder='Jumlah product' value={total} change={(e)=>setTotal(e.target.value)}/>
                <label className='text-sm text-gray-600'>Foto product</label><br/>
                {imgUrl==''?
                <div>
                    <input className='text-sm text-gray-600' type='file' onChange={(e)=>setImg(e.target.files[0])}/><br/>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm my-2' type='button' onClick={getImgUrl}>
                        Upload
                    </button>
                </div>
                :
                    <HiCheck className='text-green-600 w-8 h-8'/>
                }
                <Input type='text' placeholder='Cpu' value={cpu} change={(e)=>setCpu(e.target.value)}/>
                <Input type='number' placeholder='Ram' value={ram} change={(e)=>setRam(e.target.value)}/>
                <Input type='text' placeholder='Gpu' value={gpu} change={(e)=>setGpu(e.target.value)}/>
                <Input type='text' placeholder='Penyimpanan' value={disk} change={(e)=>setDisk(e.target.value)}/>
                <Input type='number' placeholder='Ukuran Layar' value={screen} change={(e)=>setScreen(e.target.value)}/>
                <Input type='text' placeholder='Baterai' value={bat} change={(e)=>setBat(e.target.value)}/>
                <Input type='text' placeholder='Sistem Operasi' value={os} change={(e)=>setOs(e.target.value)}/>
                <textarea placeholder='Deskripsi' className='p-2 bg-gray-50 bg-opacity-20 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm mb-3' value={desc} onChange={(e)=>setDesc(e.target.value)} required/>
                <div className='flex justify-end'>
                    <Button type='submit'>{loading==false?'Submit':'Loading'}</Button>
                </div>
            </form>
        </Admin>
    )
}
export default NewProduct