/* eslint-disable no-fallthrough */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_LOADING,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD
} from '../action';

let initState = {
  loading: false,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : null
};

const cart = (state = initState, action) => {
  switch (action.type) {
    case CART_LOADING:
      return { ...state, loading: true };

    case ADD_TO_CART:
      const item = action.payload;
      const alreadyExist = state.cartItems.find(
        (val) => val.product === item.product
      );
      if (alreadyExist) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((val) => {
            return val.product === alreadyExist.product ? item : val;
          }),
        };
      }else{
        return {...state,loading: false,cartItems:[...state.cartItems,item]}
      }
      

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        loading: false,
        shippingAddress: action.payload,
      };
      
      case SAVE_PAYMENT_METHOD:
        return {
          ...state,
          loading: false,
          paymentMethod: action.payload,
        };
      
    case REMOVE_FROM_CART:
      const productId = action.payload;
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((val) => val.product !== productId),
      };

    default:
      return { ...state };
  }
};

export default cart;
