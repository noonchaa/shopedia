const Button = ({children,type}) => {
    return(
        <button
        className={
            type=='submit'?
            //set color for submit button
            'bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2'
            :type=='reset'?
            //set color for reset button
            'bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2'
            ://set default button color
            'bg-gray-500 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2'
        }
        type={type}>
            {children}
        </button>
    )
}
export default Button