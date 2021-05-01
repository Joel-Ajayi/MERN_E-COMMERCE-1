import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { login } from '../../redux/action/users';


const Login = ({location}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [display, setDisplay] = useState(true);
  const [submitMsg, setSubmitMsg] = useState({ });

  const dispatch = useDispatch();
  const {loading,message} = useSelector((state) => state.auth);

  useEffect(()=>{
     if(/LOGIN_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
  },[message])

  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

   const formSubmitHandler = (ev) => {
    
    ev.preventDefault();
    setDisplay(true);
    setSubmitMsg({});
    if(!formData.email||!formData.password)return setSubmitMsg({type:'error',msg:'Please fill out all fields'});
    dispatch(login(formData));
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
    <Container>
      <h1>Sign In</h1>
      <Form onSubmit={formSubmitHandler}>
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

        <Form.Group>
          <Form.Label>Password :</Form.Label>
          <Form.Control
            name='password'
            type="password"
            value={formData.password}
            placeholder='Enter password'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Row> 
          <Col xs={6}>
            <Button type='submit' className='btn btn-dark'>
              Sign In
            </Button>
          </Col> 
          <Col xs={6} className="text-right"> 
              <Link to="/forgot_pass">Forgot Password ?</Link>
         </Col> 
        </Row> 

        <p><br />New Customer ? <Link to="/register">Register</Link></p>
      </Form>
    </Container>
    </>
    }
    </>
  );
};

export default Login;
