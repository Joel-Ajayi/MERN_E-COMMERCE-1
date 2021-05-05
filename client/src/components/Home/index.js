import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Col, Container, Row} from 'react-bootstrap'
import ProductItem from './ProductItem'
import Loader from '../Loader/Loader'
import Topproducts from '../Topproducts'

function Home() {
    const dispatch = useDispatch()
    const {productList,loading} = useSelector(state => state.products)
    
    return (
        <>
        { loading? <Loader /> : ProductItem &&
        <>
        <Topproducts />
          <div style={{padding:'0 7%'}}>
           <h1>Latest Products</h1>
           <Row>
           {productList.map((item,id)=>{
               return <Col key={id} sm={6} lg={4} xl={3}>
                <ProductItem item={item} />
               </Col>
            })}
           </Row>
        </div>
        </>
        }
        </>
    )
}

export default Home
