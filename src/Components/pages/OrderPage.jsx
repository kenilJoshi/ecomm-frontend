import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../../Hooks/useFetchApi'
import UserContext from '../../Context/AuthContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function OrderPage() {
    const userCtx = useContext(UserContext)
    const { id } = useParams()
    console.log(userCtx);
    const { isLoading, serverError, apiData } = useFetch(`http://localhost:3000/api/v1/orderDetail/${id}`, userCtx.token)
    console.log(apiData);

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    return (
        <div className='p-24'>
            <h1 className='text-4xl font-bold text-stone-800 underline pb-7 flex items-center gap-4'>
                <Link to = "/orders"><ArrowBackIcon /></Link>Order Details
            </h1>
            <div className='flex justify-between'>
                <span className='flex gap-3'><h1 className='font-bold'>Ordered On: </h1>{new Date(apiData && apiData.order[0].createdAt).toLocaleString('en-US', options)}</span>
                <h1 className='flex gap-3 items-center'>Status: <h1 className='font-bold text-red-500 text-xl'>{apiData && apiData.order[0].status}</h1></h1>
            </div>
            <div className='p-4'>
                <table className='mt-5'>
                    <tr>
                        <th align='left' className='w-64'>Product</th>
                        <th align='center' className='w-32'>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {
                        apiData && apiData.orderDetail.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td align='center'>{item.quantity}</td>
                                <td align='center'>{item.price}</td>
                            </tr>
                        ))
                    }
                </table>
                <div className='pt-11 flex items-center gap-4'>
                    <h1 className='font-bold text-xl'>
                        Your Registered Address:
                    </h1>
                    <p>
                        {apiData && apiData.order[0].address}
                    </p>
                </div>
                <div className='pt-11 flex items-center gap-4'>
                    <h1 className='font-bold text-xl'>
                        Total Price:
                    </h1>
                    <p>
                        {apiData && apiData.order[0].total_price}
                    </p>
                </div>
                <div className='pt-11 flex items-center gap-4'>
                    <h1 className='font-bold text-xl'>
                        Total Quantity:
                    </h1>
                    <p>
                        {apiData && apiData.order[0].total_quantity}
                    </p>
                </div>

                <h1 className='text-3xl font-bold text-red-500 text-center p-11'>Will Arrive Soon</h1>
            </div>
        </div>
    )
}

export default OrderPage