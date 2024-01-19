import React, { useContext, useState, useEffect } from 'react'
import ProductCard from '../UI/ProductCard/ProductCard';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom'
import ProductContext from '../../Context/ProductContext'
import axios from "axios";
import { sharpen } from '@cloudinary/url-gen/actions/adjust';
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import toast, { Toaster } from 'react-hot-toast';
import CartContext from '../../Context/CartContext';
import UserContext from '../../Context/AuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ProductPage() {
    const params = useParams()
    const [productInfo, setProductInfo] = useState([])
    const productCtx = useContext(ProductContext)
    const cartCtx = useContext(CartContext)
    const userCtx = useContext(UserContext)
    const [myImageUrl, setMyImageUrl] = useState('')
    const [recommandedArr, setRecommandedArr] = useState([])
    const [isBookMarked, setIsBookMarked] = useState(false)

    const getProductInfo = async () => {
        const cld = new Cloudinary({
            cloud: {
                cloudName: 'dugadzwcv'
            }
        });


        if (productCtx.product.length !== 0) {
            let id = params.id
            const product = productCtx.product.find((element) => element.id == id)
            const filterProduct = productCtx.product.filter((element) => element.name == product.name)
            const firstFiveProduct = filterProduct.filter((element, index) => index < 6)
            setRecommandedArr(firstFiveProduct)
            const myImage = cld.image(product.picture_id);

            myImage
                .adjust(sharpen().strength(200))
                .resize(scale().height(300))
            setMyImageUrl(myImage.toURL());
            setProductInfo(product)

        } else {
            let id = params.id
            const product = await axios.get(`https://backend-for-ecomm.vercel.app/api/v1/product/${id}`)
            if (product.data.length !== 0) {
                setProductInfo(product.data[0]);
                const myImage = cld.image(product.data[0].picture_id);

                myImage
                    .adjust(sharpen().strength(200))
                    .resize(scale().height(300))

                setMyImageUrl(myImage.toURL());

                const filterProduct = await axios.get(`https://backend-for-ecomm.vercel.app/api/v1/recommandProduct/?limit=6&name=${product.data[0].name}`)

                if (filterProduct.data.length !== 0) {
                    setRecommandedArr(filterProduct.data)
                }
            }
        }
    }

    const findwishlist = async () =>{
        const token = localStorage.getItem("user-token");
        if (token) {
          const getwishlist = await axios.get("https://backend-for-ecomm.vercel.app/api/v1/wishlist", {
            headers: {
              Authorization: token
            }
          })
          userCtx.addWishlist(getwishlist.data.userWishlist)
          if (getwishlist.data.userWishlist) {
            const isElementPresent = getwishlist.data.userWishlist.findIndex(listitem => listitem.product_id === parseInt(params.id))
            console.log(isElementPresent);
            if (isElementPresent > -1) {
                setIsBookMarked(true)
            } else {
                setIsBookMarked(false)
            }
        }
          // console.log('is it authenticated', userCtx.isAuthenticated);
        } else {
          return false
        }
    }

    useEffect(() => {
        findwishlist()
    }, [])

    useEffect(() => {
        getProductInfo()
        if (userCtx.wishlist !== null) {
            const isElementPresent = userCtx.wishlist.findIndex(listitem => listitem.product_id === parseInt(params.id))
            console.log(isElementPresent);
            if (isElementPresent > -1) {
                console.log('iselement present');
                setIsBookMarked(true)
            } else {
                setIsBookMarked(false)
            }
        }
        window.scroll(0, 0)
    }, [params.id])


    const addToCart = () => {
        if (userCtx.isAuthenticated) {
            cartCtx.addItem(productInfo)
            console.log(cartCtx);
            toast.success('Added to Cart')
        }
    }

    const addToWishlist = async (id) => {
        console.log(userCtx.token);
        if (userCtx.wishlist == null) {
            const addwishlist = await axios.post(`https://backend-for-ecomm.vercel.app/api/v1/addWishList/${id}`, {}, {
                headers: {
                    Authorization: userCtx.token
                }
            })
            if (addwishlist.data) {
                userCtx.addWishlist(addwishlist.data.wishlist)
                setIsBookMarked(true)
            }
        }else{
            const isElementPresent = userCtx.wishlist.findIndex(listitem => listitem.product_id === parseInt(params.id))
            if (isElementPresent > -1) {
                const removeWishlist= await axios.delete(`https://backend-for-ecomm.vercel.app/api/v1/removewishlist/${userCtx.wishlist[isElementPresent].id}`, {
                    headers: {
                        Authorization: userCtx.token
                    }   
                })
                // console.log(removeWishlist);
                userCtx.removeWishlist(userCtx.wishlist[isElementPresent].id)
                setIsBookMarked(false)
                console.log(userCtx);

            } else {
                const addwishlist = await axios.post(`https://backend-for-ecomm.vercel.app/api/v1/addWishList/${id}`, {}, {
                headers: {
                    Authorization: userCtx.token
                }
            })
            if (addwishlist.data) {
                userCtx.addWishlist(addwishlist.data.wishlist)
                setIsBookMarked(true)
            }
            }
        }
    }

    return (
        <div className='p-24'>
            <Card sx={{ display: 'flex', width: 944 }} variant='outlined'>
                <CardMedia
                    component="img"
                    className='h-128'
                    sx={{ width: 389 }}
                    image={myImageUrl}
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', pl: 1, pt: 2 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" color="text.secondary" >
                            {productInfo.name}
                        </Typography>
                        <Typography component="div" variant="h4">
                            {productInfo?.title ? productInfo.title.toUpperCase() : ''}
                        </Typography>

                        <Typography component="div" color="text.secondary" variant="div" sx={{ pl: 1, pt: 3 }}>
                            {productInfo.description}
                        </Typography>

                        <Typography component="div" variant="h4" sx={{ pl: 1, pt: 12 }}>
                            ${productInfo.price}.00
                        </Typography>
                        <CardContent sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" href="#contained-buttons" sx={[
                                { mt: 2, bgcolor: 'rgb(41 37 36)', borderRadius: 0, width: 231 },
                                (theme) => ({
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        color: 'rgb(41 37 36)',
                                        borderColor: 'rgb(41 37 36)',
                                        border: 2
                                    },
                                }),
                            ]} onClick={addToCart}>
                                Add To Cart
                            </Button>
                            <Button variant="contained" href="#contained-buttons" sx={[
                                { mt: 2, border: 2, bgcolor: 'transparent', display: 'flex', gap: 1, borderColor: 'rgb(41 37 36)', color: 'rgb(41 37 36)', borderRadius: 0, width: 231 },
                                (theme) => ({
                                    '&:hover': {
                                        bgcolor: 'rgb(41 37 36)',
                                        color: 'white',
                                    },
                                }),
                            ]} onClick={() => addToWishlist(productInfo.id)}>
                                {isBookMarked ? <CheckCircleIcon /> : ""}
                                WishList
                            </Button>
                        </CardContent>
                    </CardContent>

                </Box>
            </Card>

            <div className='mt-24 w-129'>
                <h1 className='text-4xl font-bold text-stone-800 underline'>
                    Recommended
                </h1>
                <div className='flex gap-9 py-14 flex-wrap pl-14'>
                    {
                        recommandedArr.length !== 0
                            ?
                            recommandedArr.map((product) => (
                                <Link to={`/product/${product.id}`} key={product.id}>
                                    <ProductCard product={product} />
                                </Link>
                            ))
                            :
                            <h1 className='text-center py-20'>No Recommendation</h1>
                    }
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default ProductPage