import axios from 'axios';
import {
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_LOADING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_LOADING,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_LOADING,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_LOADING,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
  ADD_REVIEW_LOADING
} from './index';
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials=true

export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_LOADING });
    const { data } = await axios.get('/api/products/');
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: {id:FETCH_PRODUCTS_ERROR,msg:error.response.data.error}
    });
  }
};

export const loadProduct = (_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_LOADING });
    const { data } = await axios.get(`/api/products/${_id}`);
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_ERROR,
      payload: {id:FETCH_PRODUCT_ERROR,msg:error.response.data.error}
    });
  }
};

export const deleteProduct =(_id,token) => async (dispatch) =>{
  try {
    dispatch({ type: DELETE_PRODUCT_LOADING });
    const { data } = await axios.delete(`/api/products/delete/${_id}`,{headers:{Authorization:`Bearer ${token}`}});
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: {id:DELETE_PRODUCT_SUCCESS,msg:data.msg}
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_ERROR,
      payload: {id:DELETE_PRODUCT_ERROR,msg:error.response.data.error}
    });
  }
}

export const createProduct =(formData,token) => async (dispatch) =>{
  try {
    dispatch({ type: CREATE_PRODUCT_LOADING });
    const { data } = await axios.post(`/api/products/create`,formData,{headers:{Authorization:`Bearer ${token}`}});
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: {id:CREATE_PRODUCT_SUCCESS,msg:data.msg}
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_ERROR,
      payload: {id:CREATE_PRODUCT_ERROR,msg:error.response.data.error}
    });
  }
}

export const updateProduct =(formData,_id,token) => async (dispatch) =>{
  try {
    dispatch({ type: UPDATE_PRODUCT_LOADING });
    const { data } = await axios.patch(`/api/products/update/${_id}`,formData,{headers:{Authorization:`Bearer ${token}`}});
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: {id:UPDATE_PRODUCT_SUCCESS,msg:data.msg}
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_ERROR,
      payload: {id:CREATE_PRODUCT_ERROR,msg:error.response.data.error}
    });
  }
}

export const removeProductImg =(public_id,token)=>async (dispatch) =>{
  await axios.delete('/api/uploads/productImg',{public_id},{headers:{Authorization:`Bearer ${token}`}})
}

export const addReview =(_id,formData,token) => async (dispatch) =>{
  try {
    dispatch({ type: ADD_REVIEW_LOADING });
    const { data } = await axios.patch(`/api/products/updateReviews/${_id}`,formData,{headers:{Authorization:`Bearer ${token}`}});
    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: {id:ADD_REVIEW_SUCCESS,msg:data.msg}
    });
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_ERROR,
      payload: {id:ADD_REVIEW_ERROR,msg:error.response.data.error}
    });
  }
}