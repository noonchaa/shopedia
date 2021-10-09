import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore"
import { useRouter } from "next/router"
import Fall from "../../components/Fall"
import Hero from "../../components/Hero"
import Item from "../../components/Item"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { db } from "../../utils/firebaseClient"

export const getStaticPaths = async () => {
    const res = await getDoc(doc(db,'utils','site'))
    return {
        paths: res.data().link.map(item=>({
            params: {slug:item}
        })),
        fallback: true
    }
}

export const getStaticProps = async ({params}) => {
    const {slug} = params
    const link = await getDoc(doc(db,'utils','site'))
    const data = []
    const res = await getDocs(query(collection(db,'product'),where('tag','==',slug)))
    res.forEach((doc)=>{
        data.push(doc.data())
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
            tag: slug
        },
        revalidate: 1
    }
}

const Tag = ({data,produk,tag}) => {
    const router = useRouter()

    if(router.isFallback) return <Fall/>
    return(
        <Layout tag={data.link} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={tag.toUpperCase()+' IMPORT'}/>
            <Hero tagline={data.tagline} value={data.value} hero={produk[0].foto}/>
            <Item produk={produk.sort((a,b)=>b.add-a.add).slice(0,4)} tag='Koleksi terbaru'/>
            <Item produk={produk} tag='Semua Koleksi'/>
        </Layout>
    )
}
export default Tag