import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Col, Container, Row} from 'react-bootstrap'
import {loadProducts} from '../../redux/action/products'
import ProductItem from './ProductItem'
import Loader from '../Loader/Loader'

function Home() {
    const [products,setProducts] = useState([])

    const dispatch = useDispatch()
    const {productItems,loading} = useSelector(state => state.products)

    useEffect(()=>{
        dispatch(loadProducts())
    },[dispatch])
    
    useEffect(()=>{
        if(productItems)
        setProducts([...productItems])
    },[productItems])
    

    return (
        <>
        { loading? <Loader /> : products &&
            <Container>
           <h1>Latest Products</h1>
           <Row>
           {products.map((item,id)=>{
               return <Col key={id} xl={3} sm={12} md={6} lg={4} >
                <ProductItem item={item} />
               </Col>
            })}
           </Row>
        </Container>
        }
        </>
    )
}

export default Home
