import { collection, getDocs } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../utils/firebaseClient"

const Report = () => {
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const getOrder = async () => {
            const data = []
            const res = await getDocs(collection(db,'order'))
            res.forEach(doc => {
                data.push(doc.data())
            })
            setOrder(data)
        }
        getOrder()
    },[])

    return(
        <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-blue-500">
                    <p className='text-xl lg:text-2xl font-bold text-white'>{order.filter(item=>new Date(item.transaction_time).toLocaleString('ID',{'year':'2-digit','month':'2-digit','day':'2-digit'}) == new Date().toLocaleString('ID',{'year':'2-digit','month':'2-digit','day':'2-digit'})).length}</p>
                </div>
                
                <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                        <span className="font-semibold text-blue-500 dark:text-blue-400">Order Hari {new Date().toLocaleString('ID',{'weekday':'long'})}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-200">Total order hari ini</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-blue-500">
                    <p className='text-xl lg:text-2xl font-bold text-white'>{order.length}</p>
                </div>
                
                <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                        <span className="font-semibold text-blue-500 dark:text-blue-400">Total Order</span>
                        <p className="text-sm text-gray-600 dark:text-gray-200">Total semua order</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-blue-500">
                    <p className='text-xl lg:text-2xl font-bold text-white'>{order.filter(item=>new Date(item.transaction_time).getFullYear()==new Date().getFullYear()).length}</p>
                </div>
                
                <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                        <span className="font-semibold text-blue-500 dark:text-blue-400">Order Tahun {new Date().getFullYear()}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-200">Total order tahun ini</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-blue-500">
                    <p className='text-xl lg:text-2xl font-bold text-white'>{order.filter(item=>new Date(item.transaction_time).toLocaleString('ID',{'year':'2-digit','month':'2-digit'}) == new Date().toLocaleString('ID',{'year':'2-digit','month':'2-digit'})).length}</p>
                </div>
                
                <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                        <span className="font-semibold text-blue-500 dark:text-blue-400">Order Bulan {new Date().toLocaleString('ID',{'month':'long'})}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-200">Total order bulan ini</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Report