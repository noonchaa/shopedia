import Navbar from "./Header/Navbar"

const Layout = ({children}) => {
    return(
        <div className='text-black max-w-screen-2xl mx-auto'>
            <Navbar/>
            <main className='p-4'>
                {children}
            </main>
        </div>
    )
}
export default Layout