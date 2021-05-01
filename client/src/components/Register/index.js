import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { register } from '../../redux/action/users';


const Login = () => {
  const [formData, setFormData] = useState({ fName:'', lName:'', email: '', password: '', cf_password:'' });
  const [display, setDisplay] = useState(true);
  const [submitMsg, setSubmitMsg] = useState({ });

  const dispatch = useDispatch();
  const {loading,message} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(/REGISTER_SUCCESS|ACTIVATION_SUCCESS/.test(message.id))setSubmitMsg({type:'success',msg:message.msg})
     if(/REGISTER_ERROR|ACTIVATION_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
  },[message])

  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

   const formSubmitHandler = (ev) => {
    
    ev.preventDefault();
    setDisplay(true);
    setSubmitMsg({});

    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(
        !formData.email||
        !formData.fName ||
        !formData.lName || 
        !formData.password ||
        !formData.cf_password
    )return setSubmitMsg({type:'error',msg:'Please fill out all fields'});

    if (!emailRegex.test(formData.email))
      return setSubmitMsg({ type:'error',msg: "invalid email" });

    if (formData.password !== formData.cf_password)
      return setSubmitMsg({type:'error',msg:"Passwords don't match" });

    if (!passRegex.test(formData.password))
      return setSubmitMsg({type:'error',msg:"Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
      });

    const { fName, lName, email, password } = formData;
    dispatch(register({ fName, lName, email, password }));
  };

  return (
    <>
     {loading && <Loader />}
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={formSubmitHandler}>
       <Row >
         <Col md={6}>
         <Form.Group>
          <Form.Label>First Name :</Form.Label>
          <Form.Control
            name='fName'
            type='text'
            value={formData.fName}
            placeholder='Enter first name'
            onChange={formChangeHandler}
          />
        </Form.Group>
         </Col>

         <Col md={6}>
         <Form.Group>
          <Form.Label>Last Name :</Form.Label>
          <Form.Control
            name='lName'
            type='text'
            value={formData.lName}
            placeholder='Enter last name'
            onChange={formChangeHandler}
          />
        </Form.Group>
         </Col>
       </Row>

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

        <Form.Group>
          <Form.Label>Confirm Password :</Form.Label>
          <Form.Control
            name='cf_password'
            type="password"
            value={formData.cf_password}
            placeholder='Confirm password'
            onChange={formChangeHandler}
          />
        </Form.Group>

            <Button type='submit' className='btn btn-dark'>
              REGISTER
            </Button> 

        <p><br />Already Have An Account ? <Link to="/login">Login</Link></p>
      </Form>
    </Container>
    </>
  );
};

export default Login;
