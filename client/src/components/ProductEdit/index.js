import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { getUserById, updateUserItem } from '../../redux/action/users';


const UserEdit = ({match,history}) => {
  const [formData, setFormData] = useState({ fName:'', lName:'', email: '', isAdmin:false });
  const [display, setDisplay] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ });

  const dispatch = useDispatch();
  const _id = match.params._id
  const {users,auth} = useSelector((state) => state);
  const {message,loading,userItem} = users
  const {token,user} = auth
  

  useEffect(()=>{
    if(!user.isAdmin){
        history.push(`/users/profile`)
    }
  },[user,history])

  useEffect(()=>{
    if(/USER_ITEM_UPDATE/.test(message.id))setSubmitMsg({type:'success',msg:message.msg})
     if(/USER_ITEM_ERROR|USER_ITEM_UPDATE_ERROR/.test(message.id))setSubmitMsg({type:'error',msg:message.msg})
  },[message])

  useEffect(()=>{
    setDisplay(true);
    dispatch(getUserById(_id,token))
    setFormData({fName:userItem.fName,lName:userItem.lName,isAdmin:userItem.isAdmin})
  },[_id,dispatch])

  const formChangeHandler = (ev) => {
    console.log(formData)
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

   const formSubmitHandler = (ev) => {
    ev.preventDefault();
    setDisplay(true);
    setSubmitMsg({});
    dispatch(updateUserItem(_id,formData,token));
  };

  return (
    <>
     { loading ? <Loader /> :
         <>
     {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
     />}
     <Link to="/admin/users" className="btn btn-dark">Go Back</Link>
     {userItem &&
        <Container>
     
      <h1>Edit User</h1>
      <Form onSubmit={formSubmitHandler}>
       <Row >
         <Col md={6}>
         <Form.Group>
          <Form.Label>First Name :</Form.Label>
          <Form.Control
            name='fName'
            type='text'
            defaultValue={formData.fName}
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
            defaultValue={formData.lName}
            placeholder='Enter last name'
            onChange={formChangeHandler}
          />
        </Form.Group>
         </Col>
       </Row>

        <Form.Group>
          <Form.Check 
            type="checkbox"
            lable="Is Admin"
            checked={formData.isAdmin}
            onChange={(ev)=>setFormData({...formData,isAdmin:ev.target.checked})}
            >
          </Form.Check>
        </Form.Group>

        <Button type='submit' className='btn btn-dark'>
              UPDATE
        </Button> 

        <p><br />Already Have An Account ? <Link to="/login">Login</Link></p>
      </Form>
    </Container>
     }
    
    </>
     }
    </>
  );
};

export default UserEdit;
