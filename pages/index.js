import { get } from "@firebase/database"
import Frame from "../components/Frame"
import Hero from "../components/Hero"
import Item from "../components/Item"
import Layout from "../components/Layout"
import New from "../components/New"
import Seo from "../components/Seo"
import { RDB, refRDB } from "../utils/firebaseClient"

export const getStaticProps = async () => {
    const props = {
        produk:[],
        tag:[],
        tipe:[],
        data: {}
    }
    await get(refRDB(RDB,'product')).then((snap)=>{
        const res = Object.values(snap.val())
        props.produk = res
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    await get(refRDB(RDB,'util/site')).then((snap)=>{
        props.data = snap.val()
    })
    if(!props.produk.length || !props.tag.length || !props.tipe.length || !props.data){
        return {
            redirect: {
                destination: '/maintenance',
                permanent: false
            }
        }
    }
    return {
        props: {...props},
        revalidate: 60
    }
}

const Home = ({data,produk,tag,tipe}) => {

    if(!data && !produk && !tag && !tipe) return <Frame/>
    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={data.siteTitle} desc={data.tagline}/>
            <Hero tagline={data.tagline} value={data.value} hero={data.hero} produk={produk} />
            <New produk={produk.slice(0,3)}/>
            <Item produk={produk.filter(item=>item.tag=='tas').sort((a,b)=>b.add-a.add).slice(0,4)} tag='tas terbaru'/>
            <Item produk={produk.filter(item=>item.tag=='sepatu').sort((a,b)=>b.add-a.add).slice(0,4)} tag='sepatu terbaru'/>
            <Item produk={produk.filter(item=>item.tag=='baju').sort((a,b)=>b.add-a.add).slice(0,4)} tag='baju terbaru'/>
        </Layout>
    )
}
export default Home