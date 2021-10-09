import { doc, getDoc } from "@firebase/firestore"
import Layout from "../components/Layout"
import { db } from "../utils/firebaseClient"

export const getStaticProps = async () => {
    const link = await getDoc(doc(db,'utils','site'))
    return {
        props: {
            link: link.data()
        }
    }
}

const NotFound = ({link}) => {
    return(
        <Layout tag={link.link} title={link.siteTitle} tagline={link.tagline} phone={link.phone} email={link.email}>
            <div className='flex flex-col justify-center items-center h-screen -my-4'>
                <h1 className='font-bold text-5xl text-red-600'>404</h1>
                <h1 className='font-semibold tracking-wide'>Page not found</h1>
            </div>
        </Layout>
    )
}
export default NotFound