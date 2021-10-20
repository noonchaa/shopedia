import Image from 'next/image'
import Link from 'next/link'
import AddCart from './AddCart'
import Size from './Size'

const Item = ({produk, tag}) => {
    return(
        <section className="bg-gray-100 dark:bg-gray-900 py-12" id='produk'>
            <div className="container px-6 mx-auto">
                <h2 className="text-2xl font-bold text-indigo-600 md:text-3xl pb-4 capitalize">{tag}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {produk.map((item,index)=>(
                    <div key={index} className="w-full max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 flex justify-between flex-col">
                        <div className="px-4 py-2">
                            <h1 className="text-2xl font-bold text-gray-800 uppercase dark:text-white">{item.nama}</h1>
                            <div className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                        <Link href={'/produk/'+item.id}>
                        <a className="w-full h-48 relative transform hover:scale-105">
                            <Image src={item.foto} layout='fill' objectFit='cover' alt='Produk'/>
                        </a>
                        </Link>
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-gray-800">
                            <h1 className="text-lg font-bold text-white">Rp. {Number(item.harga).toLocaleString('ID',{'currency':'IDR'})}</h1>
                            {item.size.length?
                            <Size size={item.size} id={item.id} harga={item.harga} nama={item.nama} warna={item.warna} foto={item.foto} berat={item.berat} />
                            :
                            <AddCart id={item.id} harga={item.harga} nama={item.nama} size={''} warna={item.warna} foto={item.foto} berat={item.berat} />
                            }
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}
export default Item