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
    //retrieve currently signin user
    const user = useContext(UserContext)
    //next/router for redirecting to another page
    const router = useRouter()
    //set initial state
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

    //get image url to be added to database
    const getImgUrl = () => {
        setFail('')
        //set conditions error handling
        if(brand==''||img==''){
            setFail('Mohon isi Brand kemudian pilih file')
        } else {
            //upload image to storage
            uploadBytes(ref(storage, `${brand.toLowerCase()}/${img.name}`),img).then((doc)=>{
                //get image url
                getDownloadURL(ref(storage, doc.ref.fullPath)).then((url)=>{
                    setImgUrl(url)
                })
            })
        }
    }

    //reset initial state
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

    //set detail to be added to products database
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

    //set detail to be added to stocks database
    const productStock = {
        brand: brand,
        name: name.toLowerCase(),
        stock: total
    }

    const addProduct = async (e) => {
        //prevent default behavior form submit
        e.preventDefault()
        //change loading state
        setLoading(true)
        //reset fail message
        setFail('')
        //check if document already exists
        const res = await getDoc(doc(db,'products',name.toLowerCase()))
        const resStock = await getDoc(doc(db,'stocks',name.toLowerCase()))
        if(res.exists()&&resStock.exists()){
            //if exists
            //update products records in database
            updateDoc(doc(db,'products',name.toLowerCase()),productDetail).catch((err)=>setFail(err.code))
            //update stocks records in database
            updateDoc(doc(db,'stocks',name.toLowerCase()),productStock).catch((err)=>setFail(err.code))
            //reset loading state
            setLoading(false)
            //run reset function to reset initial state
            reset()
        } else {
            //if not-found
            //create products records in database
            setDoc(doc(db,'products',name.toLowerCase()),productDetail).catch((err)=>setFail(err.code))
            //create stocks records in database
            setDoc(doc(db,'stocks',name.toLowerCase()),productStock).catch((err)=>setFail(err.code))
            //reset loading state
            setLoading(false)
            //run reset function to reset initial state
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