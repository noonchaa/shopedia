import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from '../../components/Layout'
import Image from 'next/image'

const Finish3ds = () => {
    const router = useRouter()
    const [stat, setStat] = useState()

    useEffect(()=>{
        const getStatus = async () => {
            const res = await fetch('/api/cekPay?id='+router.query.id)
            const data = await res.json()
            setStat(data)
        }
        getStatus()
    },[router.query.id])

    return(
        <Layout>
            {!stat?
            <div className='text-center mt-16 max-w-3xl mx-auto'>
                <h1 className='font-medium tracking-wider text-2xl text-green-600 animate-pulse'>... Loading ...</h1>
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
export default Finish3ds