import { doc, setDoc } from "@firebase/firestore";
import { useState } from "react"
import { db } from "../../utils/firebaseClient";

const Massal = () => {
    const [csvArray, setCsvArray] = useState([])

    const processCSV = (str, delim=';') => {
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

        setCsvArray(newArray)
    }

    const submitForm = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            processCSV(text)
        }
        reader.readAsText(e.target.csv.files[0])
        const data = csvArray.map(doc => ({
            nama: doc.nama,
            tag: doc.tag,
            id: doc.id,
            warna: doc.warna,
            size: [doc.size1,doc.size2,doc.size3,doc.size4,doc.size5].filter(item=>item != undefined && item != ""),
            desc: doc.desc,
            harga: Number(doc.harga),
            berat: Number(doc.berat),
            stok: Number(doc.stok),
            foto: doc.foto,
            add: new Date().getTime()
        }))
        data.pop()
        data.forEach( (isi)=>{
            setDoc(doc(db,'product',isi.id),{...isi})
        })
    }
    return(
        <div>
            <form onSubmit={submitForm}>
                <input type='file' id='csv' className='bg-gray-900 mx-auto my-6' accept='.csv'/><br/>
                <button type='button' className='bg-red-600 mx-auto my-6'>Lihat</button><br/>
                <button type='submit' className='bg-gray-900 mx-auto my-6'>Upload</button><br/>
            </form>
        </div>
    )
}
export default Massal