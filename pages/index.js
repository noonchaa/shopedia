import Layout from '../components/Layout/Layout'
import ProductGrid from '../components/Main/ProductGrid'
import Seo from '../components/Seo'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../utils/firebaseClient'
import ServerError from '../components/serverError'
import Hero from '../components/Layout/Main/Hero'

export const getStaticProps = async () => {
  const data = []
  const res = await getDocs(collection(db,'products'))
  res.forEach((doc)=>{
    const item = doc.data()
    delete item.added
    data.push(item)
  })
  return {
    props: {
      data: data
    },
    revalidate: 1
  }
}

export default function Home({data}) {

  if(!data.length){
    return(
      <ServerError/>
    )
  }
  return (
    <Layout>
      <Seo/>
      <Hero imgUrl={data[0].imgUrl}/>
      <ProductGrid data={data}/>
    </Layout>
  )
}
