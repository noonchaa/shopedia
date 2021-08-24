const NavLink = () => {
    const links = ['Apple','Lenovo','Asus','Acer','Dell','Toshiba']

    return(
        <div className='bg-gray-100 grid grid-cols-3 md:grid-cols-6 gap-2 py-2'>
            {links.map((item,index)=>(
                <h1 key={index} className='text-center capitalize text-xl font-semibold text-gray-800'>
                    {item}
                </h1>
            ))}
        </div>
    )
}

export default NavLink