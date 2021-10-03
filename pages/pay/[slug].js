import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../components/User"
import Card from "../../components/pay/Card"
import { doc, getDoc } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"

export const getStaticPaths = async () => {
    const res = await getDoc(doc(db,'utils','payList'))
    if(res.exists()){
        const paths = res.data().payList.map(item=>({
            params: {slug: item.toLowerCase().replace(/[ ]/g,'_')}
        }))
        return {
            paths,
            fallback: true
        }
    } else {
        const paths = []
        return {
            paths,
            fallback: true
        }
    }
}
export const getStaticProps = async ({params}) => {
    const {slug} = params
    if(!slug) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return {
        props: {
            data: slug
        },
        revalidate: 1
    }
}

const PayLink = ({data}) => {
    const router = useRouter()
    const user = useContext(UserContext)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: 0,
        address: {
            city_id: '',
            city_name: '',
            lengkap: '',
            postal_code: '',
            province: '',
            province_id: '',
            type: ''
        }
    })
    const [cartData, setCartData] = useState([])
    const [total, setTotal] = useState(0)
    const [kurir, setKurir] = useState([])
    const [listOngkir, setListOngkir] = useState([])
    const [ongkir, setOngkir] = useState(0)
    const [service, setService] = useState('')
    const [namaKurir, setNamaKurir] = useState('')

    useEffect(()=>{
        if(user){
            const getProfile = async () => {
                const resUser = await getDoc(doc(db,'user',user.uid))
                if(resUser.exists()){
                    setUserData(resUser.data())
                    setCartData(resUser.data().cart)
                    setTotal(resUser.data().cart.map(item=>Number(item.price*item.sum)).reduce((part_sum,a)=>part_sum+a,0))
                } else {
                    setUserData('')
                }
            }
            getProfile()
        }
        const getKurir = async () => {
            const res = await getDoc(doc(db,'utils','kurir'))
            if(res.exists()){
                setKurir(res.data().kurir)
            } else {
                setKurir([])
            }
        }
        getKurir()
        return () => {
        }
    },[user])

    const getOngkir = async (e) => {
        if(e.target.value!=''){
            setNamaKurir(e.target.value)
            const dest = userData.address.city_id
            const berat = cartData.map(item=>item.sum*1000).reduce((part_sum,a)=>part_sum+a,0)
            const kurir = e.target.value
            const cost = await fetch('/api/cost',{
                method:'POST',
                body: JSON.stringify({
                    kurir:kurir,
                    berat: berat,
                    dest: dest
                })
            })
            const costData = await cost.json()
            setListOngkir(costData.rajaongkir.results[0].costs)
        }
    }

    if(router.isFallback) return <h1 className='text-center mt-16 animate-pulse text-black text-3xl font-medium'>... Loading ...</h1>

    return(
        <div className='w-full max-w-md bg-gray-100 border border-black mx-auto md:my-16 md:rounded-xl p-4'>
            <h1 className='text-center text-3xl tracking-wider font-bold mb-2'>Shopedia</h1>
            <p className='font-bold mb-2 capitalize'>Tipe Pembayaran : {data.replace(/[_]/g,' ')}</p>
            <p className='font-bold mb-2'>Pilih kurir : {namaKurir.toUpperCase()} {service}</p>
            <select className='w-full rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black uppercase font-medium bg-gray-200 appearance-none'
                onChange={(e)=>getOngkir(e)}>
                <option value=''>Kurir</option>
                {kurir.map((item,index)=>(
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
            <div className='grid grid-cols-2 gap-4 mb-2 cursor-pointer'>
                {listOngkir.map((item,index)=>(
                    <div className='bg-gray-200 rounded-xl px-2 py-1' key={index} onClick={()=>{
                        setOngkir(item.cost[0].value)
                        setService(item.service)
                        }}>
                        <p className='font-bold'>{item.service}</p>
                        <p className='font-medium'>{item.description}</p>
                        <p className='font-medium'>{item.cost[0].etd.replace('HARI','')} hari</p>
                        <p className='font-medium'>Rp. {Number(item.cost[0].value).toLocaleString('ID',{currency:'idr'})}</p>
                        <p className='font-medium'>{item.cost[0].note}</p>
                    </div>
                ))}
            </div>
            <p className='font-bold mb-2'>Detail Pesanan :</p>
            {cartData.map((item,index)=>(
                <div key={index} className='grid grid-cols-2 gap-2 ml-2 mb-2'>
                    <div>
                        <p className='font-medium capitalize'>{item.name}</p>
                        <p className='font-medium capitalize italic'>{item.sum} units</p>
                    </div>
                    <p className='font-medium'>Rp. {Number(item.price*item.sum).toLocaleString('ID',{'currency':'IDR'})}</p>
                </div>
            ))}
            <div className={!cartData.length?'hidden':'grid grid-cols-2 ml-2 border-t border-gray-700'}>
                <p className='font-bold mb-2'>SubTotal</p>
                <p className='font-bold mb-2'>Rp. {cartData.map(item=>Number(item.price*item.sum)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
                <p className='font-medium mb-2'>Ongkos kirim</p>
                <p className='font-bold mb-2'>Rp. {Number(ongkir).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <div className={!cartData.length?'hidden':'grid grid-cols-2 ml-2 border-t border-gray-700'}>
                <p className='font-bold mb-2'>Total</p>
                <p className='font-bold mb-2'>Rp. {(Number(total)+Number(ongkir)).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <p className='font-bold mb-2'>Alamat Pengiriman :</p>
            <div className={userData==''?'hidden':'grid grid-cols-2 gap-2 ml-2 mb-2'}>
                <p className='font-medium capitalize'>Nama :</p>
                <p className='font-medium capitalize'>{userData.name}</p>
                <p className='font-medium capitalize'>Telpon :</p>
                <p className='font-medium capitalize'>0{userData.phone}</p>
                <p className='font-medium capitalize'>Alamat :</p>
                <p className='font-medium capitalize'>{userData.address.lengkap}<br/>{userData.address.type} {userData.address.city_name}, {userData.address.province}, {userData.address.postal_code}</p>
            </div>
            <p className='font-bold mb-2'>Detail Pembayaran :</p>
            {data=='kartu_kredit'?<Card order={cartData} total={total} ongkir={ongkir} namaKurir={namaKurir} service={service} user={userData} nama={user?user.displayName.toLowerCase().replace(/[ ]/g,'_'):''}/>:''}
        </div>
    )
}
export default PayLink