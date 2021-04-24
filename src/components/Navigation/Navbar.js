import React, { useState } from 'react';
import {VscMenu,FaSignInAlt ,FaUserPlus,BiLogOut} from 'react-icons/all';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Actions from '../../store/actions/index';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  
} from 'reactstrap';
import './Navbar.scss'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <>
      <Navbar className='navigation' expand="md">
        <NavbarBrand href="/">
            
            <h3>bookSTORE</h3>
            <sub>Designed and Devloped By Jatin Khemchandani</sub>
            
        </NavbarBrand>
            
        <NavbarToggler className='navbar-toggler' onClick={toggle}>
            <VscMenu color='white'></VscMenu>
        </NavbarToggler>
        <Collapse isOpen={isOpen} onClick={toggle} navbar>
        <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/">
                    <span>Home</span> 
              </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/shop">
                  <span>Shop</span> 
                </NavLink>
            </NavItem>
            
            <NavItem>
              
                  <span>|</span> 
            </NavItem>
            {!props.isAuthenticated?
            <>
            <NavItem>
            <NavLink to="/auth/signup">
                <FaUserPlus></FaUserPlus>
                <span>SignUp</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/auth/signin">
                <FaSignInAlt></FaSignInAlt>
                <span>SignIn</span>
            </NavLink>
          </NavItem>

          
          </>:
          <NavItem onClick={()=>props.onLogout()}>
          <NavLink to="#" > 
              <BiLogOut></BiLogOut>
              <span>Logout</span></NavLink>
          </NavItem>
          
          }
            
          </Nav>
        </Collapse>
      </Navbar>
    </>
    
  );
}
const mapStateToProps = (state)=>{
  return {
    isAuthenticated:state.auth.isAuthenticated
  }
}

const mapDispatchToProps=(dispatch) =>{
  return {
      onLogout : ()=>{
        console.log('logging out')
        dispatch(Actions.logout())},
      
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);