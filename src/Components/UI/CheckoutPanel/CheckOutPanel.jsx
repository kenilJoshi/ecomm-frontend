import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../../Context/CartContext'
import AddressContext from '../../../Context/AddressContext'
import UserContext from '../../../Context/AuthContext'

function CheckOutPanel({onCheckOut}) {

    const cartCtx = useContext(CartContext)
    const addressCtx = useContext(AddressContext)
    const [totalPrice, setToatalPrice] = useState(0) 
    const userCtx = useContext(UserContext)

    useEffect(() => {
        let price = cartCtx.items.reduce((a, item) => {
           return a + item.prices 
        }, 0)
        setToatalPrice(price)
    }, [cartCtx.items])


    const handleOpenAddress = () => {
        addressCtx.showAddress()
    }

    const handleCheckOut = () => {

        let checkoutObj = {
            address: userCtx.address,
            totalPrice: '',
            totalQuantity: '',
            items: []
        }

        checkoutObj.totalPrice = cartCtx.items.reduce((a, item) => {
            return a + item.prices 
         }, 0)

         checkoutObj.totalQuantity = cartCtx.items.reduce((a, item) => {
            return a + item.quantities
         }, 0)

         const items = cartCtx.items.map((item) => {
            return {id: item.id, quantity: item.quantities, price: item.prices}
         })
         checkoutObj.items = [...items] 

         
        //   console.log(response);
        onCheckOut(checkoutObj)
        // console.log(totalPrice); 
    }

    return (
        <div className='py-4 px-2 w-130 bg-stone-100 shadow-md'>
            <h1 className='text-2xl font-bold'>CheckOut</h1>
            <p className='pt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ipsum. Culpa, fuga maiores. In atque molestias, nemo voluptatum autem hic tenetur officiis nulla quos harum tempore quidem facere totam reprehenderit!</p>
            <div className='p-4'>
                <table className='mt-5'>
                    <tr>
                        <th align='left' className='w-64'>Product</th>
                        <th align='center' className='w-32'>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {
                        cartCtx.items.map((item) => (
                            <tr key={item.id}>
                            <td>{item.title}</td>
                            <td align='center'>{item.quantities}</td>
                            <td align='center'>{item.prices}</td>
                          </tr>
                        ))
                    }
                </table>
                <div className='border-t-2 border-t-black px-5 mt-6 flex justify-between'>
                    <h1 className='pt-3'>Total Price</h1>
                    <h1 className='pt-3'>{totalPrice}</h1>
                </div>

                <div className='pt-4 flex flex-col'>
                    <h1 className='font-bold text-lg'>Address:</h1>
                    {
                        userCtx.address !== null
                        ?
                        <p>
                            {userCtx.address}
                        </p>    
                        :
                        <p className='font-bold pl-4'>
                            Add Address
                        </p>
                        }
                </div>
            </div>

            <div className='p-3 flex flex-col gap-3'>
                <button onClick={handleOpenAddress} className='p-2 w-full text-center font-bold bg-transparent border-2 border-solid border-purple-700 text-purple-700 text-lg'>Add Address</button>
                <button  onClick={handleCheckOut} className='p-2 w-full text-center text-white bg-purple-700 font-bold hover:bg-purple-800 text-lg cursor-pointer disabled:bg-purple-500 disabled:cursor-not-allowed' disabled = {userCtx.address == null}>CheckOut</button>
            </div>
        </div>
    )
}

export default CheckOutPanel