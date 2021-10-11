const Order = ({order}) => {
    const revOrder = order.sort((a,b)=>Number(new Date(b.transaction_time).getTime())-Number(new Date(a.transaction_time).getTime()))
    return(
        <div className="bg-gray-100 dark:bg-gray-900">
            <div className="container py-8 mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {revOrder.map((item,index)=>(
                    <div key={index} className='bg-white border-2 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 relative'>
                        <h2 className="font-semibold tracking-tight text-indigo-600 uppercase overflow-hidden mb-4">
                            {item.order_id}
                        </h2>
                        <p className="font-semibold tracking-tight overflow-hidden mb-4 dark:text-white capitalize">{new Date(item.transaction_time).toLocaleString('ID',{'weekday':'long','day':'2-digit','month':'short','year':'numeric','hour':'2-digit','minute':'2-digit'})} WIB</p>
                        {item.status=='Lunas'?'':
                        <>
                        <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pembayaran :</p>
                        <div className='px-3 mb-4'>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Tipe : {item.payment_type.replace(/[_]/g,' ')}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Penyedia : {item.pay_code.bank}</p>
                            {item.pay_code.bank=='gopay'?
                            <>
                                <a href={item.pay_code.code} target='_blank' rel='noreferrer'>
                                    <button className='rounded-lg bg-gray-900 text-white px-3 py-1 my-2'>Buka QR kode</button>
                                </a><br/>
                                <a href={item.pay_code.code_bayar} target='_blank' rel='noreferrer'>
                                    <button className='rounded-lg bg-gray-900 text-white px-3 py-1'>Buka Gojek App</button>
                                </a>
                            </>
                            :item.pay_code.bank=='shopeepay'?
                            <a href={item.pay_code.code_bayar} target='_blank' rel='noreferrer'>
                                <button className='rounded-lg bg-gray-900 text-white px-3 py-1 mt-2'>Buka Shopee</button>
                            </a>
                            :
                            <>
                                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Kode : {item.pay_code.code}</p>
                                <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Kode bayar : {item.pay_code.code_bayar}</p>
                            </>}
                        </div>
                        </>
                        }
                        <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pengiriman :</p>
                        <div className='px-3 mb-4'>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Penerima : {item.shipping_address.first_name}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Telepon : {item.shipping_address.phone}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Alamat : {item.shipping_address.address.lengkap}, {item.shipping_address.address.type} {item.shipping_address.address.city_name}, {item.shipping_address.address.province}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Expedisi : {item.ongkir.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Service : {item.ongkir.id}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Ongkir : Rp. {Number(item.ongkir.price).toLocaleString('ID',{'currency':'IDR'})}</p>
                            <p className="text-gray-500 dark:text-gray-400 capitalize overflow-hidden">Resi : {item.resi}</p>
                        </div>
                        <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pesanan :</p>
                        <ul className="list-disc ml-3 mb-10">
                            {item.item_details.map((isi,indexIsi)=>(
                            <li className="text-gray-500 dark:text-gray-400" key={indexIsi}>
                                <p>{isi.name} {isi.size.filter(siz=>siz!='').map(siz=>siz.concat(', '))}</p>
                                <p className='italic font-medium'>{isi.quantity} X {isi.price} = Rp. {Number(isi.price*isi.quantity).toLocaleString('ID',{'currency':'IDR'})}</p>
                            </li>
                            ))}
                        </ul>
                        <p className='dark:text-white font-bold text-lg absolute right-6 bottom-6 capitalize'>{item.status}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
export default Order