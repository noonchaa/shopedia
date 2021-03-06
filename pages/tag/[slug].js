import { get } from "@firebase/database"
import { useRouter } from "next/router"
import Hero from "../../components/Hero"
import Item from "../../components/Item"
import Layout from "../../components/Layout"
import Loader from "../../components/Loader"
import Seo from "../../components/Seo"
import { RDB, refRDB } from "../../utils/firebaseClient"

export const getStaticPaths = async () => {
    const path = []
    await get(refRDB(RDB,'product')).then((snap)=>{
        const res = Object.values(snap.val()).map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        const slug = res.map(item=>({params:item.toString()}))
        path.concat(slug)
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
    await get(refRDB(RDB,'util/site')).then((snap)=>{
        props.data = snap.val()
    })
    await get(refRDB(RDB,'product')).then((snap)=>{
        const res = Object.values(snap.val())
        props.produk = res.filter(item => item.tag == slug)
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    return {
        props: {...props},
        revalidate: 60
    }
}

const Tag = ({produk,tag,tipe,title,data}) => {
    const router = useRouter()

    if(router.isFallback) return <Loader/>
    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={title.toUpperCase()+' IMPORT'}/>
            <Hero tagline={data.tagline} value={data.value} hero={produk[0].foto} produk={produk}/>
            <Item produk={produk.sort((a,b)=>b.add-a.add).slice(0,4)} tag='Koleksi terbaru'/>
            <Item produk={produk.slice(4)} tag='Semua Koleksi'/>
        </Layout>
    )
}
export default Tag