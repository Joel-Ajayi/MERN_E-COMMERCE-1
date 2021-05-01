import axios from 'axios';
import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_LOADING,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR
  } from './index';
  
axios.defaults.baseURL = 'http://localhost:5000';

  export const createOrder = (formData,token) => async (dispatch)=>{
      try{
          dispatch({type:CREATE_ORDER_LOADING})

          const {data} =await axios.post(`/api/orders/create`,formData,{headers:{Authorization:`Bearer ${token}`}})

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

        const {data} =await axios.get(`/api/orders/${_id}`,{headers:{Authorization:`Bearer ${token}`}})

        dispatch({
            type:GET_ORDER_SUCCESS,
            payload:data.msg
        }) 
        
    }catch (error) {
        dispatch({
            type:GET_ORDER_ERROR,
            payload:{id:CREATE_ORDER_ERROR,msg:error.response.data.error}
        }) 
}
}
