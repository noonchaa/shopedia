import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Image from 'next/image'
import { RDB, refRDB } from "../utils/firebaseClient"
import { AuthUser } from "../components/User"
import { get, update } from "@firebase/database"

export const getStaticProps = async () => {
    const props = {
        produk:[],
        tag:[],
        tipe:[],
        data: {}
    }
    await get(refRDB(RDB,'product')).then((snap)=>{
        const res = Object.values(snap.val())
        props.produk = res
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    await get(refRDB(RDB,'util/site')).then((snap)=>{
        props.data = snap.val()
    })
    return {
        props: {...props},
        revalidate: 60
    }
}

const Status = ({data,tag,tipe}) => {
    const user = AuthUser()
    const router = useRouter()
    const [stat, setStat] = useState()

    useEffect(()=>{
        if(!router.isReady) return;

        if(user){
            const getStatus = async () => {
                const res = await fetch('/api/cekPay?id='+router.query.id)
                const data = await res.json()
                await get(refRDB(RDB,'order/'+router.query.id)).then((snap)=>{
                    if(snap.val().status == ''){
                        if(data.transaction_status=='capture'||data.transaction_status=='settlement'){
                            update(refRDB(RDB,'order/'+router.query.id),{status:'Lunas'})
                            setStat(data)
                        } else if(data.transaction_status=='pending'){
                            update(refRDB(RDB,'order/'+router.query.id),{status:'Menunggu pembayaran'})
                            setStat(data)
                        } else {
                            update(refRDB(RDB,'order/'+router.query.id),{status:'Pembayaran gagal'})
                            setStat(data)
                        }
                    } else {
                        router.back()
                    }
                })
            }
            getStatus()
        }
    },[router,user])

    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
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
                <p className='font-medium tracking-wider'>*Untuk pembayaran melalui Gopay, silahkan lakukan pembayaran sebelum 15 menit</p>
                <p className='font-medium tracking-wider'>**Untuk pembayaran melalui ShopeePay, silahkan lakukan pembayaran sebelum 5 menit</p>
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