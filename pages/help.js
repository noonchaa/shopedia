import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { doc, getDoc } from "@firebase/firestore"
import { db } from "../utils/firebaseClient"

export const getStaticProps = async () => {
    const link = await getDoc(doc(db,'utils','site'))
    return {
        props: {
            link: link.data()
        }
    }
}

const Help = ({link}) => {
    return(
        <Layout tag={link.link} title={link.siteTitle} tagline={link.tagline} phone={link.phone} email={link.email}>
            <Seo title='Frequently Asked Queations'/>
            <div className='py-12 px-6 bg-white dark:bg-gray-800 dark:text-white container'>
                <h1 className='text-2xl font-semibold'>
                    # Order
                </h1>
                <h2 className='text-xl font-semibold mt-2'>
                    Status pesanan
                </h2>
                <p className='mt-1'>
                    Untuk melacak pesanan anda silahkan kunjungi halaman profil kemudian pilih menu pesanan.
                </p>
                <h1 className='text-2xl font-semibold mt-4'>
                    # Tracking
                </h1>
                <h2 className='text-xl font-semibold mt-2'>
                    Lacak paket
                </h2>
                <p className='mt-1'>
                    Untuk tracking paket yang sedang dalam pengiriman seilahkan kunjungi website resmi partner pengiriman kami, kemudian masukan nomor AWB atau Resi yang anda dapatkan dihalaman pesanan pada profil anda.
                </p>
                <h1 className='text-2xl font-semibold mt-4'>
                    # FAQ
                </h1>
                <h2 className='text-xl font-semibold mt-1'>
                    Paket tidak sampai
                </h2>
                <p className='mt-1'>
                    Harap hubungi customer service kami untuk dibantu pengecekan status pesanan anda.
                </p>
                <h2 className='text-xl font-semibold mt-1'>
                    Paket rusak
                </h2>
                <p className='mt-1'>
                    Harap hubungi customer service kami dengan menyertakan video saat unboxing.
                </p>
                <h2 className='text-xl font-semibold mt-1'>
                    Pembatalan pesanan
                </h2>
                <p className='mt-1'>
                    Untuk pesanan yang belum masuk tahap packing masih dapat dibatalkan dan uang pembayaran di kembalikan 100%, untik pesanan yang telah dipacking dan masuk tahap pengiriman tidak dapat dibatalkan.
                </p>
                <h2 className='text-xl font-semibold mt-1'>
                    Metode pembayaran
                </h2>
                <p className='mt-1'>
                    Kami menyediakan berbagai macam metode pembayaran sebagai berikut :<br/>
                    - Kartu kredit<br/>
                    - Bank transfer<br/>
                    - Virtual account<br/>
                    - Indomart<br/>
                    - AlfaMart<br/>
                    - OVO<br/>
                </p>
            </div>
        </Layout>
    )
}
export default Help