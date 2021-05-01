import { 
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_ERROR,
    ACTIVATION_ERROR,
    ACCESSTOKEN_SUCCESS,
    ACCESSTOKEN_ERROR,
    USER_LOADED,
    USER_ERROR,
    USER_UPDATE,
    REGISTER_SUCCESS,
    ACTIVATION_SUCCESS,
    LOADING,
    UPDATE_ERROR,
    USERS_LIST_LOADING,
    USERS_LIST,
    USERS_LIST_ERROR,
    USER_DELETE,
    USER_DELETE_ERROR,
    USER_DELETE_LOADING,
    USER_ITEM_LOADING,
    USER_ITEM,
    USER_ITEM_ERROR,
    USER_ITEM_UPDATE_ERROR,
    USER_ITEM_UPDATE,
    USER_ITEM_UPDATE_LOADING
   } from "../action";
   
   const initState = {
     user: {},
     loading: false,
     token: null,
     isAuth: false,
     message:{}
   };
   
   export const authReducer = (state = initState, action) => {
     switch (action.type) {
       case LOADING:
         return {
           ...state,
           loading: true,
         };
       case USER_LOADED:
         return {
           ...state,
           loading:false,
           isLoading: false,
           isAuth: true,
           user: action.payload,
         };
       case REGISTER_SUCCESS: 
       case ACTIVATION_SUCCESS: {
         return {
           ...state,
           loading: false,
           message:action.payload
         };
       }
       case  USER_UPDATE:
       case  UPDATE_ERROR:{
         return {
           ...state,
           message:action.payload
         }
       }
       case ACCESSTOKEN_SUCCESS: 
       case LOGIN_SUCCESS: {
         return {
           ...state,
           token:action.payload,
           loading: false,
           message: {},
         };
       }
   
       case LOGOUT:
       case ACCESSTOKEN_ERROR:{
       localStorage.setItem('loggedIn',false)
         return {
           ...state,
           loading: false,
           isAuth: false,
           user:{},
           token: null,
           message:{}
         };
       }

       case LOGIN_ERROR:
       case REGISTER_ERROR:
       case ACTIVATION_ERROR:
       case USER_ERROR: {
         return {
           ...state,
           loading: false,
           message:action.payload
         };
       }
       default:
         return { ...state };
     }
   };

   
   const initState2 = {
     usersList:[],
     userItem:{},
     loading: false,
     message:{}
   };
   
   export const usersReducer = (state = initState2, action) => {
     switch (action.type) {
       case USERS_LIST_LOADING:
       case USER_ITEM_UPDATE_LOADING:
       case USER_ITEM_LOADING:
       case USER_DELETE_LOADING:
         return {
           ...state,
           loading: true,
         };
       case USERS_LIST:
         return {
           ...state,
           loading:false,
           usersList: action.payload,
        };
        case USER_ITEM:
         return {
           ...state,
           loading:false,
           userItem: action.payload,
        };
       case USERS_LIST_ERROR: 
       case USER_DELETE_ERROR:
       case USER_ITEM_UPDATE_ERROR:
       case USER_ITEM_UPDATE:
       case USER_ITEM_ERROR:
       case USER_DELETE:
          return {
              ...state,
            loading:false,
            message:action.payload
          }
    
       default:
         return { ...state };
     }
   };
   
   