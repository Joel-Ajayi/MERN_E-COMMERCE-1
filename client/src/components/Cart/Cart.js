import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiFillDelete,
} from 'react-icons/ai';
import {
  Col,
  Container,
  Row,
  Card,
  Image,
  ListGroup,
  Button
} from 'react-bootstrap';
import { addToCart, removeItemFromCart } from '../../redux/action/cart';

const Cart = ({ match: { params }, location, history}) => {
  const productId = params._id;
  const Qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, Qty));
    }
  }, [productId, Qty, dispatch]);

  const checkOut = () =>{
    history.push('/login?redirect=shipping')
  }


  return (
      <Container fluid>
    <Row className="w-100 m-auto">
      <Col md={8}>
      <h1>SHOPPING CART</h1>
        <ListGroup variant='flush'>
            {cartItems.map((item,i) => {
              return (
                <ListGroup.Item key={i}>
                <Row>
                  <Col md={2}>
                    <Image
                      style={{ height: '100px', objectFit: 'contain' }}
                      src={item.image}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}><h3>{item.name}</h3></Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <AiOutlineMinusSquare
                      style={{ margin: '0 3% 0 0' }}
                      size={'2em'}
                      onClick={() =>
                        item.qty > 1 &&
                        dispatch(addToCart(item.product, item.qty - 1))
                      }
                    />
                    <span stye={{ fontSize: '300' }}>{item.qty}</span>
                    <AiOutlinePlusSquare
                      style={{ margin: '0 3%' }}
                      size={'2em'}
                      value={{ className: 'qty-button' }}
                      onClick={() =>
                        item.qty < item.countInStock &&
                        dispatch(addToCart(item.product, item.qty + 1))
                      }
                    />
                  </Col>
                  <Col md={2} >
                    <AiFillDelete onClick={()=>dispatch(removeItemFromCart(item.product))} size={'1.5em'} />
                  </Col>
                </Row>
                </ListGroup.Item>
              );
            })}
          
        </ListGroup>
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant="flush" className="p-4 w-100">
            <ListGroup.Item>
              <h2> Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>
           
            <ListGroup.Item>
            <Button
              onClick={checkOut}
              className='btn-block'
              type='button'
              disabled={cartItems.length === 0}
            >
              Proceed To Checkout
            </Button>
            </ListGroup.Item>
            </ListGroup>
          </Card>
      </Col>
    </Row>
    </Container>
  );
};

export default Cart;
