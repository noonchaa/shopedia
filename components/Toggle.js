import Dark from "./dark"
import {FaMoon, FaSun} from 'react-icons/fa'

const Toggle = () => {
    const [colorTheme, setTheme] = Dark()
    return(
        <div className="fixed rounded-full bg-gray-800 bottom-20 md:bottom-8 right-8 h-8 w-8 cursor-pointer
                     dark:bg-gray-50 flex justify-center z-50 animate-pulse"
            onClick={()=>setTheme(colorTheme)}>
                    {colorTheme === 'light' ? <FaSun className='h-4 w-4 text-gray-800 my-auto'/> 
                    : <FaMoon className='h-4 w-4 text-gray-50 my-auto'/>}
        </div>
    )
}
export default Toggle