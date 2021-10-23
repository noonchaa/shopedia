import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
import Layout from "../components/Layout"
import { db } from "../utils/firebaseClient"

export const getStaticProps = async () => {
    const res = await getDoc(doc(db,'utils','site'))
    const data = []
    const product = await getDocs(collection(db,'product'))
    product.forEach((doc)=>{
        data.push(doc.data())
    })
    if(res.exists()){
        return {
            props: {
                data: res.data(),
                produk: data
            },
            revalidate: 60
        }
    } else {
        return {
            props: {
                data: null,
                produk: []
            },
            revalidate: 60
        }
    }
}

const NotFound = ({data,produk}) => {
    return(
        <Layout tag={data.link} tipe={produk.map(item=>({tag:item.tag,tipe:item.tipe}))} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email}>
            <div className='flex flex-col justify-center items-center h-screen -my-4'>
                <h1 className='font-bold text-5xl text-red-600'>404</h1>
                <h1 className='font-semibold tracking-wide'>Page not found</h1>
            </div>
        </Layout>
    )
}
export default NotFound