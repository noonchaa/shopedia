import Layout from "../../components/Layout"
import ProductGrid from "../../components/Main/ProductGrid"
import ProductHero from "../../components/Main/ProductHero"
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
    if(!data.length || data.filter(item=>item==undefined)) {
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
            products: products
        },
        revalidate: 1
    }
}

const Brand = ({data,products}) => {
    return(
        <Layout>
            <ProductHero data={data[0]} />
            <ProductGrid data={data}/>
            <ProductGrid data={products.slice(0,4)}/>
        </Layout>
    )
}
export default Brand