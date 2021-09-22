import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import ProductGrid from "../../components/Main/ProductGrid"
import ProductHero from "../../components/Main/ProductHero"
import Seo from "../../components/Seo"
import Skeleton from "../../components/Skeleton"
import { allDocs, allDocsByBrand, allDocsByDate } from "../../utils/firebaseHandler"

export const getStaticPaths = async () => {
    const data = []
    await allDocs('products',data)
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
    await allDocsByBrand('products',slug,data)
    await allDocsByDate('products',products)
    if(!data.length) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return{
        props: {
            data: data,
            products: products.slice(0,4)
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
            <ProductHero data={data[0]} />
            <ProductGrid data={data}/>
            <ProductGrid data={products}/>
        </Layout>
    )
}
export default Brand