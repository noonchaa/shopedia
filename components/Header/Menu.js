const Menu = ({click,children,className}) => {
    return(
        <button className='py-1 px-2 bg-gray-50 bg-opacity-5 backdrop-filter backdrop-blur rounded-md shadow ' onClick={click}>
            <div className={'font-bold text-green-600 text-sm '+className}>
                {children}
            </div>
        </button>
    )
}
export default Menu