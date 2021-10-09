import { useState } from "react"
import AddCart from "./AddCart"

const Size = ({size,id,harga,nama,warna,foto,berat}) => {
    const [uk, setUk] = useState(size[0])
    const [open, setOpen] = useState(false)
    return(
        <div className='relative inline-block'>
            <div className={open==false?'hidden':'block'}>
                <div className='flex flex-row justify-end absolute right-0 top-0 z-10 bg-gray-900 dark:bg-gray-800 -my-2 -mx-4 py-2 px-4 w-80 max-w-xs'>
                    {size.map((item,index)=>(
                        <button className={item==uk?'w-6 h-6 rounded-full bg-indigo-600 flex justify-center items-center cursor-pointer hover:bg-indigo-500 mr-2':'w-6 h-6 rounded-full bg-gray-800 dark:bg-white flex justify-center items-center cursor-pointer hover:bg-indigo-600 dark:hover:bg-gray-100 mr-2'} key={index} onClick={()=>setUk(item)}>
                            <p className='text-xs font-medium text-white uppercase dark:text-gray-800'>{item}</p>
                        </button>
                    ))}
                    <div onClick={()=>setTimeout(()=>{setOpen(!open)},2000)}>
                        <AddCart id={id} harga={harga} nama={nama} size={uk} warna={warna} foto={foto} berat={berat}/>
                    </div>
                </div>
            </div>
            <div className='relative block z-0'>
                <button 
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none" onClick={()=>setOpen(!open)}>
                    pilih size
                </button>
            </div>
        </div>
    )
}
export default Size