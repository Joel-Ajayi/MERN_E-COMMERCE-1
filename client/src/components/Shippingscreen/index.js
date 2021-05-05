/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {saveShippingAddress} from '../../redux/action/cart'
import Checkoutsteps from '../CheckoutSteps'

const Shippingscreen = ({history}) => {
    
    const {shippingAddress} = useSelector(state => state.cart)
    const [formData,setFormData] = useState({address:shippingAddress.address,city:shippingAddress.city,postalCode:shippingAddress.postalCode,country:shippingAddress.country})
    const dispatch = useDispatch()

    const onChangeHandler=(ev)=>{  
      const {name,value}=ev.target
      setFormData({...formData,[name]:value})
    }
    const onSubmit=(ev)=>{
      ev.preventDefault()
      dispatch(saveShippingAddress(formData))
      return history.push('/payment')
    }

    return (
        <Container>
        <Checkoutsteps S1 S2 progress={50}/>
        <h1>Shipping</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
              type="text"
              name="address"
              placeholder="Enter Address"
              required
              defaultValue={formData.address}
              onChange={onChangeHandler}
               />
          </Form.Group>  

          <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
              type="text"
              name="city"
              placeholder="Enter City"
              required
              defaultValue={formData.city}
              onChange={onChangeHandler}
               />
          </Form.Group>  

          <Form.Group>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
              type="text"
              name="postalCode"
              placeholder="Enter postalCode"
              required
              defaultValue={formData.postalCode}
              onChange={onChangeHandler}
               />
          </Form.Group>  

          <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
              type="text"
              name='country'
              placeholder="Enter Address"
              required
              defaultValue={formData.country}
              onChange={onChangeHandler}
               />
          </Form.Group>  

          <Button type="submit" className="btn btn-dark">Continue</Button>
        </Form>
        </Container>
    )
}

export default Shippingscreen
