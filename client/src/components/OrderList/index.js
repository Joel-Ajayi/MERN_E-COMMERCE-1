import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {MdClear} from 'react-icons/md'
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { getAllOrders } from '../../redux/action/orders';

const Orderlist = () => {
    const [display, setDisplay] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ });
 
    const orders = useSelector(state => state.orders)
    const {orderList,loading,message} = orders
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(/GET_ORDERS_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
     },[message])

    useEffect(()=>{
        dispatch(getAllOrders(token))
    },[token,dispatch])
    
    
    return (
        <div style={{padding:'2% 5%'}}>
        <h1>Orders</h1>
        { loading ? <Loader /> :
         <>
           {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
              />
            }
            <Table hover striped bordered responsive className="text-center">
               <thead className="bg-dark text-light">
               <tr>
               <th>ID</th>
                   <th>USER</th>
                   <th>DATE</th>
                   <th>TOTAL</th>
                   <th>PAID</th>
                   <th>DELIVERED</th>
                   <th>ACTION</th>
               </tr>
               </thead>

               <tbody>
               {orderList.length !==0 && orderList.map((order,i)=>(
                <tr key={i}>
                  <td>{order._id}</td>
                  <td>{order.user && `${order.user.fName} ${order.user.lName}`}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10) : <MdClear size={25} color='red' /> }</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <MdClear size={25} color='red' /> }</td>
                  <td><Link className="btn btn-light" to={`/order/${order._id}`} >DETAILS</Link></td>
                </tr>
               ))}
                   
               </tbody>
              </Table>
            </>
        }
          
        </div>
    )
}

export default Orderlist
