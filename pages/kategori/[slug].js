import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore"
import { useRouter } from "next/router"
import Fall from "../../components/Fall"
import Hero from "../../components/Hero"
import Item from "../../components/Item"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { db } from "../../utils/firebaseClient"

export const getStaticPaths = async () => {
    const data = []
    const res = await getDocs(collection(db,'product'))
    res.forEach((doc)=>{
        data.push(doc.data().tipe)
    })
    const isi = data.filter((item,index,self)=>self.indexOf(item)===index)
    return {
        paths: isi.map(item=>({
            params: {slug: item}
        })),
        fallback: true
    }
}
export const getStaticProps = async ({params}) => {
    const {slug} = params
    const link = await getDoc(doc(db,'utils','site'))
    const data = []
    const res = await getDocs(query(collection(db,'product'),where('tipe','==',slug)))
    res.forEach((doc)=>{
        data.push(doc.data())
    })
    const allProduk = []
    const getAllProduk = await getDocs(collection(db,'product'))
    getAllProduk.forEach((doc)=>{
        allProduk.push(doc.data())
    })
    if(!data.length){
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return {
        props: {
            data: link.data(),
            produk: data,
            tag: slug,
            all: allProduk
        },
        revalidate: 1
    }
}

const Kategori = ({data,produk,tag,all}) => {
    const router = useRouter()

    if(router.isFallback) return <Fall/>
    return(
        <Layout tag={data.link} tipe={all.map(item=>({tag:item.tag,tipe:item.tipe}))} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={tag}/>
            <Hero tagline={data.tagline} value={data.value} hero={produk[0].foto}/>
            <Item produk={produk.sort((a,b)=>b.add-a.add).slice(0,4)} tag='Koleksi terbaru'/>
            <Item produk={produk} tag='Semua Koleksi'/>
        </Layout>
    )
}
export default Kategori