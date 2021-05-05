import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { resetPassword } from '../../redux/action/users';


const Resetpass = ({match}) => {
  const [formData, setFormData] = useState({ password: '', cf_password: '' });
  const [display, setDisplay] = useState(true);
  const [submitMsg, setSubmitMsg] = useState({ });

  const dispatch = useDispatch();
  const {loading,message} = useSelector((state) => state.auth);

  useEffect(()=>{
     if(/PASS_RESET_ERROR/.test(message.id))return setSubmitMsg({type:'error',msg:message.msg})
     if(/PASS_RESET/.test(message.id))return setSubmitMsg({type:'success',msg:message.msg})
  },[message])

  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

   const formSubmitHandler = (ev) => {
    
    ev.preventDefault();
    setDisplay(true);
    setSubmitMsg({});
    let passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(
        !formData.password ||
        !formData.cf_password
    )return setSubmitMsg({type:'error',msg:'Please fill out all fields'});

    if (formData.password !== formData.cf_password)
      return setSubmitMsg({type:'error',msg:"Passwords don't match" });

    if (!passRegex.test(formData.password))
      return setSubmitMsg({type:'error',msg:"Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
      });

      dispatch(resetPassword({password:formData.password,forgotPassToken:match.params._id}))
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
      <h1>Forgot Password</h1>
      <Form onSubmit={formSubmitHandler}>
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
          ></Form.Control>
          </Form.Group>
          <Row>
              <Col>
              <Button type='submit' className='btn btn-dark'>
             SUBMIT
            </Button>
              </Col>
              <Col className="text-center">
                  <Link to='/login'>LOGIN</Link>
              </Col>
          </Row>
            
      </Form>
    </Container>
    </>
    }
    </>
  );
};

export default Resetpass;
