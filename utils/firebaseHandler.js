import { signOut } from "@firebase/auth"
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "@firebase/firestore"
import { auth, db } from "./firebaseClient"

const colHandler = (item, result=[]) => {
    item.forEach(doc=>{
        const data = doc.data()
        delete data.added
        result.push(data)
    })
    return result
}

const allDocsByDate = async (col='', result=[]) => {
    const res = await getDocs(query(collection(db,col),orderBy('added','desc')))
    colHandler(res,result)
}
const allDocs = async (col='', result=[]) => {
    const res = await getDocs(collection(db,col))
    colHandler(res,result)
}
const oneDoc = async (col='',docId='',result=[]) => {
    const res = await getDoc(doc(db,col,docId))
    if(res.exists()){
        const data = res.data()
        delete data.added
        result.push(data)
        return result
    } else {
        return result
    }
}
const allDocsByBrand = async (col='',brand='',result=[]) => {
    const res = await getDocs(query(collection(db,col),where('brand','==',brand)))
    colHandler(res,result)
}
const upDoc = async (col='',docId='',data={}) => {
    await updateDoc(doc(db,col,docId),data)
}
const adDoc = async (col='',docId='',result) => {
    await setDoc(doc(db,col,docId),result)
}

const LogOut = () => signOut(auth)

export {allDocsByDate,allDocs,oneDoc,allDocsByBrand,LogOut,upDoc,adDoc}