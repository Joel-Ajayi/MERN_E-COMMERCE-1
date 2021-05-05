import React, {useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlinePlus} from 'react-icons/ai'
import {MdClear} from 'react-icons/md'
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { createProduct, loadProduct, updateProduct } from '../../redux/action/products';
import  { UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_LOADING } from '../../redux/action';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials=true

const CreateProduct = ({history,match:{params},location}) => {
  const [display, setDisplay] = useState(true);
  const [submitMsg, setSubmitMsg] = useState({ });
  const [productData,setProductData] = useState({name:'',description:'',brand:'',category:'',price:0,countInStock:0,image:{}})

  const {products,auth} = useSelector(state=>state)
  const dispatch = useDispatch();

  const {token} = auth
  const {message,loading,productItem} = products

  useEffect(()=>{
    if(params._id)
      dispatch(loadProduct(params._id,token))
  },[dispatch,params._id])

  useEffect(()=>{
    if(productItem){
      const {name,description,brand,category,price,countInStock,image} = productItem
      setProductData({name,description,brand,category,price,countInStock,image})
    }
    
  },[productItem])
  
  useEffect(()=>{
    if(/CREATE_PRODUCT_ERROR|UPDATE_PRODUCT_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
    if(/CREATE_PRODUCT_SUCCESS|UPDATE_PRODUCT_SUCCESS/.test(message.id))history.push('/admin/products/')  
  },[message,history,dispatch])


  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleProductImg = async (ev) =>{
    ev.preventDefault();
    setDisplay(true)
    setSubmitMsg({ });
    
    dispatch({type:UPDATE_PRODUCT_LOADING})

    let productImg = ev.target.files[0];

    if (!productImg) return setSubmitMsg({ type:'error',msg:"No file was uploaded"});

    if (!productImg.type.match(/\/(png|jpeg|jpg|gif)$/)) {
      return setSubmitMsg({ type:'error',msg:"Incorrect file format"});
    }


    if (productImg.size > 1500000)
      return setSubmitMsg({ tyep:'error', msg: "file is more than 1.5mb"});

    let formData = new FormData();
    formData.append("productImg", productImg);
    const {image:{public_id}} = productData
    try{
     
      if(public_id){
      await axios.post('/api/uploads/productImg/delete',{public_id}, {headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      } 
    })
      }

      const {data} = await axios.post(`/api/uploads/productImg/create/${params._id}`,formData, {headers: {
         "content-type":"multipart/form-data",
          Authorization:`Bearer ${token}`,
        }
      })

        setProductData({...productData,image:data.msg})
  
        if(params._id){
          dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:{id:UPDATE_PRODUCT_SUCCESS,msg:'Product Image Updated'}})
          dispatch(loadProduct(params._id,token))
        }
    }catch(error){
      setSubmitMsg({ type:'error',msg:error.response.data.error});
    }
  }

  const deleteProductImg = async (public_id) => {
    setProductData({...productData,image:{url:'',public_id}})
  }
  
  const productSubmitHandler = (ev) => {
    ev.preventDefault();
    setDisplay(true)
    setSubmitMsg({ });
    const {name,
      description,
      price,
      brand,
      countInStock,
      category,
    image} = productData

    if(!image
      )return setSubmitMsg({ type:'error',msg:"No file was uploaded"});
    
    if(
      !name ||
      !description ||
      !price ||
      !brand ||
      !countInStock ||
      !category
      )return setSubmitMsg({ type:'error',msg:"Please fill out all fields"});
      
      if(productItem){
        dispatch(updateProduct({
          name,
          description,
          price,
          brand,
          countInStock,
          category
        },params._id,token))
      }else{
        dispatch(createProduct({name,
          description,
          price,
          brand,
          countInStock,
          category,
          image},token))
       
      }
        
  };


  return (
    <>
     {loading ? <Loader />
     :
     <>
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
    <Container>
      <h1>{productItem ? 'Edit Product' : 'Create Product'}</h1>

      <Row>
          <Col md={6} className="border border-dark" style={{display:'flex',alignItems:'stretch',maxHeight:'600px',minHeight:'450px'}}>
          <MdClear className="display-relative" size={30} onClick={()=>productData.image.public_id && deleteProductImg(productData.image.public_id)}/>
          {productData.image.url ?
          <>
          <Image className='w-100 h-90' src={productData.image.url} style={{objectFit:'contain'}} />
          </>
          :
          <Form className="h-100 w-100 d-flex justify-content-center text-center align-items-center">
          <Form.Group className='text-center' >
          <Form.File
            name='productImg'
            type="file"
            style={{position:'relative',opacity:0,bottom:'-50px'}}
            className="bg-success text-center "
            onChange={handleProductImg}
          /><AiOutlinePlus size={80}/>
        </Form.Group>
        </Form>
          }
          
          </Col>
          <Col md={6}>
        <Form onSubmit={productSubmitHandler}>
         <Form.Group>
          <Form.Label>Name :</Form.Label>
          <Form.Control
            name='name'
            type='text'
            value={productData.name}
            placeholder='Enter first name'
            onChange={formChangeHandler}
          />
        </Form.Group>
        
         <Form.Group>
          <Form.Label>Description :</Form.Label>
          <Form.Control
            name='description'
            type='text'
            value={productData.description}
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
            value={productData.brand}
            placeholder='Product brand'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            name='category'
            type='text'
            value={productData.category}
            placeholder='Product category'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price :</Form.Label>
          <Form.Control
            name='price'
            type="number"
            value={productData.price}
            placeholder='Product Price'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Count In Stock :</Form.Label>
          <Form.Control
            name='countInStock'
            type="number"
            value={productData.countInStock}
            placeholder='count in stock'
            onChange={formChangeHandler}
          />
        </Form.Group>

            <Button type='submit' className='btn btn-dark'>
             {productItem ? 'UPDATE PRODUCT' : 'CREATE PRODUCT' }
            </Button> 

      </Form>
    </Col>
    </Row>
</Container>
</>
     }  
    </>
  );
};

export default CreateProduct;
