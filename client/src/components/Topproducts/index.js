import React from 'react'
import {Carousel, Image} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Topproducts = () => {
    const {productList} = useSelector(state=>state.products)

    return (
        <Carousel>
            {productList && productList.sort((a,b)=>b-a).filter((product,i)=> i>=3)
                     .map((product,i)=>(
                      <Carousel.Item className='bg-dark' key={i}>
                        <Link className="mx-auto w-100" to={`/product/${product._id}`}>
                        <Image className="rounded-circle mx-auto d-block m-4" style={{height:'300px',objectFit:'cover', width:'300px', borderRadius:'50%'}} src={product.image.url} alt={product.name}/>
                        <Carousel.Caption style={{position:'static'}}>
                            <h5 className="text-light">{product.name} ({product.price})</h5>
                        </Carousel.Caption>
                        </Link>
                        </Carousel.Item>  
                     ))}
        </Carousel>
    )
}

export default Topproducts
