import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Image from 'next/image'
import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { db } from "../utils/firebaseClient"
import { AuthUser } from "../components/User"

export const getStaticProps = async () => {
    const link = await getDoc(doc(db,'utils','site'))
    return {
        props: {
            link: link.data()
        }
    }
}

const Status = ({link}) => {
    const user = AuthUser()
    const router = useRouter()
    const [stat, setStat] = useState()

    useEffect(()=>{
        if(!router.isReady) return;
        if(user){
            const getStatus = async () => {
                const res = await fetch('/api/cekPay?id='+router.query.id)
                const data = await res.json()
                if(data.transaction_status=='capture'||data.transaction_status=='settlement'){
                    const res = await getDoc(doc(db,'users',user.uid))
                    if(res.exists()){
                        const order = res.data().order
                        const filtered = order.filter(item=>item.order_id==router.query.id)
                        filtered[0].status='Lunas'
                        const indexOrder = order.findIndex((item)=>item.order_id==router.query.id)
                        order.splice(indexOrder,1,...filtered)
                        await updateDoc(doc(db,'users',user.uid),{order:order})
                        await updateDoc(doc(db,'order',router.query.id),{status:'Lunas'})
                        setStat(data)
                    } else {
                        router.back()
                    }
                } else if(data.transaction_status=='pending'){
                    const res = await getDoc(doc(db,'users',user.uid))
                    if(res.exists()){
                        const order = res.data().order
                        const filtered = order.filter(item=>item.order_id==router.query.id)
                        filtered[0].status='Menunggu pembayaran'
                        const indexOrder = order.findIndex((item)=>item.order_id==router.query.id)
                        order.splice(indexOrder,1,...filtered)
                        await updateDoc(doc(db,'users',user.uid),{order:order})
                        await updateDoc(doc(db,'order',router.query.id),{status:'Menunggu pembayaran'})
                        setStat(data)
                    } else {
                        router.back()
                    }
                } else {
                    const res = await getDoc(doc(db,'users',user.uid))
                    if(res.exists()){
                        const order = res.data().order
                        const filtered = order.filter(item=>item.order_id==router.query.id)
                        filtered[0].status='Pembayaran gagal'
                        const indexOrder = order.findIndex((item)=>item.order_id==router.query.id)
                        order.splice(indexOrder,1,...filtered)
                        await updateDoc(doc(db,'users',user.uid),{order:order})
                        await updateDoc(doc(db,'order',router.query.id),{status:'Pembayaran gagal'})
                        setStat(data)
                    } else {
                        router.back()
                    }
                }
            }
            getStatus()
        }
    },[router,user])

    return(
        <Layout tag={link.link} title={link.siteTitle} tagline={link.tagline} phone={link.phone} email={link.email}>
            {!stat?
            <div className='text-center mt-16 max-w-3xl mx-auto h-96'>
                <h1 className='font-medium tracking-wider text-2xl animate-pulse'>... Loading ...</h1>
            </div>
            : stat.transaction_status=='capture' || stat.transaction_status=='settlement' ?
            <div className='text-center mt-16 max-w-3xl mx-auto'>
                <div className='relative h-80 max-w-xs mx-auto'>
                    <Image src='/svg/succes.svg' layout='fill' objectFit='contain' alt='succes'/>
                </div>
                <h1 className='font-medium tracking-wider'>Terima kasih, pembayaran anda telah kami terima, silahkan cek profil untuk melihat status pesanan.</h1>
            </div>
            : stat.transaction_status=='pending'?
            <div className='text-center mt-16 max-w-3xl mx-auto'>
                <div className='relative h-80 max-w-xs mx-auto'>
                    <Image src='/svg/pending.svg' layout='fill' objectFit='contain' alt='succes'/>
                </div>
                <h1 className='font-medium tracking-wider'>Terima kasih, pesanan anda telah kami terima, silahkan lanjutkan pembayaran sesuai instruksi, kemudian cek profil untuk melihat status pesanan.</h1>
            </div>
            :
            <div className='text-center mt-16 max-w-3xl mx-auto'>
                <div className='relative h-80 max-w-xs mx-auto'>
                    <Image src='/svg/deny.svg' layout='fill' objectFit='contain' alt='succes'/>
                </div>
                <h1 className='font-medium tracking-wider'>Maaf pembayaran anda gagal, silahkan cek profil untuk melihat status pesanan.</h1>
            </div>
            }
        </Layout>
    )
}
export default Status