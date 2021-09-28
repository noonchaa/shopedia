import { HiX } from 'react-icons/hi'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Form = ({children,type,submit,loading}) => {
    const router = useRouter()
    return(
        <div className='flex justify-center items-center min-h-screen bg-black'>
            <form className='w-full max-w-md bg-gray-50 p-4 m-4 rounded-xl text-center' onSubmit={submit}>
                <HiX className='h-8 w-8 mb-4 cursor-pointer' onClick={()=>router.back()}/>
                <h1 className='font-bold text-2xl tracking-wider mb-2 text-left capitalize'>{type=='login'?'Selamat Datang':type=='daftar'?'Silahkan buat akun':type=='reset'?'Lupa password?':'Hapus akses admin'}</h1>
                <p className='mb-4 font-medium text-lg text-left capitalize'>{type=='login'?'masuk ke akun anda':type=='daftar'?'':'masukan email yang terdaftar'}</p>
                {children}
                <Link href='/reset'>
                    <a>
                        <p className={type=='login'?'-mt-2 mb-4 font-medium text-right':'hidden'}>Lupa password?</p>
                    </a>
                </Link>
                <button type='submit' className={loading==false?'px-4 py-2 bg-black text-white rounded-xl font-bold tracking-wider w-60':'px-4 py-2 bg-gray-50 rounded-xl font-bold tracking-wider w-60'}>{type=='login'?'Masuk':type=='daftar'?'Daftar':'Kirim'}</button>
                {type=='login'?
                <p className='my-4 font-medium text-lg'>Belum punya akun?
                    <span className='italic'>
                        <Link href='/daftar'>
                            <a> Daftar</a>
                        </Link>
                    </span>
                </p>
                :type=='daftar'?
                <p className='my-4 font-medium text-lg'>Sudah punya akun?
                    <span className='italic'>
                        <Link href='/login'>
                            <a> Masuk</a>
                        </Link>
                    </span>
                </p>
                :
                ''
                }
            </form>
        </div>
    )
}
export default Form