import { onValue } from "@firebase/database"
import Layout from "../components/Layout"
import { RDB, refRDB } from "../utils/firebaseClient"

export const getStaticProps = async () => {
    const props = {
        produk:[],
        tag:[],
        tipe:[],
        data: {}
    }
    onValue(refRDB(RDB,'product'),(snap)=>{
        const res = Object.values(snap.val())
        props.produk = res
        props.tag = res.map(item=>item.tag).filter((item,index,self)=>self.indexOf(item)===index)
        props.tipe = res.map(item=>({tag:item.tag,tipe:item.tipe}))
    })
    onValue(refRDB(RDB,'util/site'),(snap)=>{
        props.data = snap.val()
    })
    return {
        props: {...props},
        revalidate: 60
    }
}

const NotFound = ({data,tag,tipe}) => {
    return(
        <Layout tag={tag} tipe={tipe} title={data.siteTitle} tagline={data.tagline} phone={data.phone} email={data.email} >
            <div className='flex flex-col justify-center items-center h-screen -my-4'>
                <h1 className='font-bold text-5xl text-red-600'>404</h1>
                <h1 className='font-semibold tracking-wide'>Page not found</h1>
            </div>
        </Layout>
    )
}
export default NotFound