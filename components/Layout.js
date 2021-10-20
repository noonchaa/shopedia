import Footer from "./Footer"
import Navbar from "./Navbar"
import Toggle from "./Toggle"

const Layout = ({children,tag,title,tagline,phone,email,tipe}) => {
    return(
        <>
        <Navbar tag={tag} tipe={tipe} title={title}/>
        <main>
            {children}
        </main>
        <Footer title={title} tagline={tagline} phone={phone} email={email} />
        <Toggle/>
        </>
    )
}
export default Layout