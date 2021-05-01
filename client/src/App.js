import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {refreshToken,loadUser} from './redux/action/users'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Productscreen from './components/ProductScreen'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import Activateaccount from './components/Activateaccount'
import Shippingscreen from './components/Shippingscreen'
import Paymentscreen from './components/Payment'
import Placeorderscreen from './components/Placeorder'
import Orderscreen from './components/Orderdetails'
import Userslist from './components/Userlistscreen'
import Useredit from './components/UserEdit'
import Productlist from './components/Productlistscreen'
import Productedit from './components/ProductEdit'
import  Profilescreen from './components/Profile/profile'
import Createproduct from './components/Createproduct'

import './index.css'
import './bootstrap.min.css'

function App() {
  const {auth} = useSelector(state => state)
  const {token,isAuth,user} = auth

  const dispatch = useDispatch()

  useEffect(()=>{
    const logged = localStorage.getItem('loggedIn')
    if(logged === 'true'){
      dispatch(refreshToken())
      setTimeout(()=>{
        dispatch(refreshToken())
      },1000*60*9.5)
    }
  },[])

  useEffect(()=>{
    if(token){
      dispatch(loadUser(token))
    }
  },[token])

  



  return (
    <Router>
      <div className="app">
      <Navbar />
        <main>
         <Route path='/' component={Home} exact/>
         <Route  path='/product/:_id' component={Productscreen} exact/>
         <Route  path='/cart/:_id?' component={Cart} exact/>
         <Route path='/login' render={ (props)=>{
            const redirect=props.location.search.split('=')[1]
            return (redirect && isAuth) ? <Redirect to={`/${redirect}`} /> : isAuth ? <Redirect to='/users/profile' /> : <Login {...props} /> 
         }
         } />
         <Route exact path='/register'>{isAuth ? <Redirect to='/users/profile' /> : <Register />  }</Route>
         <Route exact path='/activate/:activation_token'>{isAuth ? <Redirect to='/profile' /> : <Activateaccount /> }</Route>
          <Route exact path='/users/profile' >{!isAuth ?  <Redirect to='/login' /> : <Profilescreen /> }</Route>
         <Route exact path='/shipping'>{isAuth ? <Shippingscreen />: <Redirect to='/login' />}</Route>
         <Route exact path='/payment' >{isAuth ? <Paymentscreen />: <Redirect to='/login' />  }</Route>
         <Route exact path='/placeorder'>{isAuth ? <Placeorderscreen/> : <Redirect to='/login' />  }</Route>
         <Route exact path='/order/:_id' >{isAuth ? <Orderscreen />: <Redirect to='/login' />  }</Route>
         <Route exact path='/admin/users/'>{(isAuth && user.isAdmin ) ? <Userslist />: isAuth ?  <Redirect to='/users/profile' /> : <Redirect to='/login' />  }</Route>
         <Route exact path='/admin/users/:_id'>{(isAuth && user.isAdmin ) ? <Useredit />: isAuth ?  <Redirect to='/users/profile' /> : <Redirect to='/login' />  }</Route>
         <Route exact path='/admin/products/'>{(isAuth && user.isAdmin ) ? <Productlist />: isAuth ?  <Redirect to='/users/profile' /> : <Redirect to='/login' />  }</Route>
         <Route exact path='/admin/products/edit/:_id'>{(isAuth && user.isAdmin ) ? <Productedit />: isAuth ?  <Redirect to='/profile' /> : <Redirect to='/login' />  }</Route>
         <Route exact path='/admin/products/create'>{(isAuth && user.isAdmin ) ? <Createproduct />: isAuth ?  <Redirect to='/profile' /> : <Redirect to='/login' />  }</Route>
  
        <Route />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
