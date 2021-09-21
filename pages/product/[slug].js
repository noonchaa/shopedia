import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import ProductDetail from "../../components/Main/ProductDetail"
import ProductGrid from "../../components/Main/ProductGrid"
import Skeleton from "../../components/Skeleton"
import { allDocs, allDocsByDate, oneDoc } from "../../utils/firebaseHandler"

export const getStaticPaths = async () => {
    const data = []
    await allDocs('products',data)
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
    await oneDoc('products',slug.replace(/[_]/g,' '),data)
    await allDocsByDate('products',products)
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
            <ProductDetail data={data}/>
            <ProductGrid data={products}/>
        </Layout>
    )
}
export default Product