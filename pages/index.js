import Layout from '../components/Layout'
import Jumbotron from '../components/Jumbotron'
import Product from '../components/Product'

export default function Home() {
  return (
    <Layout>
      <Jumbotron/>
      <Product/>
      <Product/>
      <Product/>
    </Layout>
  )
}
