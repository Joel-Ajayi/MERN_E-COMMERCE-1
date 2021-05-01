import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineCheck, AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdClear} from 'react-icons/md'
import { Link } from 'react-router-dom';
import Msg from '../Msg/Msg';
import Loader from '../Loader/Loader'
import { getAllUsers, deleteUser } from '../../redux/action/users';

const Userlist = () => {
    const [display, setDisplay] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ });
 
    const users = useSelector(state => state.users)
    const {usersList,loading} = users
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(/USERS_LIST_ERROR|UPDATE_ERROR/.test(users.message.id))setSubmitMsg({type:'error',msg:users.message.msg})
        if(/USER_DELETE/.test(users.message.id))setSubmitMsg({type:'success',msg:users.message.msg})
     },[users.message])

    useEffect(()=>{
        dispatch(getAllUsers(token))
    },[token,dispatch,users.message])
    
    const userDelete=(_id) =>{
        setDisplay(true)
        dispatch(deleteUser(_id,token))
    }
    return (
        <div style={{padding:'2% 5%'}}>
        <h1>Users</h1>
        { loading ? <Loader /> :
         <>
           {submitMsg.msg && <Msg
              type={submitMsg.type}
              setdisplay={() => setDisplay(false)}
              display={display}
              msg={submitMsg.msg}
              />
            }
            {usersList.length !==0 &&
            <Table hover striped bordered responsive className="text-center">
               <thead className="bg-dark text-light">
               <tr>
               <th>ID</th>
                   <th>NAME</th>
                   <th>EMAIL</th>
                   <th>ADMIN</th>
                   <th></th>
               </tr>
               </thead>

               <tbody>
               {usersList.map((user,i)=>(
                <tr key={i}>
                  <td>{user._id}</td>
                  <td>{user.fName} {user.lName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? <AiOutlineCheck color='green' /> : <MdClear color='red' /> }</td>
                  <td><Link to={`/admin/users/edit/${user._id}`} ><AiFillEdit  color='green'/></Link> | <AiFillDelete  onClick={()=>userDelete(user._id)}  color='red' /> </td>
                </tr>
               ))}
                   
               </tbody>
              </Table>
            }
            </>
        }
          
        </div>
    )
}

export default Userlist
