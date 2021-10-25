import Image from 'next/image'
import Link from 'next/link'
import AddCart from './AddCart'
import Size from './Size'

const New = ({produk}) => {
    return(
        <section className="bg-white dark:bg-gray-800 pb-12" id='produk'>
            <div className="container px-6 py-4 mx-auto">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {produk.map((item,index)=>(
                        <div className="flex flex-col items-center justify-center" key={index}>
                            <Link href={'/produk/'+item.id}>
                                <a className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md relative z-0 transform hover:scale-105">
                                <Image src={item.foto} layout='fill' objectFit='cover' alt='New produk' className='rounded-lg' unoptimized/>
                                </a>
                            </Link>

                            <div className="-mt-10 w-72 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 z-0">
                                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{item.nama}</h3>
                                
                                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                    <span className="font-bold text-gray-800 dark:text-gray-200">Rp. {Number(item.harga).toLocaleString('ID',{'currency':'IDR'})}</span>
                                    {item.size?
                                    <Size size={item.size} id={item.id} harga={item.harga} nama={item.nama} warna={item.warna} foto={item.foto} berat={item.berat} />
                                    :
                                    <AddCart dark id={item.id} harga={item.harga} nama={item.nama} size={''} warna={item.warna} foto={item.foto} berat={item.berat} />
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default New