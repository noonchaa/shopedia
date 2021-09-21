import Layout from '../components/Layout'
import Jumbotron from '../components/Main/Jumbotron'
import ProductGrid from '../components/Main/ProductGrid'
import {allDocsByDate} from '../utils/firebaseHandler'

export const getStaticProps = async () => {
  const data = []
  await allDocsByDate('products',data)
  return {
    props: {data:data},
    revalidate:1
  }
}

export default function Home({data}) {

  return (
    <Layout>
      <Jumbotron imgUrl={data[0].imgUrl}/>
      <ProductGrid data={data}/>
    </Layout>
  )
}
