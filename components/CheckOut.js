import { useEffect, useState } from "react"
import Image from 'next/image'
import { AuthUser } from "./User"
import { doc, onSnapshot } from "@firebase/firestore"
import { db, RDB, refRDB } from "../utils/firebaseClient"
import CartOp from "./CartOp"
import Kurir from "./Kurir"
import { get } from "@firebase/database"

const CheckOut = () => {
    const user = AuthUser()
    const [open, setOpen] = useState(false)
    const [kurir, setKurir] = useState(false)
    const [cart, setCart] = useState([])
    const [text, setText] = useState([])

    useEffect(()=>{
        if(!user || user.displayName == 'admin') return
        const unsub = onSnapshot(doc(db,'users',user.uid),(doc)=>{
            setCart(doc.data().cart)
        })
        return () => {
            unsub()
        }
    },[user])

    const bayarCek = async () => {
        const data = []
        await get(refRDB(RDB,'product')).then((snap)=>{
            data.concat(snap.val())
        })
        const filtered = []
        cart.forEach((isi)=>{
            filtered.push(data.filter(item=>item.id==isi.id))
        })
        if(filtered.flat().filter(item=>item.stok==0).length){
            const out = []
            filtered.flat().filter(item=>item.stok==0).forEach((isi)=>{
                out.push(isi.nama)
            })
            setText(out)
        } else {
            if(cart.length) {
                setKurir(!kurir)
            }
        }
    }

    return(
        <div className="relative inline-block ">
            <button className="relative z-10 flex items-center p-1 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none" onClick={()=>setOpen(!open)}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={cart.length?"absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full":"hidden"}></span>
            </button>

            {open==false?'':
            <div className='fixed left-0 top-0 right-0 bottom-0 z-50 w-full h-screen bg-transparent backdrop-filter backdrop-contrast-50 backdrop-brightness-50'>
                <div className='container mx-auto fixed left-0 top-0 right-0 bottom-0'>
                    <div className='bg-gray-50 dark:bg-gray-800 w-full md:w-80 absolute top-0 right-0 bottom-0 overflow-x-hidden overflow-y-scroll overscroll-none hide'>
                        <style jsx>{`
                        .hide::-webkit-scrollbar {
                            display: none;
                        }
                        .hide{
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                        `}</style>
                        <button className='py-3 text-sm text-white capitalize bg-gray-900 text-center cursor-pointer fixed top-0 w-full md:w-80 z-50' onClick={()=>setOpen(!open)}>
                            Tutup
                        </button>
                        <div className='my-11'>
                                {kurir==true?
                                <Kurir total={cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0)} berat={cart.map(item=>Number(item.berat*item.qty)).reduce((part_sum,a)=>part_sum+a,0)} user={user} cart={cart} open={()=>setKurir(!kurir)}/>
                                :
                                <div>
                                {cart.map((item,index)=>(
                                    <div key={index} className='p-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'>
                                    <div className="flex items-center">
                                        <div className='relative w-16 h-16 flex-none'>
                                            <Image src={item.foto} layout='fill' objectFit='cover' alt='Item' unoptimized/>
                                        </div>
                                        <div className="mx-1">
                                            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200 capitalize">{item.nama}</h1>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">{item.size.map((isi,indexIsi)=>(<span key={indexIsi}>{isi} </span>))}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">{item.warna}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Rp. {Number(item.harga*item.qty).toLocaleString('ID',{'currency':'IDR'})}</p>
                                        <CartOp user={user} item={item} />
                                    </div>
                                    <hr className="border-gray-200 dark:border-gray-700 -mx-3 -mb-3 mt-1"/>
                                    </div>
                                ))}
                                <div className="p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <p>Total :  Rp. {cart.map(item=>Number(item.harga*item.qty)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
                                    {text.length?
                                    <div>
                                        <p className='mt-2 capitalize'>sold out :</p>
                                        {text.map((isi,index)=>(
                                            <p key={index} className='mt-1 italic'>{isi}</p>
                                        ))}
                                        <p className='mt-2 capitalize'>**mohon keluarkan dari keranjang</p>
                                    </div>
                                    :
                                    '' 
                                    }
                                </div>
                                <button className='py-3 text-sm text-white capitalize bg-gray-900 text-center cursor-pointer w-full md:w-80 fixed bottom-0 z-50' onClick={()=>bayarCek()}>
                                    Pilih Pengiriman
                                </button>
                                </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default CheckOut