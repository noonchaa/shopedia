import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
import { db } from "../../utils/firebaseClient"
import {useRouter} from 'next/router'
import Layout from "../../components/Layout"
import Detail from "../../components/Detail"
import Item from "../../components/Item"
import Fall from "../../components/Fall"
import Seo from "../../components/Seo"

export const getStaticPaths = async () => {
    const data = []
    const res = await getDocs(collection(db,'product'))
    res.forEach((doc)=>{
        data.push(doc.id)
    })
    return {
        paths: data.map(item=>({
            params: {slug: item}
        })),
        fallback: true
    }
}

export const getStaticProps = async ({params}) => {
    const {slug} = params
    const link = await getDoc(doc(db,'utils','site'))
    const data = await getDoc(doc(db,'product',slug))
    const allProduk = []
    const produk = await getDocs(collection(db,'product'))
    produk.forEach((doc)=>{
        allProduk.push(doc.data())
    })
    if(!data.exists()){
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return {
        props: {
            link: link.data(),
            data: data.data(),
            produk: allProduk
        }
    }
}

const Product = ({link, data, produk}) => {
    const router = useRouter()

    if(router.isFallback) return <Fall/>
    return(
        <Layout tag={link.link} tipe={produk.map(item=>({tag:item.tag,tipe:item.tipe}))} title={link.siteTitle} tagline={link.tagline} phone={link.phone} email={link.email} >
            <Seo title={data.nama} desc={data.desc}/>
            <Detail data={data} />
            <Item produk={produk.filter(item=>item.tag==data.tag).slice(0,4)} tag='Produk serupa'/>
            <Item produk={produk.sort((a,b)=>b.add-a.add).slice(0,4)} tag='Koleksi terbaru'/>
            <Item produk={produk.sort((a,b)=>a.add-b.add).slice(0,16)} tag='Lengkapi koleksi kamu'/>
        </Layout>
    )
}
export default Product