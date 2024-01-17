import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import CartContext from '../../Context/CartContext'
import TableCart from '../UI/TableCart/TableCart';
import CheckOutPanel from '../UI/CheckoutPanel/CheckOutPanel';
import AddressForm from './AddressForm';
import UserContext from '../../Context/AuthContext';
import axios from "axios";

function Cart() {
  const navigate = useNavigate()
  const cartCtx = useContext(CartContext)
  const userCtx = useContext(UserContext)

  const handleCheckOutCall = async (obj) => {
    let token = userCtx.token
    // const response = usePostApi('http://localhost:3000/api/v1/cartCreate', obj, token)
    const response = await axios.post('http://localhost:3000/api/v1/cartCreate', obj, {
      headers:{
        Authorization: token
      }
    })
    if(response.data.success == true){
      navigate('/orders')
    }

  }


  return (
    <div className='p-24'>
      {
        cartCtx.items.length !== 0
          ?
          <div>
            <h1 className='text-4xl font-bold text-stone-800 underline pb-7'>
              Your Cart
            </h1>
            <div className='flex gap-7'>
              <TableCart />
              <CheckOutPanel onCheckOut={handleCheckOutCall} />
              <AddressForm />
            </div>
          </div>
          :
          <div className='w-full h-screen flex justify-center items-center'>
            <h1 className='text-center py-20'>Cart is Empty</h1>
          </div>
      }
    </div>
  )
}

export default Cart

