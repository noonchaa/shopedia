import { RDB, refRDB } from "../../utils/firebaseClient"
import {useRouter} from 'next/router'
import Layout from "../../components/Layout"
import Detail from "../../components/Detail"
import Item from "../../components/Item"
import Seo from "../../components/Seo"
import { get } from "@firebase/database"
import Loader from "../../components/Loader"

export const getStaticPaths = async () => {
    const path = []
    await get(refRDB(RDB,'product'),(snap)=>{
        const res = Object.values(snap.val())
        const slug = res.map(item=>({params:item.id}))
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
        props.produk = res
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    
    if(!props.produk.filter(item=>item.id==slug).length){
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return {
        props: {...props},
        revalidate: 60
    }
}

const Product = ({produk,tag,tipe,title,data}) => {
    const router = useRouter()

    if(router.isFallback) return <Loader/>
    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={produk.filter(item=>item.id==title)[0].nama} desc={produk.filter(item=>item.id==title)[0].desc}/>
            <Detail data={produk.filter(item=>item.id==title)[0]} />
            <Item produk={produk.sort((a,b)=>b.add-a.add).slice(0,4)} tag='Koleksi terbaru'/>
            <Item produk={produk.sort((a,b)=>a.add-b.add).slice(0,16)} tag='Lengkapi koleksi kamu'/>
        </Layout>
    )
}
export default Product