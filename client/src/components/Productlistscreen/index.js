import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import {RESET_MSG} from '../../redux/action'
import { loadProducts, deleteProduct } from '../../redux/action/products';

const Productlist = () => {
    const [display, setDisplay] = useState(false);
    const [submitMsg, setSubmitMsg] = useState({ });
 
    const products = useSelector(state => state.products)
    const {productList,loading} = products
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(/FETCH_PRODUCTS_ERROR|DELETE_PRODUCTS_ERROR/.test(products.message.id))setSubmitMsg({type:'error',msg:products.message.msg})
        if(/DELETE_PRODUCTS_SUCCESS/.test(products.message.id))setSubmitMsg({type:'success',msg:products.message.msg})
        return ()=>dispatch({type:RESET_MSG})
     },[products.message])

    useEffect(()=>{       
        dispatch(loadProducts(token))
    },[token,dispatch,products.message])
    
    const productDelete=(_id,name) =>{
        if(window.confirm(`Are you sure you want to delete ${name}`)){
            setDisplay(true)
            dispatch(deleteProduct(_id,token))
        }
        
    }

    return (
        <div style={{padding:'2% 5%',margin:'auto'}}>
        <Row>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className="text-right">
                <Link to="/admin/products/create" className="btn btn-dark">CREATE PRODUCT</Link>
            </Col>
        </Row>
        
        { loading ? <Loader /> :
         <>
           {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
              />
            }
            {productList.length !==0 &&
            <Table hover striped bordered responsive className="text-center">
               <thead className="bg-dark text-light">
               <tr>
               <th>ID</th>
                   <th>NAME</th>
                   <th>PRICE</th>
                   <th>CATEGORY</th>
                   <th>BRAND</th>
                   <th>ACTIONS</th>
               </tr>
               </thead>

               <tbody>
               {productList.map((product,i)=>(
                <tr key={i}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td><Link to={`/admin/products/edit/${product._id}`} ><AiFillEdit  color='green'/></Link> | <AiFillDelete  onClick={()=>productDelete(product._id,product.name)}  color='red' /> </td>
                
                </tr>
               ))}
                   
               </tbody>
              </Table>
            }
            </>
        }
          
        </div>
    )
}

export default Productlist
