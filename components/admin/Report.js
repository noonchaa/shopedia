import { useEffect, useState } from "react"
import { RDB, refRDB } from "../../utils/firebaseClient"
import Link from 'next/link'
import { off, onValue } from "@firebase/database"

const Report = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        onValue(refRDB(RDB,'order'),(snap)=>{
            setOrder(Object.values(snap.val()))
        })

        return () => {
            off(refRDB(RDB,'order'))
        }
    },[])
    const Card = ({numb,big,small,reff}) => {
        return(
            <Link href={'/dashboard/'+(reff?reff:'#')}>
            <a className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-indigo-500">
                    <p className='text-xl lg:text-2xl font-bold text-white'>{numb}</p>
                </div>
                <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                        <span className="font-semibold text-indigo-500 dark:text-indigo-400">{big}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-200">{small}</p>
                    </div>
                </div>
            </a>
            </Link>
        )
    }

    return(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card numb={order.length} big='Total Order' small='Total semua order'/>
            <Card numb={order.filter(item=>new Date(item.transaction_time).getFullYear()==new Date().getFullYear()).length} big={'Order Tahun '+new Date().getFullYear()} small='Total order tahun ini'/>
            <Card numb={order.filter(item=>new Date(item.transaction_time).toLocaleString('ID',{'year':'2-digit','month':'2-digit'}) == new Date().toLocaleString('ID',{'year':'2-digit','month':'2-digit'})).length} big={'Order Bulan '+new Date().toLocaleString('ID',{'month':'long'})} small='Total order bulan ini'/>
            <Card numb={order.filter(item=>new Date(item.transaction_time).toLocaleString('ID',{'year':'2-digit','month':'2-digit','day':'2-digit'}) == new Date().toLocaleString('ID',{'year':'2-digit','month':'2-digit','day':'2-digit'})).length} big={'Order Hari '+new Date().toLocaleString('ID',{'weekday':'long'})} small='Total order hari ini'/>
            <Card numb={order.filter(item=>item.status=='Lunas').length} big='Lunas' small='Lihat detail pesanan' reff='lunas'/>
            <Card numb={order.filter(item=>item.status=='Menunggu pembayaran').length} big='Menunggu Pembayaran' small='Cek status pesanan' reff='pending'/>
            <Card numb={order.filter(item=>item.status=='Pembayaran gagal').length} big='Pembayaran gagal' small='Restore stok' reff='gagal'/>
            <Card numb={order.filter(item=>item.status=='Packing').length} big='Packing' small='Input resi pengiriman' reff='packing'/>
            <Card numb={order.filter(item=>item.status=='Delivery').length} big='Dalam Pengiriman' small='Tracking pengiriman' reff='delivery'/>
            <Card numb={order.filter(item=>item.status=='Sampai').length} big='Sampai Tujuan' small='Update komplain atau finish' reff='sampai'/>
            <Card numb={order.filter(item=>item.status=='Komplain').length} big='Komplain' small='Proses pesanan komplain' reff='komplain'/>
            <Card numb={order.filter(item=>item.status=='Finish').length} big='Finish' small='Total order selesai' reff='finish'/>
            <Card numb={order.filter(item=>item.status=='Cancel').length} big='Cancel' small='Total order cancel' reff='cancel'/>
        </div>
    )
}
export default Report