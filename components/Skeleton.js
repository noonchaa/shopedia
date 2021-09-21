import Layout from "./Layout"

const Skeleton = () => {
    return(
        <Layout>
            <div className='flex flex-col justify-center items-center h-screen -my-4'>
                <h1 className='font-bold text-5xl text-green-600 animate-pulse'>...</h1>
                <h1 className='font-semibold tracking-wide'>Loading</h1>
            </div>
        </Layout>
    )
}
export default Skeleton