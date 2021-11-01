
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Navigation from './components/Navigation/Navbar';
import CustomSnackbar from './components/UI/customSnackBar';
import AdminShop from './pages/adminShop';
import Auth from './pages/auth';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Home from './pages/home';
import Order from './pages/order';
import ProductPage from './pages/product-page';
import Shop from './pages/shop';
import * as Actions from './store/actions/index';

function App(props) {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const closeNavbar = () => setIsNavbarOpen(false)

  useEffect(() =>{
    props.checkAuth()
    console.log(props.successMessage)


  },[])
  useEffect(()=>{
    console.log(props.successMessage)
    console.log('App Error',props.error)
  },[props.successMessage, props.error])
  let routes=(<Switch>
    <Route path="/" exact component={Home}></Route>
    <Route path="/shop" exact component={Shop}></Route>
    <Route path="/auth/signup" exact ><Auth isSignUp={true} isAdminAuth={false}/></Route>
    <Route path="/auth/signin" exact ><Auth isSignUp={false} isAdminAuth={false}/></Route>
    <Route path="/auth/admin/signup" exact ><Auth isSignUp={true} isAdminAuth={true}/></Route>
    <Route path="/auth/admin/signin" exact ><Auth isSignUp={false} isAdminAuth={true}/></Route>
    <Route path='/product/:id' exact><ProductPage /></Route>
    <Redirect to='/auth/signin' />
    </Switch>
  )
  if(props.isAuthenticated && (!props.isAdmin)){
    routes=(
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/shop" exact component={Shop}></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="/orders" exact component={Order}></Route>
      <Route path='/product/:id' exact><ProductPage /></Route>
      <Route path='/:uid/checkout' exact><Checkout /></Route>
      <Redirect to='/' />
      </Switch>
      )
  }
  if(props.isAuthenticated && (props.isAdmin)){
    console.log('Admin Authentication')

    routes=(<Switch>
    
      <Route path="/"  component={AdminShop}></Route>
      <Route path='/product/:id' exact><ProductPage /></Route>

      </Switch>)
  }
  return (
    <div className="App">
      <Navigation name={props.username} toggle={toggleNavbar} isOpen={isNavbarOpen}/>
      <main style={{marginTop:'8vh'}} onClick={closeNavbar}>
      {routes}
      </main>
      {
            props.successMessage?
            <>
            <CustomSnackbar type="success" message={props.successMessage} ></CustomSnackbar>
            </>:null
        }
        {
            props.error?
            <>
            <CustomSnackbar type="error" message={props.error} ></CustomSnackbar>
            </>:null
        }
    </div>
  );
}


const mapStateToProps = (state)=>{
  return {
    isAuthenticated:state.auth.isAuthenticated,
    isAdmin:state.auth.isAdmin,
    username:state.auth.user.name,
    successMessage:state.auth.successMessage,
    error:state.auth.error
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    checkAuth:()=>dispatch(Actions.checkAuth())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App) ;
