import { collection, doc, onSnapshot, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import { db } from "../../utils/firebaseClient"
import Image from 'next/image'

const Update = () => {
    const [produk, setProduk] = useState([])
    const [tipe, setTipe] = useState('tas')
    const [cari, setCari] = useState('')
    
    useEffect(()=>{
        const getProduk = async () => {
            onSnapshot(collection(db,'product'),(doc)=>{
                const data = []
                doc.forEach((isi)=>{
                    data.push(isi.data())
                })
                setProduk(data)
            })
        }
        getProduk()

        return () => {
            getProduk()
            setProduk([])
        }
    },[])

    const updateData = async (e) => {
        e.preventDefault()
        await updateDoc(doc(db,'product',e.target.id.value),{
            nama: e.target.nama.value,
            warna: e.target.warna.value,
            size: e.target.size.value.split(','),
            desc: e.target.deskripsi.value,
            harga: Number(e.target.harga.value),
            berat: Number(e.target.berat.value),
            stok: Number(e.target.stok.value),
            tipe: e.target.tipe.value
        })
        e.target.reset()
    }

    return(
        <Admin>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
                <div className='flex justify-around text-gray-700 capitalize dark:text-white'>
                    <div>
                        <input type='radio' id='tas' name='tipe' value='tas' defaultChecked onChange={(e)=>setTipe(e.target.value)}/>
                        <label htmlFor='tas' className='ml-2 cursor-pointer'>Tas</label>
                    </div>
                    <div>
                        <input type='radio' id='sepatu' name='tipe' value='sepatu' onChange={(e)=>setTipe(e.target.value)}/>
                        <label htmlFor='sepatu' className='ml-2 cursor-pointer'>sepatu</label>
                    </div>
                    <div>
                        <input type='radio' id='baju' name='tipe' value='baju' onChange={(e)=>setTipe(e.target.value)}/>
                        <label htmlFor='baju' className='ml-2 cursor-pointer'>baju</label>
                    </div>
                </div>
                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>

                    <input type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" list='data' placeholder="Cari Produk ID" value={cari} onChange={(e)=>setCari(e.target.value)} />
                </div>
                <datalist id='data'>
                    {produk.filter(item=>item.tag==tipe).map((item,index)=>(
                        <option key={index} value={item.id} />
                    ))}
                </datalist>
                {produk.filter(item=>item.id==cari).map((item,index)=>(
                    <form key={index} onSubmit={updateData}>
                        <div className='mt-4'>
                            <Image src={item.foto} width={160} height={160} alt='Foto'/>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="id">ID</label>
                                <input id="id" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" value={item.id} placeholder={item.id} disabled/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="nama">Nama</label>
                                <input id="nama" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.nama} required/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="tag">Tag</label>
                                <input id="tag" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" value={item.tag} placeholder={item.tag} disabled/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="tipe">Tipe</label>
                                <input id="tipe" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.tipe} required/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="deskripsi">Deskripsi</label>
                                <input id="deskripsi" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.desc} required/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="warna">Warna</label>
                                <input id="warna" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.warna} required/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="size">Size</label>
                                <input id="size" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.size.map(item=>item)} disabled={!item.size.length?true:false}/>
                                <p className="text-gray-700 dark:text-gray-200">*Pisahkan dengan koma untuk setiap ukuran</p>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="berat">Berat</label>
                                <input id="berat" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.berat+' gram'} required/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="harga">Harga</label>
                                <input id="harga" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.harga} required/>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="stok">Stok</label>
                                <input id="stok" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder={item.stok} required/>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-4" type='reset'>Ulangi</button>
                            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type='submit'>Simpan</button>
                        </div>
                    </form>
                ))}
            </section>
        </Admin>
    )
}
export default Update