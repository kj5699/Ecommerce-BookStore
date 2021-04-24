
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Navigation from './components/Navigation/Navbar';
import Auth from './pages/auth';
import Home from './pages/home';
import Shop from './pages/shop';

function App(props) {
  let routes=(<Switch>
    <Route path="/" exact component={Home}></Route>
    <Route path="/shop" exact component={Shop}></Route>
    <Route path="/auth/signup" exact ><Auth isSignUp={true}/></Route>
    <Route path="/auth/signin" exact ><Auth isSignUp={false}/></Route>
    <Redirect to='/' />
    </Switch>
  )
  if(props.isAuthenticated){
    routes=(<Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/shop" exact component={Shop}></Route>
      <Redirect to='/' />
      </Switch>)
  }
  return (
    <div className="App">
      <Navigation />
      <main style={{marginTop:'8vh'}}>
      {routes}
      </main>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {
    isAuthenticated:state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps,)(App) ;
