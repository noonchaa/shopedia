import Link from 'next/link'

const NavLink = () => {
    const links = ['Apple','Lenovo','Asus','Acer','Dell','Toshiba']

    return(
        <div className='bg-gray-100 grid grid-cols-3 md:grid-cols-6 gap-2 py-2'>
            {links.map((item,index)=>(
                <Link href='/brand' key={index}>
                    <a className='text-center capitalize text-xl font-semibold text-gray-800'>
                        {item}
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default NavLink