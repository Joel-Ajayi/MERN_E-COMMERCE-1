import axios from 'axios';
import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_LOADING,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    GET_ORDERS_ERROR,
    GET_ORDERS_LOADING,
    GET_ORDERS_SUCCESS,
    ORDER_DELIVERED_ERROR,
    ORDER_DELIVERED_LOADING,
    ORDER_DELIVERED_SUCCESS,
    ORDER_PAY_LOADING,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_ERROR,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_ERROR,
   MY_ORDERS_LOADING
  } from './index';
  
axios.defaults.baseURL = 'http://localhost:5000';

  export const createOrder = (formData,token) => async (dispatch)=>{
      try{
          dispatch({type:CREATE_ORDER_LOADING})

          const {data} =await axios.post(`/api/orders/create`,formData,config(token))

          dispatch({
              type:CREATE_ORDER_SUCCESS,
              payload:data.msg
          }) 
          
      }catch (error) {
          dispatch({
              type:CREATE_ORDER_ERROR,
              payload:{id:CREATE_ORDER_ERROR,msg:error.response.data.error}
          }) 
  }
}
  
export const getOrder =(_id,token) =>async (dispatch)=>{
    try{
        dispatch({type:CREATE_ORDER_LOADING})

        const {data} =await axios.get(`/api/orders/orderbyid/${_id}`,config(token))

        dispatch({
            type:GET_ORDER_SUCCESS,
            payload:data.msg
        }) 
        
    }catch (error) {
        dispatch({
            type:GET_ORDER_ERROR,
            payload:{id:GET_ORDER_ERROR,msg:error.response.data.error}
        }) 
}
}

export const getAllOrders =(token) =>async (dispatch)=>{
    try{
        dispatch({type:GET_ORDERS_LOADING})

        const {data} =await axios.get(`/api/orders/`,config(token))

        dispatch({
            type:GET_ORDERS_SUCCESS,
            payload:data.msg
        }) 
        
    }catch (error) {
        dispatch({
            type:GET_ORDERS_ERROR,
            payload:{id:GET_ORDERS_ERROR,msg:error.response.data.error}
        }) 
}
}

export const payForOrder =(_id,paymentResult,token) =>async (dispatch)=>{
    try{
        dispatch({type:ORDER_PAY_LOADING})

        const {data} =await axios.get(`/api/orders/${_id}/pay`,paymentResult,config(token))

        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data.msg
        }) 
    }catch (error) {
        dispatch({
            type:ORDER_PAY_ERROR,
            payload:{id:ORDER_PAY_ERROR,msg:error.response.data.error}
        }) 
}
}

export const markOrderAsDelivered = (_id,token) => async (dispatch) =>{
    try {
        dispatch({type:ORDER_DELIVERED_LOADING,})
        const {data} =await axios.get(`/api/orders/${_id}/delivered`,config(token))
        dispatch({
            type:ORDER_DELIVERED_SUCCESS,
            payload:{id:ORDER_DELIVERED_SUCCESS,msg:data.msg}
        }) 
    } catch (error) {
        dispatch({
            type:ORDER_DELIVERED_ERROR,
            payload:{id:ORDER_DELIVERED_ERROR,msg:error.response.data.error}
        }) 
    }
}

export const getMyOrders = (token) => async (dispatch) =>{
    try {
        dispatch({type:MY_ORDERS_LOADING})
        const {data} =await axios.get(`/api/orders/myorders`,config(token))
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.msg
        }) 
    } catch (error) {
        dispatch({
            type:MY_ORDERS_ERROR,
            payload:{id:MY_ORDERS_ERROR,msg:error.response.data.error}
        }) 
    }
}

const config = (token) =>{
    return {headers:{
        'Content_Type':'application/json',
        Authorization:`Bearer ${token}`} 
    }
}
