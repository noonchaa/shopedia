import { collection, getDocs, orderBy, query } from "@firebase/firestore"
import { db } from "./firebaseClient"

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

export {allDocsByDate,allDocs}