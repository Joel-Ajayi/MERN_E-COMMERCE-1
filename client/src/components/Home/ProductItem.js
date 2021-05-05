import React from 'react'
import {Card} from 'react-bootstrap'
import Styles from './home.module.css'
import Rating from '../Rating'
import {Link} from 'react-router-dom'

function ProductItem({item}) {
    return (
        <Card className={Styles.card} >
        <Link to={`/product/${item._id}`} varaint="top">
        <Card.Img className={Styles.img} src={item.image.url} />
        </Link>
        <Card.Body>
        <Link to={`/product/${item._id}`} varaint="top">
        <Card.Title>
        <strong>{item.name}</strong>
        </Card.Title>
         </Link>  
         <Card.Text>
           <strong><Rating value={item.rating} /> ({item.numReviews} reviews)</strong>
         </Card.Text> 
         <Card.Text as='h3'>
             ${item.price}
         </Card.Text> 
        </Card.Body> 
        </Card>
    )
}

export default ProductItem
