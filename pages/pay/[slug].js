import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../components/User"
import Card from "../../components/pay/Card"
import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
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
    const [userData, setUserData] = useState('')
    const [cartData, setCartData] = useState([])

    useEffect(()=>{
        if(user){
            const getProfile = async () => {
                const cart = []
                const resCart = await getDocs(collection(db,user.uid))
                resCart.forEach((doc)=>{
                    cart.push(doc.data())
                })
                setCartData(cart)
                const resUser = await getDoc(doc(db,'user',user.uid))
                if(resUser.exists()){
                    setUserData(resUser.data())
                } else {
                    setUserData('')
                }
            }
            getProfile()
        }
        return () => {
        }
    },[user])

    if(router.isFallback) return <h1 className='text-center mt-16 animate-pulse text-green-600 text-3xl font-medium'>... Loading ...</h1>

    return(
        <div className='max-w-xs bg-gray-100 bg-opacity-50 border border-green-600 mx-auto my-16 rounded p-4'>
            <h1 className='text-center text-3xl tracking-wider font-medium text-green-600 mb-2'>Shopedia</h1>
            <p className='font-bold mb-2 capitalize'>Tipe Pembayaran : {data.replace(/[_]/g,' ')}</p>
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
                <p className='font-bold mb-2'>Total</p>
                <p className='font-bold mb-2'>Rp. {cartData.map(item=>Number(item.price*item.sum)).reduce((part_sum,a)=>part_sum+a,0).toLocaleString('ID',{'currency':'IDR'})}</p>
            </div>
            <p className='font-bold mb-2'>Alamat Pengiriman :</p>
            <div className={userData==''?'hidden':'grid grid-cols-2 gap-2 ml-2 mb-2'}>
                <p className='font-medium capitalize'>Nama :</p>
                <p className='font-medium capitalize'>{userData.name}</p>
                <p className='font-medium capitalize'>Telpon :</p>
                <p className='font-medium capitalize'>{userData.phone}</p>
                <p className='font-medium capitalize'>Alamat :</p>
                <p className='font-medium capitalize'>{userData.address}</p>
            </div>
            <p className='font-bold mb-2'>Detail Pembayaran :</p>
            {data=='kartu_kredit'?<Card order={cartData} user={userData} nama={user?user.displayName.toLowerCase().replace(/[ ]/g,'_'):''}/>:''}
        </div>
    )
}
export default PayLink