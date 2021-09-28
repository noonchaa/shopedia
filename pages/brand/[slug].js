import { collection, getDocs, query, where } from "@firebase/firestore"
import { useRouter } from "next/router"
import Layout from "../../components/Layout/Layout"
import ProductGrid from "../../components/Layout/Main/ProductGrid"
import ProductHero from "../../components/Layout/Main/ProductHero"
import Seo from "../../components/Seo"
import Skeleton from "../../components/Skeleton"
import { db } from "../../utils/firebaseClient"

export const getStaticPaths = async () => {
    const data = []
    const res = await getDocs(collection(db,'products'))
    res.forEach((doc)=>{
        const item = doc.data()
        delete item.added
        data.push(item)
    })
    return {
        paths: data.map((item)=>({
            params:{slug:item.brand}
        })),
        fallback : true
    }
}
export const getStaticProps = async ({params}) => {
    const data = []
    const products = []
    const {slug} = params
    const q = query(collection(db,'products'),where('brand','==',slug))
    const resData = await getDocs(q)
    resData.forEach((doc)=>{
        const item = doc.data()
        delete item.added
        data.push(item)
    })
    const resProducts = await getDocs(collection(db,'products'))
    resProducts.forEach((doc)=>{
        const item = doc.data()
        delete item.added
        products.push(item)
    })
    if(!data.length) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return {
        props : {
            data:data,
            products:products.slice(0,4)
        },
        revalidate: 1
    }
}

const Brand = ({data,products}) => {
    const router = useRouter()
    if(router.isFallback) return <Skeleton/>
    return(
        <Layout>
            <Seo title={data[0].brand}/>
            <ProductHero data={data[0]}/>
            <ProductGrid data={data}/>
            <ProductGrid data={products}/>
        </Layout>
    )
}
export default Brand