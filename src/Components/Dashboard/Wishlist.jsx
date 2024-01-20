import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../UI/ProductCard/ProductCard'
import UserContext from '../../Context/AuthContext'
import useFetch from '../../Hooks/useFetchApi'

function Wishlist() {
    const userCtx = useContext(UserContext)
    const wishlist = useFetch('https://backend-for-ecomm.vercel.app/api/v1/wishlistProduct', userCtx.token)
    console.log(wishlist);

  return (
    <div className='p-24'>
        <h1 className='text-4xl font-bold text-stone-800 underline'>Wishlist</h1>
        {wishlist.isLoading && <p>loading...</p>}

        {wishlist.apiData &&
        wishlist.apiData.wishlistwithProductdetail !== null  
        ?
        <div className='flex gap-7 py-14 flex-wrap pl-14'>
        {wishlist.apiData.wishlistwithProductdetail.map((product) => (
            <Link to={`/product/${product.product_id}`} key={product.product_id}>
                  <ProductCard product={product} />
                </Link>
        ))}
        </div>
        :
        <div className='w-full h-screen flex justify-center items-center'>
            <h1>No wishlist</h1>
        </div> 
    }

    </div> 
  )
}

export default Wishlist