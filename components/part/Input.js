const Input = ({type,placeholder,change,value}) => {
    return(
        <input
            //set input type
            type={type}
            //set placeholder text
            placeholder={placeholder}
            //set onChange function
            onChange={change}
            //default style
            className='p-2 shadow rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600 text-sm mb-3 bg-gray-100'
            //set input value for capture
            value={value}
            //make sure input field not empty before submiting
            required/>
    )
}
export default Input