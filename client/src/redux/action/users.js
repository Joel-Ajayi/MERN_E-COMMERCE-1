import axios from 'axios';
import {
  LOADING,
  USER_ERROR,
  USER_LOADED,
  ACTIVATION_ERROR,
  ACTIVATION_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_UPDATE,
  UPDATE_ERROR,
  USER_DELETE,
  USER_DELETE_ERROR,
  LOGOUT,
  USERS_LIST_LOADING,
  USERS_LIST,
  USERS_LIST_ERROR,
  USER_DELETE_LOADING,
  USER_ITEM_ERROR,
  USER_ITEM,
  USER_ITEM_LOADING,
  USER_ITEM_UPDATE_LOADING,
  USER_ITEM_UPDATE,
  USER_ITEM_UPDATE_ERROR
} from './index';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials=true

export const register=(formdata)=>{
    return async dispatch=>{
        try {
            dispatch({
                type:LOADING
            })
            const {data} =await axios.post(`/api/users/register`,formdata)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:{id:REGISTER_SUCCESS,msg:data.msg}
            })
        } catch (error) {
            dispatch({
                type:REGISTER_ERROR,
                payload:{id:REGISTER_ERROR,msg:error.response.data.error}
            })
        }
        
    }
}

export const activateAccount=(activation_token)=>{
    return async dispatch=>{
        try {
            const {data} =await axios.post(`/api/users/activate_account`,activation_token)
            dispatch({
                type:ACTIVATION_SUCCESS,
                payload:{id:ACTIVATION_SUCCESS,msg:data.msg}
            })
        } catch (error) {
            dispatch({
                type:ACTIVATION_ERROR,
                payload:{id:ACTIVATION_ERROR,msg:error.response.data.error}
            })
        }
        
    }
}

export const login=(formData)=>{
    return async dispatch=>{
        try {
            dispatch({
                type:LOADING
            })
            const {data} = await axios.post(`/api/users/login`,formData)
            localStorage.setItem('loggedIn',true)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:data.msg
            }) 
        } catch (error) {
            dispatch({
                type:LOGIN_ERROR,
                payload:{id:LOGIN_ERROR,msg:error.response.data.error}
            }) 
        }
        
    }
}

export const loadUser=(token)=>{
    return async dispatch=>{
        try {
            const {data} =await axios.get(`/api/users/info`,{headers:{Authorization:`Bearer ${token}`}})

            dispatch({
                type:USER_LOADED,
                payload:data.msg
            }) 
            
        }catch (error) {
            dispatch({
                type:USER_ERROR,
                payload:{id:USER_ERROR,msg:error.response.data.error}
            }) 
        }
        
    }
}

export const refreshToken=()=>{
    return async dispatch=>{
        try {
            const {data} =await axios.post(`/api/users/refresh_token`) 
            dispatch({
                type:ACCESSTOKEN_SUCCESS,
                payload:data.msg
            })
        } catch (error) {
           
            dispatch({
                type:ACCESSTOKEN_ERROR,
                payload:{id:ACCESSTOKEN_ERROR,msg:error.response.data.error}
            }) 
            
        }
        
    }
}

export const logout = () =>{
    return async dispatch=>{
        try {
            const {data} =await axios.get(`/api/users/logout`) 
            dispatch({
                type:LOGOUT,
            })
        } catch (error) {        
            dispatch({
                type:LOGOUT
            })
        }
        
    }
}

export const updateUser = (formData,token) =>{
    return async dispatch=>{
        try {
            dispatch({
                type:LOADING
            })
            await axios.patch(`/api/users/update`,formData,{headers:{Authorization:`Bearer ${token}`}})          
            dispatch({
                type:USER_UPDATE,
                payload:{id:USER_UPDATE,msg:'User updated successfully'}
            })
        } catch (error) { 
            if(error.response.status===401){
                return dispatch({type:LOGOUT}) 
            }
            dispatch({
                type:UPDATE_ERROR,
                payload: {id:UPDATE_ERROR,msg:error.response.data.error},
              });
        }  
    }
}

export const deleteUser = (_id,token) =>{
    return async dispatch=>{
        try {
            dispatch({
                type:USER_DELETE_LOADING
            })
            await axios.delete(`/api/users/delete/${_id}`,{headers:{Authorization:`Bearer ${token}`}})          
            dispatch({
                type:USER_DELETE,
                payload:{id:USER_DELETE,msg:'User deleted'}
            })

        } catch (error) { 
            if(error.response.status===401){
                return dispatch({type:LOGOUT}) 
            }
            dispatch({
                type:USER_DELETE_ERROR,
                payload: {id:UPDATE_ERROR,msg:error.response.data.error},
              });
        }  
    }
}

export const updateAvatar = (formData, token) => {
  return async (dispatch) => {
    try {
        dispatch({
            type:LOADING
        })
      await axios.patch(`/api/users/avatar`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: USER_UPDATE,
        payload: {id:USER_UPDATE,msg:'User updated successfully'},
      });
    } catch (error) {
        if(error.response.status===401){
            return dispatch({type:LOGOUT}) 
        }
        dispatch({
            type: UPDATE_ERROR,
            payload: {id:UPDATE_ERROR,msg:error.response.data.error},
          });
    }
  };
};

// export const updateRole = (_id,role,token) =>{
//     return async dispatch=>{
//         try {
//             dispatch({
//                 type:ACTION.LOADING
//             })
//             await axios.patch(`/users/update_role/${_id}`,{role},{headers:{Authorization:`Bearer ${token}`}})          
//             dispatch({
//                 type:ACTION.USER_UPDATE,
//                 payload:{id:ACTION.USER_UPDATE,msg:'Role updated successfully'}
//             })
//         } catch (error) { 
//             if(error.response.status===401){
//                 return dispatch({
//                     type:ACTION.LOGOUT,
//                     payload:''
//                 }) 
//             }
//             dispatch({
//                 type: ACTION.UPDATE_ERROR,
//                 payload: {id:ACTION.UPDATE_ERROR,msg:error.response.data.error}
//               });
//         }  
//     }
// }

export const getAllUsers = (token) => async (dispatch) =>{
    try{
        dispatch({type:USERS_LIST_LOADING})

        const {data} = await axios.get(`api/users/`,{headers:{Authorization:`Bearer ${token}`}})
        dispatch({
            type:USERS_LIST,
            payload:data.msg
        }) 
    }catch(error){
        if(error.response.status===401){
            return dispatch({type:LOGOUT}) 
        }
        dispatch({
            type:USERS_LIST_ERROR,
            payload:{id:USERS_LIST_ERROR,msg:error.response.data.error}
        }) 
    }
}

export const getUserById = (_id,token) => async (dispatch) =>{
    try{
        dispatch({type:USER_ITEM_LOADING})

        const {data} = await axios.get(`api/users/${_id}`,{headers:{Authorization:`Bearer ${token}`}})
        console.log(data.msg)
        dispatch({
            type:USER_ITEM,
            payload:data.msg
        }) 
    }catch(error){
        if(error.response.status===401){
            return dispatch({type:LOGOUT}) 
        }
        dispatch({
            type:USER_ITEM_ERROR,
            payload:{id:USER_ITEM_ERROR,msg:error.response.data.error}
        }) 
    }
}

export const updateUserItem = (_id,formData,token) => async (dispatch) =>{
    try{
        dispatch({type:USER_ITEM_UPDATE_LOADING})
        const {data} = await axios.patch(`/api/users/update_user/${_id}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        dispatch({
            type:USER_ITEM_UPDATE,
            payload:{id:USER_ITEM_UPDATE,msg:data.msg}
        }) 
    }catch(error){
        if(error.response.status===401){
            return dispatch({type:LOGOUT}) 
        }
        dispatch({
            type:USER_ITEM_UPDATE_ERROR,
            payload:{id:USER_ITEM_UPDATE_ERROR,msg:error.response.data.error}
        }) 
    }
}

