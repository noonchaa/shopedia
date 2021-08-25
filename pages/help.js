import Layout from "../components/Layout"

const Help = () => {
    return(
        <Layout>
            <div className='px-4'>
                <h1 className='text-green-500 text-2xl font-semibold mb-2 mt-4'>
                    ## Order
                </h1>
                <h1 className='pl-8 pr-4 text-xl font-semibold mb-1'>
                    Status pesanan
                </h1>
                <p className='pl-8 pr-4 mb-1'>
                    Untuk melacak pesanan anda silahkan kunjungi halaman profil kemudian pilih menu pesanan.
                </p>
                <h1 className='text-green-500 text-2xl font-semibold mb-2 mt-4'>
                    ## Tracking
                </h1>
                <h1 className='pl-8 pr-4 text-xl font-semibold mb-1'>
                    Lacak paket
                </h1>
                <p className='pl-8 pr-4 mb-1'>
                    Untuk tracking paket yang sedang dalam pengiriman seilahkan kunjungi website resmi partner pengiriman kami, kemudian masukan nomor AWB atau Resi yang anda dapatkan dihalaman pesanan pada profil anda.
                </p>
                <h1 className='text-green-500 text-2xl font-semibold mb-2 mt-4'>
                    ## FAQ
                </h1>
                <h1 className='pl-8 pr-4 text-xl font-semibold mb-1'>
                    Paket tidak sampai
                </h1>
                <p className='pl-8 pr-4 mb-1'>
                    Harap hubungi customer service kami untuk dibantu pengecekan status pesanan anda.
                </p>
                <h1 className='pl-8 pr-4 text-xl font-semibold mb-1'>
                    Paket rusak
                </h1>
                <p className='pl-8 pr-4 mb-1'>
                    Harap hubungi customer service kami dengan menyertakan video saat unboxing.
                </p>
                <h1 className='pl-8 pr-4 text-xl font-semibold mb-1'>
                    Pembatalan pesanan
                </h1>
                <p className='pl-8 pr-4 mb-1'>
                    Untuk pesanan yang belum masuk tahap packing masih dapat dibatalkan dan uang pembayaran di kembalikan 100%, untik pesanan yang telah dipacking dan masuk tahap pengiriman tidak dapat dibatalkan.
                </p>
                <h1 className='pl-8 pr-4 text-xl font-semibold mb-1'>
                    Metode pembayaran
                </h1>
                <p className='pl-8 pr-4 mb-1'>
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