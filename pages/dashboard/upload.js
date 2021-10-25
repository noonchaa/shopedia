import { useEffect, useState } from "react"
import Admin from "../../components/admin/Admin"
import {FaFileCsv} from 'react-icons/fa'
import Image from 'next/image'
import { RDB, refRDB } from "../../utils/firebaseClient"
import { off, onValue, set } from "@firebase/database"

const Upload = () => {
    const [csvArray, setCsvArray] = useState([])
    const [loading, setLoading] = useState(false)
    const [fileUrl, setFileUrl] = useState('')

    useEffect(()=>{
        onValue(refRDB(RDB,'util/site'),(snap)=>{
            setFileUrl(snap.val().template)
        })

        return () => {
            off(refRDB(RDB,'util/site'))
        }
    },[])

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\r')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        newArray.pop()
        setCsvArray(newArray)
    }

    const upFile = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.readAsText(e.target.csv.files[0])
        reader.onload = (file) => {
            const text = file.target.result
            processCSV(text)
        }
        e.target.reset()
    }

    const saveFile = () => {
        if(!csvArray.length){
            alert('Silahkan pilih file kemudian klik cek file')
        } else {
            setLoading(true)
            const data = csvArray.map(doc => ({
                nama: doc.nama,
                tag: doc.tag,
                id: doc.id,
                warna: doc.warna,
                size: [doc.size1,doc.size2,doc.size3,doc.size4,doc.size5,doc.size6].filter(item=>item != undefined && item != ""),
                desc: doc.desc,
                harga: Number(doc.harga)+(Number(doc.harga)*15/100),
                berat: Number(doc.berat),
                stok: Number(doc.stok),
                foto: doc.foto,
                add: new Date().getTime(),
                tipe: doc.tipe
            }))
            data.forEach((isi)=>{
                set(refRDB(RDB,'product/'+isi.id),{...isi})
            })
            setTimeout(()=>{setLoading(false)},5000)
        }
    }

    return(
        <Admin>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
                <div className='flex justify-center items-center mb-6'>
                    <a href={fileUrl} className='flex flex-col justify-center items-center border border-gray-900 rounded-lg dark:border-white p-4 dark:text-white'>
                        <FaFileCsv className='w-20 h-20 mb-2'/>
                        <p>Download Template</p>
                    </a>
                </div>
                <form onSubmit={upFile} className='flex flex-col justify-center items-center'>
                    <input type='file' accept='.csv' className='opacity-0' id='csv' required/>
                    <label htmlFor='csv' className='border border-gray-900 rounded-lg dark:border-white p-4 dark:text-white cursor-pointer'>
                        <FaFileCsv className='w-20 h-20 mb-2'/>
                        <p>Upload File</p>
                    </label>
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mt-4" type='submit'>Cek File</button>
                </form>
                <div className='mt-4 flex justify-center items-center'>
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={()=>saveFile()}>{loading==false?'Upload':'Loading'}</button>
                </div>
                {!csvArray.length?'':
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4'>
                    {csvArray.map((item,index)=>(
                        <Image src={item.foto} width={120} height={120} alt='foto' className='rounded-lg' key={index} unoptimized/>
                    ))}
                </div>
                }
            </section>
        </Admin>
    )
}
export default Upload