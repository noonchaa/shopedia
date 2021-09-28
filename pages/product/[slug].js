import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
import { useRouter } from "next/router"
import Layout from "../../components/Layout/Layout"
import ProductDetail from "../../components/Layout/Main/ProductDetail"
import ProductGrid from "../../components/Layout/Main/ProductGrid"
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
            params:{slug:item.name.replace(/[ ]/g,'_')}
        })),
        fallback : true
    }
}

export const getStaticProps = async ({params}) => {
    const data = []
    const products = []
    const {slug} = params
    const resData = await getDoc(doc(db,'products',slug.replace(/[_]/g,' ')))
    if(resData.exists()){
        const item = resData.data()
        delete item.added
        data.push(item)
    } else {
        data.push([])
    }
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
            data:data[0],
            products:products.slice(0,4)
        },
        revalidate: 1
    }
}

const Product = ({data,products}) => {
    const router = useRouter()

    if(router.isFallback) return <Skeleton/>

    return(
        <Layout>
            <Seo title={data.name.charAt(0).toUpperCase()+data.name.slice(1)} desc={data.descriptions}/>
            <ProductDetail data={data}/>
            <ProductGrid data={products}/>
        </Layout>
    )
}
export default Product