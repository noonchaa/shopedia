import { collection, getDocs } from "@firebase/firestore"
import { useState } from "react"
import Admin from "../../components/admin/Admin"
import Report from "../../components/admin/Report"
import { db } from "../../utils/firebaseClient"

export const getStaticProps = async () => {
    const data = []
    const res = await getDocs(collection(db,'product'))
    res.forEach((doc)=>{
        data.push(doc.data())
    })
    return {
        props: {
            produk: data
        },
        revalidate: 1
    }
}

const Dashboard = ({produk}) => {
    const [tipe, setTipe] = useState('tas')
    const [cari, setCari] = useState('')
    return(
        <Admin>
        <div className='bg-white dark:bg-gray-900'>
            <div className="container px-6 py-4">
            <Report/>
                <div className='flex justify-start py-2'>
                    <div className='flex justify-center items-center mr-6'>
                        <input type='radio' id='tas' name='tipe' value='tas' defaultChecked onChange={(e)=>setTipe(e.target.value)} />
                        <label htmlFor='tas' className='ml-2'>Tas</label>
                    </div>
                    <div className='flex justify-center items-center mr-6'>
                        <input type='radio' id='sepatu' name='tipe' value='sepatu' onChange={(e)=>setTipe(e.target.value)}/>
                        <label htmlFor='tas' className='ml-2'>Sepatu</label>
                    </div>
                    <div className='flex justify-center items-center mr-6'>
                        <input type='radio' id='baju' name='tipe' value='baju' onChange={(e)=>setTipe(e.target.value)}/>
                        <label htmlFor='baju' className='ml-2'>Baju</label>
                    </div>
                </div>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring max-w-xl appearance-none" type='search' placeholder="Id Produk" aria-label="Id Produk" id="id" required list='data' value={cari} onChange={(e)=>setCari(e.target.value)} />
                <datalist id='data'>
                    {produk.filter(item=>item.tag==tipe).map((item,index)=>(
                        <option key={index} value={item.id} />
                    ))}
                </datalist>
                <table className='table-auto border-collapse border border-gray-700 my-4 w-full'>
                    <thead>
                        <tr>
                            <th className='border border-gray-600 py-2'>ID Produk</th>
                            <th className='border border-gray-600'>Stok</th>
                            <th className='border border-gray-600'>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produk.filter(item=>item.tag==tipe).filter(el=>el.id.indexOf(cari)!== -1).map((item,index)=>(
                            <tr key={index}>
                                <td className='border border-gray-600 py-1 px-2'>{item.id}</td>
                                <td className='border border-gray-600 py-1 px-2'>{item.stok}</td>
                                <td className='border border-gray-600 py-1 px-2'>{item.harga}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </Admin>
    )
}
export default Dashboard