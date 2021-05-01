import axios from 'axios';
import {
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_LOADING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
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
      payload: error.response.data.error,
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
      payload: error.response.data.error,
    });
  }
};
