
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './product.module.css'
import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Alert,
  Form
} from 'react-bootstrap';
import Msg from '../Msg/Msg';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { addReview, loadProduct } from '../../redux/action/products';
import Rating from '../Rating';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const ProductScreen = ({ match: { params } ,history}) => {
  const [product, setProduct] = useState();
  const [display, setDisplay] = useState(false);
  const [qty, setQty] = useState(1);
  const [review,setReview] = useState({comment:'',rating:0})
  const [reviewMsg, setMsg] = useState(null);


  const dispatch = useDispatch();
  const { productItem, loading, message } = useSelector((state) => state.products);
  const {user,token} = useSelector(state=>state.auth)

  useEffect(() => {
    dispatch(loadProduct(params._id));
  }, [dispatch,message,params._id]);

  useEffect(() => {
    if (productItem) setProduct(productItem);
  }, [productItem]);
  
  const addToCartHandler = () => {
   history.push(`/cart/${productItem._id}?qty=${qty}`);
  };

  const SubmitReview = (ev) =>{
    ev.preventDefault()
    dispatch(addReview(params._id,review,token))
    setReview({comment:'',rating:0})
  }

  return (
    <div style={{padding:'3% 10%'}}>
    {loading ? <Loader /> : product && 
    <>
    {reviewMsg && <Msg
              type={reviewMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={reviewMsg.msg}
              />
      }
      <Row className="mb-4">
        <Col md={6} className="text-center">
        <Image className="m-auto w-100" src={product.image.url} style={{height: '400px', objectFit: 'contain'}} alt={product.name} />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4><Rating className="pb-4" value={product.rating} /> ({product.numReviews} reviews)</h4>
            </ListGroup.Item>

            <ListGroup.Item><strong>Price</strong>: ${product.price} </ListGroup.Item>

            <ListGroup.Item><strong>Description</strong>: {product.description}</ListGroup.Item>

            <ListGroup.Item>
                <strong>Status</strong>:{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </ListGroup.Item>
           <ListGroup.Item>
            Quantity:
                
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
              </ListGroup.Item>  
          
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
          </ListGroup>
        </Col>
       
      </Row>

      <Row className="mt-4">
        <Col md={6}>
        <h2>REVIEWS</h2>
        <ListGroup variant='flush'> 
        {product.reviews.length === 0 ? <Alert className='w-100' variant="info">No reviews</Alert> :
        <>
         {product.reviews.map((review)=>(
          <ListGroup.Item className='pt-4'>
              <h5>
                {review.image && <Image src={review.image.url} className={Styles.profile_picture} />}
                {!review.image && <span className={Styles.profile_picture_name} >{`${review.name.slice(0,1).toUpperCase()}`}</span>}              
                {review.name}  
                <p className="mt-2"><Rating size={15} value={review.rating}/></p>
              </h5>
            <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
          </>
          }

          {/* only show form if not reviewed */}
         {product.reviews.find(r=>r.user.toString() === user._id.toString()) ? null :
          <ListGroup.Item>
            {user ?
            <> 
            <h2>WRITE A CUSTOMER REVIEW</h2>
            <Form onSubmit={SubmitReview}>
            <Form.Group>
            <Form.Label>Rating :</Form.Label> 
            <Rating size={25} value={review.rating} editRating={true} setRating={(num)=>{
               setReview({...review,rating:num})
            }} />
             </Form.Group>
            
             <Form.Group>
             <Form.Label>Comment :</Form.Label> 
              <Form.Control onChange={({target})=>setReview({...review,comment:target.value})} placeholder="product comment" as="textarea">
              </Form.Control>

             </Form.Group>
             <Button type="submit" varaint='success'>Submit</Button>
            </Form>
            </>
            : 
            <Alert>Please <Link to="/login">Sign In</Link> to write a review</Alert>
            }
          </ListGroup.Item>
         }
        </ListGroup>
        </Col>
         
      </Row>
      </>
      }
    </div>
  );
};

export default ProductScreen;
