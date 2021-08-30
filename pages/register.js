import Link from 'next/link'

const Register = () => {
    return(
        <div className='bg-gray-400 h-screen w-full px-2 py-4'>
            <form className='max-w-screen-sm mx-auto p-4 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-2xl text-green-600 font-semibold mb-8'>Register</h1>
                <input type='text' placeholder='John Wick' className='px-4 py-2 w-full mb-4 rounded-lg' required/>
                <input type='email' placeholder='email@example.com' className='px-4 py-2 w-full mb-4 rounded-lg' required/>
                <input type='password' placeholder='password' className='px-4 py-2 w-full mb-4 rounded-lg' required/>
                <input type='password' placeholder='confirm password' className='px-4 py-2 w-full mb-4 rounded-lg' required/>
                <input type='number' placeholder='081234567890' className='px-4 py-2 w-full mb-4 rounded-lg' required/>
                <input type='text' placeholder='Address' className='px-4 py-2 w-full mb-4 rounded-lg' required/>
                <p className='mb-4 px-4 text-black font-medium'>Or Click here to <span className='text-green-600'>
                    <Link href='/login'>
                        <a>login</a>
                    </Link>
                </span></p>
                <div className='flex justify-end'>
                <button className='bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm mr-4' type='reset'>
                    <Link href='/'>
                        <a>Cancel</a>
                    </Link>
                </button>
                <button className='bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm mr-2' type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}
export default Register