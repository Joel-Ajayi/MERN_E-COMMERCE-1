import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { forgotPassword } from '../../redux/action/users';

const ForgotPass = () => {
    const [formData, setFormData] = useState({email:'' });
  const [display, setDisplay] = useState(true);
  const [submitMsg, setSubmitMsg] = useState({ });

  const dispatch = useDispatch();
  const {loading,message} = useSelector((state) => state.auth);

  useEffect(()=>{
     if(/FORGOT_PASS_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
     if(/FORGOT_PASS/.test(message.id))setSubmitMsg({type:'success',msg:message.msg})
  },[message])

  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmitHandler = (ev) => {
    
    ev.preventDefault();
    setDisplay(true);
    setSubmitMsg({});
    if(!formData.email)return setSubmitMsg({type:'error',msg:'Please fill out all fields'});
    dispatch(forgotPassword(formData));
  };

    return (
        <>
        {loading ? <Loader /> :
         <>
         {submitMsg.msg && <Msg
                  type={submitMsg.type}
                  setdisplay={() => setDisplay(false)}
                  display={display}
                  msg={submitMsg.msg}
         />}
        <div style={{padding:'2% 10.5%'}}>
        <Link to='/login' className="btn btn-dark">Go BACK</Link>
        <Form onSubmit={formSubmitHandler}>
        <h1>Forgot Pass</h1>
        <Form.Group>
          <Form.Label>Email :</Form.Label>
          <Form.Control
            name='email'
            type='email'
            value={formData.email}
            placeholder='Enter email'
            onChange={formChangeHandler}
          />
        </Form.Group>

            <Button type='submit' className='btn btn-dark'>
            SUBMIT
            </Button>
      </Form>
        </div>
        </>
        }
        </>
    )
}

export default ForgotPass
