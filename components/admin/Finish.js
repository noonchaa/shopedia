const FinishData = ({data}) => {
    const {order_id,item_details,status} = data
    return(
        <div className='bg-white border-2 border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-6 relative'>
            <h2 className="font-semibold tracking-tight text-indigo-600 uppercase overflow-hidden mb-4">
                {order_id}
            </h2>
            <p className="font-semibold tracking-tight overflow-hidden mb-4 dark:text-white capitalize">{status}</p>
            <p className="font-semibold tracking-tight overflow-hidden mb-2 dark:text-white capitalize">Pesanan :</p>
            <ul className="list-disc ml-3">
                {item_details.map((isi,indexIsi)=>(
                <li className="text-gray-500 dark:text-gray-400" key={indexIsi}>
                    <p>{isi.name} {isi.size.filter(siz=>siz!='').map(siz=>siz.concat(', '))}</p>
                    <p className='italic font-medium'>{isi.quantity} X {isi.price} = Rp. {Number(isi.price*isi.quantity).toLocaleString('ID',{'currency':'IDR'})}</p>
                </li>
                ))}
            </ul>
        </div>
    )
}
export default FinishData