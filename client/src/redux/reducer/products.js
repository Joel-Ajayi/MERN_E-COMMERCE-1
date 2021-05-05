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
    RESET_MSG,
    ADD_REVIEW_LOADING,
    ADD_REVIEW_ERROR,
    ADD_REVIEW_SUCCESS
} from '../action'

let initState={
    loading:false,
    productList:[],
    productItem:null,
    message:{}
}

export const productReducer = (state=initState,action) => {
    switch (action.type) {
       
        case CREATE_PRODUCT_LOADING:
        case UPDATE_PRODUCT_LOADING:
        case FETCH_PRODUCTS_LOADING:
        case FETCH_PRODUCT_LOADING:
        case ADD_REVIEW_LOADING:
        case DELETE_PRODUCT_LOADING:
            return {...state,loading:true} 
        
        case FETCH_PRODUCTS_SUCCESS:
        return {...state,loading:false,productList:action.payload}
        case FETCH_PRODUCT_SUCCESS:
          return {...state,loading:false,productItem:action.payload}

        case FETCH_PRODUCTS_ERROR:
        case FETCH_PRODUCT_ERROR:
        case CREATE_PRODUCT_ERROR:
        case CREATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_ERROR:
        case ADD_REVIEW_ERROR:
        case ADD_REVIEW_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
        case DELETE_PRODUCT_ERROR:
        case DELETE_PRODUCT_SUCCESS:
            return {...state,loading:false,message:action.payload}
        case RESET_MSG:
            return {...state,message:{}}
        default:
            return {...state}
    }
}


