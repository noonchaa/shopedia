import { get } from "@firebase/database"
import { useRouter } from "next/router"
import Fall from "../../components/Fall"
import Hero from "../../components/Hero"
import Item from "../../components/Item"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { RDB, refRDB } from "../../utils/firebaseClient"

export const getStaticPaths = async () => {
    let path = []
    await get(refRDB(RDB,'product'),(snap)=>{
        const res = Object.values(snap.val()).map(item=>item.tipe).filter((item,index,self)=>self.indexOf(item)===index)
        path = res.map(item=>({params:item}))
    })
    return {
        paths: path,
        fallback: true
    }
}
export const getStaticProps = async ({params}) => {
    const {slug} = params
    const props = {
        produk:[],
        tag:[],
        tipe:[],
        data: {},
        title: slug
    }
    await get(refRDB(RDB,'util/site'),(snap)=>{
        props.data = snap.val()
    })
    await get(refRDB(RDB,'product'),(snap)=>{
        const res = Object.values(snap.val())
        props.produk = res.filter(item => item.tipe == slug)
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    return {
        props: {...props},
        revalidate: 60
    }
}

const Kategori = ({produk,tag,tipe,title,data}) => {
    const router = useRouter()

    if(router.isFallback) return <Fall/>
    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={title.toUpperCase()}/>
            <Hero tagline={data.tagline} value={data.value} hero={produk[0].foto}/>
            <Item produk={produk.sort((a,b)=>b.add-a.add).slice(0,4)} tag='Koleksi terbaru'/>
            <Item produk={produk} tag='Semua Koleksi'/>
        </Layout>
    )
}
export default Kategori