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
  ORDER_PAY_ERROR,
  ORDER_PAY_LOADING,
  ORDER_PAY_SUCCESS,
  RESET_ORDER_ITEM,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_ERROR,
  MY_ORDERS_LOADING
} from '../action/index';

const initState={
    orderItem:null,
    orderList:[],
    myOrders:[],
    orderDetails:null,
    loading:false,
    message:{}
}

const orderReducer = (state=initState,action) => {
    switch (action.type) {
        case ORDER_DELIVERED_LOADING:
        case MY_ORDERS_LOADING:
        case ORDER_PAY_LOADING:
        case CREATE_ORDER_LOADING:
        case GET_ORDERS_LOADING:
            return {...state,loading:true}
        
        case CREATE_ORDER_SUCCESS:
            return {...state,loading:false,orderItem:action.payload}

        case GET_ORDERS_SUCCESS:
            return {...state,loading:false,orderList:action.payload}
 
        case MY_ORDERS_SUCCESS:
            return {...state,loading:false,myOrders:action.payload}

        case CREATE_ORDER_ERROR:
        case MY_ORDERS_ERROR:  
        case ORDER_DELIVERED_SUCCESS:
        case ORDER_PAY_ERROR:
        case ORDER_PAY_SUCCESS:
        case ORDER_DELIVERED_ERROR:
        case GET_ORDER_ERROR:
        case GET_ORDERS_ERROR:
            return {...state,loading:false,message:action.payload}

        case GET_ORDER_SUCCESS:
            return {...state,loading:false,orderDetails:action.payload}

        case RESET_ORDER_ITEM:
                return {...state,loading:false,orderItem:null}
        
        default:
            return {...state}
    }
    
}

export default orderReducer

