import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR
} from '../action/index';

const initState={
    orderItem:null,
    orderDetails:null,
    loading:false,
    message:{}
}

const orderReducer = (state=initState,action) => {
    switch (action.type) {
        case CREATE_ORDER_LOADING:
            return {...state,loading:true}
        
        case CREATE_ORDER_SUCCESS:
            return {...state,loading:false,orderItem:action.payload}

        case CREATE_ORDER_ERROR:
            case GET_ORDER_ERROR:
            return {...state,loading:false,message:action.payload}

        case GET_ORDER_SUCCESS:
            return {...state,loading:false,orderDetails:action.payload}
         
        default:
            return {...state}
    }
    
}

export default orderReducer

