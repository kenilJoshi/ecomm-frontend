import React, {useContext, useEffect, useMemo, useState} from 'react'
import ProductContext from '../../Context/ProductContext'
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Link } from 'react-router-dom';
import ProductCard from '../UI/ProductCard/ProductCard';

function Category() {
  const productCtx = useContext(ProductContext)
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const productList = useFetch('https://backend-for-ecomm.vercel.app/api/v1/products', '')

  // // console.log(productList);
  // if(productCtx.product.length !== 0){
    
  // }

  // let productData = useMemo(() => {
  //   if(productList.isLoading == false && productList.apiData !== null){
  //     productCtx.addProduct({data: productList.apiData})
  //   }
  // }, [productList.isLoading, productList.apiData])

  let filteredProduct = useMemo(() => {
      if(productCtx.product.length !== 0){
      let value = productCtx.product.filter((e) => e.title.includes(searchInput))
      setIsLoading(false)
      return value
    }
  }, [searchInput, productCtx.product])

// https://backend-for-ecomm.vercel.app
  const productList = async () => {
    setIsLoading(true)
    let productList = await axios.get('https://backend-for-ecomm.vercel.app/api/v1/products')
    if (productList.data.length !== 0) {

      productCtx.addProduct(productList)
      setIsLoading(false)
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

  // console.log('kenil');
  return (
    <div className='px-44 py-20'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold text-stone-800 pb-6'>Category</h1>
          <TextField id="outlined-basic" label="Search" variant="outlined" size="small" onChange={e => setSearchInput(e.target.value)} />
        </div>
        <div>
        <div className='flex gap-7 py-14 flex-wrap pl-14'>
          {
            productCtx.product.length !== 0
              ?
              isLoading ? <p>Loading...</p> :
              filteredProduct.map((product) => (
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

export default Category