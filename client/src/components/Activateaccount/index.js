/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams,Redirect } from 'react-router-dom'
import {activateAccount} from '../../redux/action/users'
import {useDispatch} from 'react-redux'
import './activation.css'


function Activateaccount() {
  
    const dispatch = useDispatch()
    const {activation_token}= useParams()

    useEffect(()=>{
        dispatch(activateAccount({activation_token}))
    },[activation_token])
   
    return (
        <>
        <Redirect to="/register" />
        </>
    )
}

export default Activateaccount
