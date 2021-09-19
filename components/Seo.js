import Head from 'next/head'

const Seo = ({title,desc}) => {
    return(
        <Head>
        <title>{!title?'Shopedia':title}</title>
        <meta name="description" content={!desc?'Your best place to find laptops':desc} />
        </Head>
    )
}
export default Seo