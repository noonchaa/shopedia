import { doc, getDoc } from "@firebase/firestore"
import Layout from "../../components/Layout"
import { AuthUser } from "../../components/User"
import { auth, db } from "../../utils/firebaseClient"
import Image from 'next/image'
import { HiUserCircle } from 'react-icons/hi'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Seo from "../../components/Seo"
import { signOut } from "@firebase/auth"
import Order from "../../components/Order"

export const getStaticProps = async () => {
    const link = await getDoc(doc(db,'utils','site'))
    return {
        props: {
            link: link.data()
        }
    }
}

const Profile = ({link}) => {
    const router = useRouter()
    const user = AuthUser()
    const [userData, setUserData] = useState({nama:'',email:'',foto:'',alamat:{city_id:'',city_name:'',postal_code:'',province:'',province_id:'',type:'',full:''},phone:'',order:[],cart:[]})

    useEffect(()=>{
        const getProfile = async () => {
            const res = await getDoc(doc(db,'users',user.uid))
            if(res.exists()){
                setUserData(res.data())
            } else {
                setTimeout(()=>{router.back()},2000)
            }
        }
        if(user){getProfile()}

        return () => {
            setUserData({nama:'',email:'',foto:'',alamat:{city_id:'',city_name:'',postal_code:'',province:'',province_id:'',type:''},phone:'',order:[],cart:[]})
        }
    },[user,router])

    const out = () => {
        signOut(auth)
        router.push('/')
    }

    return(
        <Layout tag={link.link} title={link.siteTitle} tagline={link.tagline} phone={link.phone} email={link.email}>
            <Seo title='Profil'/>
        <header className='bg-gray-100 dark:bg-gray-900 py-12 px-6'>
        <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className='relative w-full h-56'>
            <Image src={userData.foto==''?'/logo/logo.png':userData.foto} layout='fill' objectFit='cover' priority={true} alt='Foto profile' unoptimized/>
            </div>
            
            <div className="flex items-center px-6 py-3 bg-gray-700 text-white">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"/>
                </svg>
                <h1 className="mx-3 text-lg font-semibold">{userData.email}</h1>
            </div>

            <div className="px-6 py-4">
                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <HiUserCircle className='h-6 w-6'/>
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white px-2">{userData.nama}</h1>
                </div>
                
                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
                    </svg>

                    <h1 className="px-2 text-sm">{userData.alamat.full}<br/>{userData.alamat.type} {userData.alamat.city_name}, {userData.alamat.province}<br/>{userData.alamat.postal_code}</h1>
                </div>
                
                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>

                    <h1 className="px-2 text-sm">{userData.phone}</h1>
                </div>
            </div>
            <Link href='/user/edit'>
            <a className="flex items-center justify-center mt-4 text-white bg-gray-700 px-6 py-3">
                <h1 className="px-2 text-xl font-semibold">Edit profil</h1>
            </a>
            </Link>
        </div>
        <Order order={userData.order}/>
        <div className='text-right mt-12'>
            <button className='text-white bg-gray-700 px-3 py-1 rounded-lg text-xl font-semibold' onClick={()=>out()}>Log Out</button>
        </div>
        </header>
        </Layout>
    )
}
export default Profile