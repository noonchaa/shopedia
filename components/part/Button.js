const Button = ({children,type}) => {
    return(
        <button className={type=='submit'?'bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2':type=='reset'?'bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2':''} type={type}>
            {children}
        </button>
    )
}
export default Button