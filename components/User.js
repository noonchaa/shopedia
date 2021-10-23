import { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../utils/firebaseClient'
import {onAuthStateChanged} from 'firebase/auth'

export const UserContext = createContext()

export default function UserContextComp({children}){
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return () => unsub()
    },[])

    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const AuthUser = () => useContext(UserContext)