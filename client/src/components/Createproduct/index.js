import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import {  } from '../../redux/action/users';


const Login = () => {
  const [display, setDisplay] = useState(true);
  const [submitMsg, setSubmitMsg] = useState({ });
  const [productData,setProductData] = useState({name:'',description:'',brand:'',category:'',price:0,countInstock:0,productImg:''})
  const dispatch = useDispatch();

  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setProductData({ ...productData, [name]: value });
  };

   const productSubmitHandler = (ev) => {
  
  };

  const handleProductImg = (ev) =>{

  }

  return (
    <>
     {/* {loading && <Loader />} */}
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
    <Container>
      <h1>Create Product</h1>
      <Row>
          <Col md={6} className="border border-dark" style={{display:'flex',alignItems:'stretch'}}>
          <Form className="h-100 w-100 d-flex justify-content-center text-center align-items-center">
          <Form.Group className='text-center' >
          <Form.File
            name='productImg'
            style={{position:'relative',opacity:0,bottom:'-50px'}}
            className="bg-success text-center "
            onChange={handleProductImg}
          /><AiOutlinePlus size={80}/>
        </Form.Group>
        </Form>
          </Col>
          <Col md={6}>
          <Form onSubmit={productSubmitHandler}>
         <Form.Group>
          <Form.Label>Name :</Form.Label>
          <Form.Control
            name='name'
            type='text'
            placeholder='Enter first name'
            onChange={formChangeHandler}
          />
        </Form.Group>
        
         <Form.Group>
          <Form.Label>Description :</Form.Label>
          <Form.Control
            name='description'
            type='text'
            as="textarea"
            placeholder='Product Description'
            onChange={formChangeHandler}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Brand :</Form.Label>
          <Form.Control
            name='brand'
            type='text'
            placeholder='Product brand'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price :</Form.Label>
          <Form.Control
            name='price'
            type="number"
            placeholder='Product Price'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Count In Stock :</Form.Label>
          <Form.Control
            name='countInStock'
            type="number"
            placeholder='count in stock'
            onChange={formChangeHandler}
          />
        </Form.Group>

            <Button type='submit' className='btn btn-dark'>
              CREATE PRODUCT
            </Button> 

      </Form>
    </Col>
    </Row>
</Container>
      
    </>
  );
};

export default Login;
