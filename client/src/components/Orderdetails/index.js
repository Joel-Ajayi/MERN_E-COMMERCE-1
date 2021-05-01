/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button,ListGroup, Card, Image, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Msg from '../Msg/Msg'
import Loader from '../Loader/Loader'
import {getOrder} from '../../redux/action/orders'
import {GET_ORDER_ERROR} from '../../redux/action'
import { Link } from 'react-router-dom';
import Checkoutsteps from '../CheckoutSteps'

const Orderscreen = ({history,match}) => {
    const [display, setDisplay] = useState(true);
    const [submitMsg, setSubmitMsg] = useState({ });
    
    const {cart,auth,orders} = useSelector(state => state)
    const {orderDetails,message,loading} = orders
    const {token} = auth
    const {params} = match
    const dispatch = useDispatch()
    
    useEffect(()=>{
     dispatch(getOrder(params._id,token))
    },[params._id,dispatch])

    useEffect(()=>{
        if(/GET_ORDER_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
      },[message])

    
    return (
        <>
    {loading ? <Loader /> : orderDetails &&
    <>
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
        
    <Container>
        <Row>
        <h1>ORDER {orderDetails._id}</h1>
            <Col md={8} className="p-2">
                 <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Shipping</h2>
                      
                      { orderDetails.user && <>
                      <p>
                          <strong>Name:</strong>
                          {' '}{orderDetails.user.fName}{' '}{orderDetails.user.lName}
                      </p>
                      <p>
                         <strong>Email:</strong>
                          <a href={`mailto:${orderDetails.user.email}`}>{orderDetails.user.email}</a>
                      </p>
                      </>
                      }
                      
                      <p>
                          <strong>Address:</strong>
                          {orderDetails.shippingAddress.address}{' '} 
                          {orderDetails.shippingAddress.city}{' '}
                          {orderDetails.shippingAddress.postalCode}{' '}
                          {orderDetails.shippingAddress.country}{' '}
                      </p>

                      {orderDetails.isDelivered ? 
                      <Alert variant='success'>Delivered on {orderDetails.deliveredAt}</Alert>
                      :
                      <Alert variant='danger'>Not Delivered</Alert>
                      }
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <p>
                          <strong>Method:</strong>
                          {orderDetails.paymentMethod}
                      </p>
                      {orderDetails.isPaid ? 
                      <Alert variant='success'>Paid on {orderDetails.paidAt}</Alert>
                      :
                      <Alert variant='danger'>Not Paid</Alert>
                      }
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Order Items</h2>
                          {orderDetails.orderItems.length !==0 && (
                           <ListGroup variant='flush'>
                               {orderDetails.orderItems.map((item,i)=>{
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
                          <Col>{orderDetails.itemsPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Shipping</Col>
                          <Col>{orderDetails.shippingPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Tax</Col>
                          <Col>{orderDetails.taxPrice}</Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>Total</Col>
                          <Col>{orderDetails.totalPrice}</Col>
                      </Row>
                  </ListGroup.Item>
              </ListGroup>
             </Card> 
            </Col>
        </Row>
            
        </Container>
        </>
    }
    </>
    )
}

export default Orderscreen
