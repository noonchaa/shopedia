import { useEffect, useState } from "react"
import {FaCheck} from 'react-icons/fa'

const Kurir = ({total,berat}) => {
    const [krr, setKrr] = useState('jne')
    const [prov, setProv] = useState('')
    const [city, setCity] = useState([])
    const [alamat, setAlamat] = useState({lengkap:''})
    const [text, setText] = useState('Cek Ongkir')
    const [service, setService] = useState([])
    const [ongkir, setOngkir] = useState(0)

    useEffect(()=>{
        const getCity = async () => {
            const res = await fetch('/api/city')
            const data = await res.json()
            setCity(data.rajaongkir.results)
        }
        getCity()

        return () => {
            setCity([])
        }
    },[])
    const setProvinsi = (e) => {
        setProv('')
        setText('Cek Ongkir')
        setOngkir(0)
        setAlamat({lengkap:''})
        setProv(e.target.value)
    }

    const setKota = (e) => {
        setText('Cek Ongkir')
        const kota = JSON.parse(e.target.value)
        setAlamat({...alamat,...kota})
    }

    const getOngkir = async () => {
        setText('Loading')
        if(!alamat.city_id){
            setText('Mohon pilih kota')
        } else {
            const res = await fetch('/api/cost',{
                method:'POST',
                body: JSON.stringify({
                    dest: alamat.city_id,
                    berat: berat,
                    kurir: krr
                })
            })
            const data = await res.json()
            setText('Cek Ongkir')
            setService(data.rajaongkir.results)
        }
    }

    return(
        <div className="p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
            <h1 className='mb-2'>pilih kurir</h1>
            <div className='flex justify-around'>
                <div>
                    <input type='radio' value='jne' name='exp' onChange={(e)=>setKrr(e.currentTarget.value)} className='cursor-pointer w-6 h-6'/><br/>
                    <label htmlFor='jne'>JNE</label>
                </div>
                <div>
                    <input type='radio' value='pos' name='exp' onChange={(e)=>setKrr(e.currentTarget.value)} className='cursor-pointer w-6 h-6'/><br/>
                    <label htmlFor='pos'>POS</label>
                </div>
            </div>
            <select className='px-4 py-2 mt-2 w-full appearance-none text-center rounded-lg focus:outline-none bg-white dark:bg-gray-900 dark:text-white cursor-pointer'
            onChange={(e)=>setProvinsi(e)}>
                <option value=''>Pilih Provinsi</option>
                {city.map(item=>item.province).filter((item,index,self)=>self.indexOf(item)===index).map((item,index)=>(
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <select className='px-4 py-2 mt-2 w-full appearance-none text-center rounded-lg focus:outline-none bg-white dark:bg-gray-900 dark:text-white cursor-pointer'
            onChange={(e)=>setKota(e)} id='kota'>
                {prov==''?
                <option value='' defaultValue>Pilih Kota</option>:
                city.filter(item=>item.province===prov).map((item,index)=>(
                    <option key={index} value={JSON.stringify(item)}>{item.type} {item.city_name}</option>
                ))}
            </select>
            <textarea className='px-4 py-2 mt-2 w-full appearance-none rounded-lg focus:outline-none bg-white dark:bg-gray-900 dark:text-white' placeholder='Alamat Lengkap' rows={3} value={alamat.lengkap} onChange={(e)=>setAlamat({...alamat,lengkap:e.target.value})}/>
            <div className='text-right mt-1'>
                <button className='px-4 py-2 bg-white dark:bg-gray-900 dark:text-white rounded-lg' onClick={()=>getOngkir()}>{text}</button>
            </div>
            <div>
                {service.map((item,index)=>(
                    <div key={index} className='bg-white dark:bg-gray-900 dark:text-white py-4 rounded-lg mt-2'>
                        <h1 className='text-center mb-2 text-sm font-medium'>{item.name}</h1>
                        <div className='px-2 grid grid-cols-2 gap-2'>
                        {item.costs.map((isi,indexIsi)=>(
                            <div key={indexIsi} className='bg-gray-100 dark:bg-gray-800 p-2 rounded-lg cursor-pointer'>
                                {isi.cost.map((cost,indexCost)=>(
                                    <div key={indexCost} onClick={()=>setOngkir(cost.value)}>
                                        <div className='flex justify-between'>
                                            <p className='font-medium'>{isi.service}</p>
                                            {ongkir==cost.value?
                                            <FaCheck/>:''}
                                        </div>
                                        <h1>Rp. {Number(cost.value).toLocaleString('ID',{'currency':'IDR'})}</h1>
                                        <h1>{cost.etd} {cost.etd?'Hari':''}</h1>
                                    </div>
                                ))}
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
            <hr className="border-gray-200 dark:border-gray-700 -mx-3 my-3"/>
            <p>Sub Total : Rp. {Number(total).toLocaleString('ID',{'currency':'IDR'})}</p>
            <p>Ongkir : Rp. {Number(ongkir).toLocaleString('ID',{'currency':'IDR'})}</p>
            <hr className="border-gray-900 dark:border-gray-100 -mx-3 my-3"/>
            <p className='font-bold'>Total : Rp. {(Number(total)+Number(ongkir)).toLocaleString('ID',{'currency':'IDR'})}</p>
            <div className="py-3 text-sm text-white capitalize bg-gray-900 text-center cursor-pointer -mx-3 -mb-3 mt-3">
                Bayar
            </div>
        </div>
    )
}
export default Kurir