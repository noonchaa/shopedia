import Layout from "../components/Layout/Layout"

const NotFound = () => {
    return(
        <Layout>
            <div className='flex flex-col justify-center items-center h-screen -my-4'>
                <h1 className='font-bold text-5xl text-red-600'>404</h1>
                <h1 className='font-semibold tracking-wide'>Page not found</h1>
            </div>
        </Layout>
    )
}
export default NotFound