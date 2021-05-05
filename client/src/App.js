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
import  Profilescreen from './components/Profile/profile'
import CreateAndEditproduct from './components/Create&Editproduct'
import OrdersList from './components/OrderList'
import {loadProducts} from './redux/action/products'
import ResetPass from './components/Resetpass/resetPass'
import ForgotPass from './components/Forgotpass/forgotPass'
import './index.css'
import './bootstrap.min.css'

function App() {
  const {auth} = useSelector(state => state)
  const {token,isAuth,isAdmin} = auth

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


  useEffect(()=>{
    dispatch(loadProducts())
},[dispatch])


  return (
    <Router>
      <div className="app">
      <Navbar />
        <main>
         <Route path='/' component={Home} exact/>
         <Route  path='/product/:_id' component={Productscreen} exact/>
         <Route  path='/cart/:_id?' component={Cart} exact/>
         <Route  path='/forgot_pass' component={ForgotPass} exact/>
         <Route  path='/reset_pass/:_id' component={ResetPass} exact/>
         <Route path='/login' render={ (props)=>{
            const redirect=props.location.search.split('=')[1]
            return (redirect && isAuth) ? <Redirect to={`/${redirect}`} /> : isAuth ? <Redirect to='/users/profile' /> : <Login {...props} /> 
         } 
         } />
         <Route exact path='/register'>{isAuth ? <Redirect to='/users/profile' /> : <Register />  }</Route>
         <Route exact path='/activate/:activation_token' render={props=>isAuth ? <Redirect to='/profile' /> : <Activateaccount {...props} /> }/>
          <Route exact path='/users/profile' >{!isAuth ?  <Redirect to='/login' /> : <Profilescreen /> }</Route>
         <Route exact path='/shipping' render={props=>isAuth ? <Shippingscreen {...props} />: <Redirect to='/login' />}></Route>
         <Route exact path='/payment' render={props=>isAuth ? <Paymentscreen {...props} />: <Redirect to='/login' /> } />
         <Route exact path='/placeorder' render={props=>isAuth ? <Placeorderscreen {...props}/> : <Redirect to='/login' />  }/>
         <Route exact path='/order/:_id' render={props =>isAuth ? <Orderscreen {...props} />: <Redirect to='/login' />  } />
         <Route exact path='/admin/orders' render={props =>(isAuth && isAdmin ) ? <OrdersList {...props} /> : isAuth ? <Redirect to='/users/profile' /> : <Redirect to='/login' />  } />
         <Route exact path='/admin/users/'>{isAdmin ? <Userslist />: <Redirect to='/login?redirect=admin/users/' />  }</Route>
         <Route exact path='/admin/users/edit/:_id' render={props=>isAdmin ? <Useredit {...props} /> : <Redirect to='/login?redirect=admin/users/' />  }/>
         <Route exact path='/admin/products/'>{ isAdmin  ? <Productlist /> : <Redirect to='/login?redirect=admin/products/' />  }</Route>
         <Route exact path='/admin/products/create' render={props=> isAdmin ? <CreateAndEditproduct {...props} /> : <Redirect to='/login?redirect=admin/products/create' />  } />
         <Route exact path='/admin/products/edit/:_id' render={props=> isAdmin ? <CreateAndEditproduct {...props} />: <Redirect to={`/login?redirect=admin/products/edit/${props.match.params._id}`} />  } />
        <Route />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
