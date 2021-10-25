import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getAnalytics} from 'firebase/analytics'
import {getDatabase, ref} from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASURE
};

//initialize firebase app
const firebaseApp = initializeApp(firebaseConfig)
if(typeof window !== 'undefined'){
    if('measurementId' in firebaseConfig){
        getAnalytics()
    }
}

//enabled firebase feature
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
export const RDB = getDatabase(firebaseApp)
export const refRDB = ref