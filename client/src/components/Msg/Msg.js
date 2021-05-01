import './msg.css'
import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'

function Msg({type,msg,display,setdisplay}) {

    return (
        <div className="msg-box">
           {display && <p className={type || ''}>{msg} <MdClear onClick={setdisplay} className="clear" /></p>} 
        </div>
    )
}
export default Msg
