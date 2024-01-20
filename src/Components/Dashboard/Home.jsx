import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../../Context/ProductContext'
import manImage from '../../assets/manwearing.png'
import axios from "axios";
import ProductCard from '../UI/ProductCard/ProductCard'

function Home() {
  const productCtx = useContext(ProductContext)

  const gradientStyle = {
    background: "#FFFFFF",
    background: "linear-gradient(270deg, #FFFFFF, #B08ED6)"
    // Add other styles as needed
  };

  const productList = async () => {
    let productList = await axios.get('https://backend-for-ecomm.vercel.app/api/v1/products')
    if (productList.data.length !== 0) {

      productCtx.addProduct(productList)
    } else {
      productCtx.addProduct([])
    }
  }

  useEffect(() => {
    // console.log(productCtx);
    if (productCtx?.product.length === 0) {
      productList()
    }
  }, [])



  return (
    <div>

      <div style={gradientStyle} className='flex justify-around'>
        <div className='flex flex-col justify-center w-47-p gap-5'>
          <h1 className='text-5xl font-bold text-stone-800'>Get Your Outfit</h1>
          <p className='text-lg font-normal text-stone-800'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam debitis ullam porro quo dolorum. Ab, culpa minima deserunt fugit sint modi assumenda voluptatibus dolores, dolor corrupti aliquam, reprehenderit quibusdam omnis.</p>
          <Link to="/Category"><button className="text-white bg-stone-800 hover:bg-stone-900 focus:ring-4 focus:ring-orange-300 font-mediumtext-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Shop Now</button></Link>
        </div>
        <img src={manImage} />
      </div>

      <div className='py-20 px-32'>
        <h1 className='text-4xl font-bold text-stone-800 underline'>
          Products
        </h1>
        <div className='flex gap-7 py-14 flex-wrap pl-14'>
          {
            productCtx.product.length !== 0
              ?
              productCtx.product.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <ProductCard product={product} />
                </Link>
              ))
              :
              <h1 className='text-center py-20'>Shop is Empty</h1>
          }
        </div>
      </div>

    </div>
  )
}

export default Home