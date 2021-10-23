import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
import Frame from "../components/Frame"
import Hero from "../components/Hero"
import Item from "../components/Item"
import Layout from "../components/Layout"
import New from "../components/New"
import Seo from "../components/Seo"
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

const Home = ({data,produk}) => {

    if(!data) return <Frame/>
    return(
        <Layout tag={data.link} tipe={produk.map(item=>({tag:item.tag,tipe:item.tipe}))} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <Seo title={data.siteTitle} desc={data.tagline}/>
            <Hero tagline={data.tagline} value={data.value} hero={data.hero} />
            <New produk={produk.slice(0,3)}/>
            <Item produk={produk.filter(item=>item.tag=='tas').sort((a,b)=>b.add-a.add).slice(0,4)} tag='tas terbaru'/>
            <Item produk={produk.filter(item=>item.tag=='sepatu').sort((a,b)=>b.add-a.add).slice(0,4)} tag='sepatu terbaru'/>
            <Item produk={produk.filter(item=>item.tag=='baju').sort((a,b)=>b.add-a.add).slice(0,4)} tag='baju terbaru'/>
        </Layout>
    )
}
export default Home