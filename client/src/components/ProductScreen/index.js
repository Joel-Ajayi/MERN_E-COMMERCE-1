import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Button
} from 'react-bootstrap';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { loadProduct } from '../../redux/action/products';
import Rating from '../Rating';
import Loader from '../Loader/Loader';

const ProductScreen = ({ match: { params } ,history}) => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { productItem, loading } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(loadProduct(params._id));
  }, [dispatch]);

  useEffect(() => {
    if (productItem) setProduct(productItem);
  }, [productItem]);

  const addToCartHandler = () => {
   history.push(`/cart/${productItem._id}?qty=${qty}`);
  };

  return (
    <Container>
    {loading ? <Loader /> :
      <Row>
        <Col md={4} className="text-center">
          <Image className="m-auto" src={product.image} stye={{height: '300px', objectFit: 'contain'}} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} /> {product.numReviews} reviews
            </ListGroup.Item>

            <ListGroup.Item>Price:${product.price}</ListGroup.Item>

            <ListGroup.Item>Description:{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty:</Col>
                <Col>
                  <AiOutlineMinusSquare
                    style={{ margin: '0 3% 0 0' }}
                    size={'2em'}
                    onClick={() => qty > 1 && setQty((preVal) => preVal - 1)}
                  />
                  <span stye={{ fontSize: '300' }}>{qty}</span>
                  <AiOutlinePlusSquare
                    style={{ margin: '0 3%' }}
                    size={'2em'}
                    value={{ className: 'qty-button' }}
                    onClick={() =>
                      qty < product.countInStock &&
                      setQty((preVal) => preVal + 1)
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          )}

          <ListGroup.Item>
            <Button
              onClick={addToCartHandler}
              className='btn-block'
              type='button'
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
      }
    </Container>
  );
};

export default ProductScreen;
