import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/AuthContext'
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetchApi'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

function Order() {
  const userCtx = useContext(UserContext)
  const { isLoading, serverError, apiData } = useFetch('https://backend-for-ecomm.vercel.app/api/v1/order', userCtx.token)
  
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
      <h1 className='text-4xl font-bold text-stone-800 underline pb-7'>
        Your Order History
      </h1>
      {isLoading && <span>Loading.....</span>}
      <div className='flex flex-col gap-6'>
      {/* {apiData && apiData.orderList[0].id} */}
      {
        apiData && apiData.orderList.length !== 0
          ?
          apiData.orderList.map((order, index) => (
            <Link to={`/orders/${order.id}`} key={order.id}>
            <Card sx={{ minWidth: 275, background: '#FAF9F6', cursor: "pointer"}}>
              <CardContent sx={{display:"flex", justifyContent: "space-between"}}>
                <CardContent>
                <Typography variant="h5" component="div">
                  Order {index + 1}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {new Date(order.createdAt).toLocaleString('en-US', options)}
                </Typography>
                </CardContent>
                <CardContent>
                <Typography variant="h5" component="div">
                  {order.status}
                </Typography>
                </CardContent>
              </CardContent>
            </Card>
            </Link>
          ))
          :
          <h1>No Orders</h1>
      }
      </div>
    </div>
  )
}

export default Order