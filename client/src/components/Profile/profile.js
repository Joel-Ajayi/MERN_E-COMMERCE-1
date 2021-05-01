import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {AiFillCamera} from 'react-icons/ai'
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { updateUser,updateAvatar,loadUser} from '../../redux/action/users';
import Styles from './profile.module.css'

const Profile = () => {
  const [formData, setFormData] = useState({ fName:'', lName:'',password: '', cf_password:'' });
  const [display, setDisplay] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ });

  const dispatch = useDispatch();
  const {loading,message,user,token} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(/USER_UPDATE/.test(message.id))setSubmitMsg({type:'success',msg:message.msg})
     if(/UPDATE_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
  },[message])

  const formChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatar = async (ev) => {
    ev.preventDefault();
    setDisplay(true)
    setSubmitMsg({ });

    let avatar = ev.target.files[0];
    if (!avatar) return setSubmitMsg({ type:'error',msg:"No file was uploaded"});

    if (avatar.type !== "image/jpeg" && avatar.type !== "image/png") {
      return setSubmitMsg({ type:'error',msg:"Incorrect file format"});
    }

    if (avatar.size > 1024 * 1024)
      return setSubmitMsg({ tyep:'error', msg: "file is more than 1mb"});

    let formData = new FormData();
    formData.append("avatar", avatar);
    await dispatch(updateAvatar(formData, token));
    await dispatch(loadUser(token));
  };


//   const handleDelete= async (_id)=>{
//     await dispatch(deleteUser(_id,token))
//     await dispatch(loadUser(token));
//   }

   const formSubmitHandler = async (ev) => {
    
    ev.preventDefault();
    setDisplay(true);
    setSubmitMsg({});

    let passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(
        !formData.lName &&
        !formData.fName &&
        !formData.password 
    )return setSubmitMsg({type:'error',msg:'No updates were made'});
    
    if(formData.password){
        if (formData.password !== formData.cf_password)
        return setSubmitMsg({type:'error',msg:"Passwords don't match" });
  
      if (!passRegex.test(formData.password))
        return setSubmitMsg({type:'error',msg:"Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
        });
  
    }

    const { fName, lName, password } = formData;
    await dispatch(updateUser({ fName, lName, password }, token));
    await dispatch(loadUser(token));
    
  };

  return (
    <>
    {loading ? <Loader /> : user && 
    <>
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
      <Container style={{padding:'20px 5%'}} fluid>
     
    <Row>
    <Col md={3}>
      <h1>User Profile</h1>
      <div className={Styles.Profile_pic_container}>
      <Image className={Styles.profile_pic} src={user.avatar} />
      <Form>
      <Form.Group className={Styles.profile_pic_update}>
          <Form.File
            name='avatar'
            onChange={handleAvatar}
          /><AiFillCamera size={30} color={"black"} />
        </Form.Group>
        </Form>
      </div>
     
      <Form onSubmit={formSubmitHandler}>
      <Form.Group>
          <Form.Label>First Name :</Form.Label>
          <Form.Control
            name='fName'
            type='text'
            defaultValue={user.fName}
            placeholder='Enter first name'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name :</Form.Label>
          <Form.Control
            name='lName'
            type='text'
            defaultValue={user.lName}
            placeholder='Enter last name'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email :</Form.Label>
          <Form.Control
            name='email'
            type='email'
            defaultValue={user.email}
            placeholder='Enter email'
            onChange={formChangeHandler}
            disabled
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password :</Form.Label>
          <Form.Control
            name='password'
            type="password"
            placeholder='Enter password'
            onChange={formChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password :</Form.Label>
          <Form.Control
            name='cf_password'
            type="password"
            placeholder='Confirm password'
            onChange={formChangeHandler}
          />
        </Form.Group>

            <Button type='submit' className='btn btn-dark'>
              UPDATE
            </Button> 
      </Form>
    </Col>
    <Col md={9}>
hello
    </Col>
    
    </Row>
    </Container>
    </>
    }
    </>
  );
};

export default Profile;

