import React, { useContext, useEffect, useState } from "react"
import {auth} from '../utils/firebaseClient'
import {onAuthStateChanged} from 'firebase/auth'

export const UserContext = React.createContext(null)

export const User = ({children}) => {
    const [signUser, setSignUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if (user) {
                setSignUser(user)
            } else {
                setSignUser(null)
            }
        })
        return () => {
            setSignUser(null)
        }
    },[])

    return(
        <UserContext.Provider value={signUser}>
            {children}
        </UserContext.Provider>
    )
}

export const AuthUser = () => useContext(UserContext)