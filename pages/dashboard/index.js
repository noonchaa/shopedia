import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Admin from '../../components/Admin'
import { UserContext } from '../../components/User'
import { db } from '../../utils/firebaseClient'
import { collection, onSnapshot,query } from '@firebase/firestore'

const Dashboard = () => {
    const user = useContext(UserContext)
    const router = useRouter()
    const [stock, setStock] = useState([])

    useEffect(()=>{
        onSnapshot(query(collection(db,'brand')),(snap)=>{
            const data = []
            snap.forEach((doc)=>{
                data.push(doc.data())
            })
            setStock(data)
        })
    },[])

    if(user){
        user.email!='shopadmin@shopedia.com'?router.push('/'):''
    }
    return(
        <Admin>
            {stock.map((item,index)=>(
                <div key={index} className='mt-8 max-w-3xl mx-auto text-center'>
                    <h1 className='font-semibold text-green-600 text-xl tracking-wider capitalize text-left'>## {item.id}</h1>
                    {item.product.map((product,indexProduct)=>(
                        <div className='grid grid-cols-2' key={indexProduct}>
                            <h1>{product.name}</h1>
                            <h1>{product.stock} units</h1>
                        </div>
                    ))}
                </div>
            ))}
        </Admin>
    )
}
export default Dashboard