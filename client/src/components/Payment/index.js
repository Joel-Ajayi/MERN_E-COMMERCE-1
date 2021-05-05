/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {savePaymentMethod} from '../../redux/action/cart'
import {Redirect} from 'react-router-dom'
import Checkoutsteps from '../CheckoutSteps'

const Paymentscreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    
        if(!localStorage.getItem('shippingAddress')){
            return <Redirect to="/shipping" />
        }    
    
    const onSubmit=(ev)=>{
      ev.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      return history.push('/placeorder')
    }


    return (
        <Container>
        <Checkoutsteps S1 S2 S3 progress={75} />
        <h1>PAYMENT METHOD</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group>
              <Form.Label as="legend">Select Payment Method</Form.Label>
              <Form.Check
              type="radio"
              label='PayPal or Credit Card'
              name="PayPal"
              value="PayPal"
              onChange={(ev)=>setPaymentMethod(ev.target.value)}
              checked
              ></Form.Check>
          </Form.Group>
          <Button type="submit" className="btn btn-dark">Continue</Button>
        </Form>
        </Container>
    )
}

export default Paymentscreen

