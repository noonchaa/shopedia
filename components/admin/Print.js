import {FaPrint} from 'react-icons/fa'

const Print = () => {
    return(
        <div className='w-full px-6 pb-6'>
            <button className='rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 p-4' onClick={()=>window.print()}>
                <FaPrint className='w-8 h-8'/>
            </button>
        </div>
    )
}
export default Print