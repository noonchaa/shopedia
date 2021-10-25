import { doc, updateDoc } from "@firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { AuthUser } from "../../components/User"
import { db, RDB, refRDB, storage } from "../../utils/firebaseClient"
import Loader from "../../components/Loader"
import { get } from "@firebase/database"

export const getStaticProps = async () => {
    const props = {
        produk:[],
        tag:[],
        tipe:[],
        data: {}
    }
    await get(refRDB(RDB,'product')).then((snap)=>{
        const res = Object.values(snap.val())
        props.produk = res
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    await get(refRDB(RDB,'util/site')).then((snap)=>{
        props.data = snap.val()
    })
    return {
        props: {...props},
        revalidate: 60
    }
}

const Edit = ({data,tag,tipe}) => {
    const user = AuthUser()
    const router = useRouter()
    const [listCity, setListCity] = useState([])
    const [prov, setProv] = useState('')
    const [fail, setFail] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getCity = async () => {
            const res = await fetch('/api/city')
            const data = await res.json()
            setListCity(data.rajaongkir.results)
        }
        getCity()

        return () => {
            setListCity([])
        }
    },[])

    const formSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFail('')
        const kota = JSON.parse(e.target.kota.value)
        await uploadBytes(ref(storage,`users/${e.target.foto.files[0].name}`),e.target.foto.files[0]).then((isi)=>{
            getDownloadURL(ref(storage, isi.ref.fullPath)).then( async (url)=>{
                await updateDoc(doc(db,'users',user.uid),{
                    nama: e.target.nama.value,
                    email: e.target.email.value,
                    phone: e.target.telepon.value,
                    foto: url,
                    alamat: {...kota,full:e.target.alamat.value}
                }).catch(()=>{
                    setLoading(false)
                    setFail('Internal server error')
                })
                setLoading(false)
                e.target.reset()
                router.back()
            })
        }).catch(()=>{
            setLoading(false)
            setFail('Internal server error')
        })
    }

    if(!user) return <Loader/>
    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email}>
            <Seo title='Edit Profil'/>
        <header className='bg-gray-100 dark:bg-gray-900 md:py-12 md:px-6'>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Edit Profile</h2>
            <p className="text-red-600" >{fail}</p>
            
            <form onSubmit={formSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="nama">Nama</label>
                        <input id="nama" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required/>
                    </div>
    
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Alamat Email</label>
                        <input id="email" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" value={user.email} placeholder={user.email} disabled/>
                    </div>
    
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="telepon">Telepon</label>
                        <input id="telepon" type="tel" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required/>
                    </div>
    
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="foto">Foto Profil</label>
                        <input id="foto" type="file" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="prov">Pilih provinsi</label>
                        <select id="prov" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e)=>setProv(e.target.value)} required>
                            <option value=''>Provinsi</option>
                            {listCity.map(item=>item.province).filter((item,index,self)=>self.indexOf(item)===index).map((item,index)=>(
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="kota">Pilih kota</label>
                        <select id="kota" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required>
                            <option value=''>Kota</option>
                            {listCity.filter(item=>item.province==prov).map((item,index)=>(
                                <option value={JSON.stringify(item)} key={index}>{item.type} {item.city_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mt-6'>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="alamat">Alamat lengkap</label>
                    <textarea id="alamat" rows={3} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required/>
                </div>
    
                <div className="flex justify-end mt-6">
                    <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">{loading==false?'Simpan':'Loading'}</button>
                </div>
            </form>
        </section>
        </header>
        </Layout>
    )
}
export default Edit