import axios from 'axios';

import {REMOVE_FROM_CART,ADD_TO_CART,CART_LOADING, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD} from './index';
axios.defaults.baseURL = 'http://localhost:5000';

export const addToCart = (id,qty) => async (dispatch,getState) => {
   
    // try {
        console.log(id,qty)
        dispatch({ type: CART_LOADING });
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
          type: ADD_TO_CART,
          payload:{
          product:data.msg._id,image:data.msg.image,name:data.msg.name,price:data.msg.price,countInStock:data.msg.countInStock,qty             }
        });

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    //   } catch (error) {
    //     dispatch({
    //       type: CART_ERROR,
    //       payload: error.response.data.error,
    //     });
    //   }
};

export const removeItemFromCart = (id) => async (dispatch,getState) => {
 
    dispatch({ type: CART_LOADING });
    dispatch({
        type:REMOVE_FROM_CART,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

};

export const saveShippingAddress = (shippingAddress) => async (dispatch) => {
 
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:shippingAddress
    })

    localStorage.setItem('shippingAddress',JSON.stringify(shippingAddress))

};

export const savePaymentMethod = (paymentMethod)=> async (dispatch) =>{
    dispatch({
        type:SAVE_PAYMENT_METHOD,
        payload:paymentMethod
    })

    localStorage.setItem('paymentMethod',JSON.stringify(paymentMethod))
}