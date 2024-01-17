import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { sharpen } from '@cloudinary/url-gen/actions/adjust';
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";

function ProductCard({product}) {
    let [myImageUrl, setMyImageUrl] = useState('')

    useEffect(() => {
        const cld = new Cloudinary({
            cloud: {
              cloudName: 'dugadzwcv'
            }
          }); 
        
          const myImage = cld.image(product.picture_id);
    
          myImage
          .adjust(sharpen().strength(200))
          .resize(scale().height(300))
    
    // Return the delivery URL
        setMyImageUrl(myImage.toURL());
    }, [])
    

  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardActionArea className='!w-80'>
        <CardMedia
          className='h-80'
          component="img"
          height="140"
          image={myImageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='text-stone-800'>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='text-stone-800'>
            {product.name || 'tShirt'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard