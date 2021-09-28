const Input = ({type,value,placeholder,onChange,min,max,required}) => {
    return(
        <input
         type={type}
         value={value} 
         placeholder={placeholder} 
         className='w-full px-4 py-2 rounded-xl mb-4 focus:outline-none focus:ring-1 focus:ring-black placeholder-black placeholder-opacity-80 font-medium bg-gray-200'
         onChange={onChange}
         minLength={min}
         maxLength={max}
         required={required}
        />
    )
}
export default Input