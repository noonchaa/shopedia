import React, { useEffect, useState } from "react"
import {auth} from '../utils/firebaseClient'
import {onAuthStateChanged} from 'firebase/auth'

export const UserContext = React.createContext(null)

const User = ({children}) => {
    //set state for signin user
    const [signUser, setSignUser] = useState(null)

    //listen to signin user and persist on reload
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if (user) {
                setSignUser(user)
            } else {
                setSignUser(null)
            }
        })
    },[])

    return(
        <UserContext.Provider value={signUser}>
            {children}
        </UserContext.Provider>
    )
}
export default User