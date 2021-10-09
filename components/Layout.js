import Footer from "./Footer"
import Navbar from "./Navbar"
import Toggle from "./Toggle"

const Layout = ({children,tag,title,tagline,phone,email}) => {
    return(
        <>
        <Navbar tag={tag}/>
        <main>
            {children}
        </main>
        <Footer title={title} tagline={tagline} phone={phone} email={email} />
        <Toggle/>
        </>
    )
}
export default Layout