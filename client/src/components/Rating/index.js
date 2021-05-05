import React from 'react'
import {FaStar,FaStarHalfAlt,FaRegStar} from 'react-icons/fa'
import Style from './rating.module.css'

function rating({value, size, editRating, setRating}) {

    return (
        <>
        {[1,2,3,4,5].map((val,i)=>{
           return <span 
           key={i} 
           className={Style.star}>
           {value>=val ? 
           <FaStar size={size ? size : 23} onClick={()=>{editRating && setRating(val)}} color={'rgb(255, 204, 0)'} /> 
           : 
           value >=val-0.5 ? 
           <FaStarHalfAlt size={size ? size : 23} onClick={()=>{editRating && setRating(val)}} color={'rgb(255, 204, 0)'} /> 
           : <FaRegStar size={size ? size : 23} onClick={()=>{editRating && setRating(val)}} /> }</span> 
        })}
        </>
    )
}

export default rating
