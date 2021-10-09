import Head from 'next/head'

const Seo = ({title,desc}) => {
    return(
        <Head>
        <title>{!title?'Shopedia':title}</title>
        <meta name="description" content={!desc?'Tempat terbaik untuk segala kebutuhan fashion kamu':desc} />
        </Head>
    )
}
export default Seo