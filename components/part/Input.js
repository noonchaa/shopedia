const Input = ({type,placeholder,change,value}) => {
    return(
        <input type={type} placeholder={placeholder} onChange={change} className='p-2 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm mb-3 bg-gray-100' value={value} required/>
    )
}
export default Input