import {FETCH_PRODUCTS_LOADING,FETCH_PRODUCTS_SUCCESS,FETCH_PRODUCTS_ERROR,FETCH_PRODUCT_LOADING,FETCH_PRODUCT_SUCCESS,FETCH_PRODUCT_ERROR} from '../action'

let initState={
    loading:false,
    productItems:[]
}
export const productsList = (state=initState,action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_LOADING:
            return {...state,loading:true} 
        
        case FETCH_PRODUCTS_SUCCESS:
          return {...state,loading:false,productItems:action.payload}

        case FETCH_PRODUCTS_ERROR:
            return {...state,loading:false,error:action.payload}

        default:
            return {...state}
    }
}

let initState2={
    loading:false,
    productItem:{}
}

export const productDetails = (state=initState2,action) => {
    switch (action.type) {
        case FETCH_PRODUCT_LOADING:
            return {...state,loading:true} 
        
        case FETCH_PRODUCT_SUCCESS:
          return {...state,loading:false,productItem:action.payload}

        case FETCH_PRODUCT_ERROR:
            return {...state,loading:false,error:action.payload}

        default:
            return {...state}
    }
}

