/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button,ListGroup, Card, Image, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Msg from '../Msg/Msg'
import Loader from '../Loader/Loader'
import {createOrder} from '../../redux/action/orders'
import {CREATE_ORDER_ERROR} from '../../redux/action'
import { Link } from 'react-router-dom';
import Checkoutsteps from '../CheckoutSteps'

const Placeorder = ({history}) => {
    const [display, setDisplay] = useState(true);
    const [submitMsg, setSubmitMsg] = useState({ });
    
    const {cart,auth,orders} = useSelector(state => state)
    const {orderItem,message,loading} = orders
    const {token} = auth
    const {shippingAddress,paymentMethod,cartItems}= cart
    const dispatch = useDispatch()
    
    useEffect(()=>{
      if(orderItem){
          history.push(`/order/${orderItem._id}`)
      }
    },[orderItem,history])

    useEffect(()=>{
        if(/CREATE_ORDER_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
      },[message])

    if(!paymentMethod){
        return history.push("/placeorder")
    }  

    
    const addDecimals = num =>{
        return (Math.round(num*100)/100).toFixed(2)
    } 

    cart.itemsPrice = addDecimals(cartItems.reduce((acc,item)=>acc+item.price,0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number(0.15*cart.itemsPrice))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice )).toFixed(2)
    
    const placeOrder =()=>{
        setDisplay(true)
        setSubmitMsg({})
        dispatch(createOrder({
            orderItems:cartItems,
            shippingAddress,
            paymentMethod,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            itemsPrice:cart.itemsPrice,
            totalPrice:cart.totalPrice
        },token))
    }

    return (
        <>
     {loading && <Loader />}
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
        <Container>
        <Checkoutsteps S1 S2 S3 S4 />
        <Row>
            <Col md={8} className="p-2">
                 <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Shipping</h2>
                      <p>
                          <strong>Address:</strong>
                          {shippingAddress.address}{' '} 
                          {shippingAddress.city}{' '}
                          {shippingAddress.postalCode}{' '}
                          {shippingAddress.country}{' '}
                      </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <p>
                          <strong>Method:</strong>
                          {paymentMethod}
                      </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Order Items</h2>
                          {cartItems.length !==0 && (
                           <ListGroup variant='flush'>
                               {cartItems.map((item,i)=>{
                                 return <ListGroup.Item key={i}>
                                   <Row>
                                       <Col md={2} className="p-2">
                                           <Image style={{height:'50px',width:'100px',objectFit:'contain'}} src={item.image} alt={item.name}/>                                       
                                        </Col>
                                       <Col>
                                           <Link to={`/product/${item.product}`}>{item.name}</Link>
                                       </Col>
                                       <Col md={4} className="p-2">
                                           {item.qty} X {item.price} = {item.qty * item.price}
                                       </Col>
                                   </Row>   
                                  </ListGroup.Item>
                               })}
                           </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4} className="p-2">
             <Card>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Items</Col>
                          <Col>{cart.itemsPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Shipping</Col>
                          <Col>{cart.shippingPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Tax</Col>
                          <Col>{cart.taxPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Total</Col>
                          <Col>{cart.totalPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Button type="buttton" className="btn btn-block" disabled={cartItems.length===0}
                      onClick={placeOrder}>
                        PLACE ORDER
                      </Button>
                  </ListGroup.Item>
              </ListGroup>
             </Card> 
            </Col>
        </Row>
            
        </Container>
        </>
    )
}

export default Placeorder
