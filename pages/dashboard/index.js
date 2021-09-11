import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Admin from '../../components/Admin'
import { UserContext } from '../../components/User'
import { db } from '../../utils/firebaseClient'
import { collection, onSnapshot,query } from '@firebase/firestore'

const Dashboard = () => {
    //retrieve currently signin user
    const user = useContext(UserContext)
    //next/router for redirecting to another page
    const router = useRouter()
    //set initial state
    const [stock, setStock] = useState([])

    useEffect(()=>{
        //get list of products stocks onMount
        onSnapshot(query(collection(db,'brand')),(snap)=>{
            const data = []
            snap.forEach((doc)=>{
                data.push(doc.data())
            })
            setStock(data)
        })
    },[])
    return(
        <Admin>
            {stock.map((item,index)=>(
                <div key={index} className='mt-8 max-w-3xl mx-auto text-center'>
                    <h1 className='font-semibold text-green-600 text-xl tracking-wider capitalize text-left'>## {item.id}</h1>
                    {item.product.map((product,indexProduct)=>(
                        <div className='grid grid-cols-2 border-b p-2' key={indexProduct}>
                            <h1 className='font-semibold tracking-wide capitalize'>{product.name}</h1>
                            <h1 className='font-bold italic tracking-wide'>{product.stock} units</h1>
                        </div>
                    ))}
                </div>
            ))}
        </Admin>
    )
}
export default Dashboard