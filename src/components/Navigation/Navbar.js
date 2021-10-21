import React, { useState } from 'react';
import {VscMenu,FaSignInAlt ,FaUserPlus,BiLogOut, BiUserCircle, AiOutlineShoppingCart} from 'react-icons/all';
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
  Button,
  
} from 'reactstrap';
import './Navbar.scss';
import ModalComponent from '../UI/Modal';



const Navigation = (props) => {

  const [modalOpen,setmodalOpen]=useState(false)

  const onClickedLogout = ()=>{
    props.onLogout();
    setmodalOpen(false);

  }
  const toggleLogout = ()=>{
    setmodalOpen(prevState=>!prevState)
  }

  

  return (
      <>

      {modalOpen && <ModalComponent
      opened={modalOpen} 
      toggle={toggleLogout}
      header={'Confirm Logoout'}
      footer={<>
              <Button color="primary" onClick={onClickedLogout}>LogOut</Button>
              <Button color="secondary" onClick={toggleLogout}>Cancel</Button>
              </>}
      >Do you want to logout ?</ModalComponent>}
      <Navbar className='navigation' expand="md">
        <NavbarBrand href="/">
            
            <h3>bookSTORE</h3>
            <sub>Designed and Devloped By Jatin Khemchandani</sub>
            
        </NavbarBrand>
            
        <NavbarToggler className='navbar-toggler' onClick={props.toggle}>
            <VscMenu color='white'></VscMenu>
        </NavbarToggler>
        <Collapse isOpen={props.isOpen} onClick={props.toggle} navbar>
        <Nav className="ml-auto" navbar>
            {!(props.isAdmin&& props.isAuthenticated)?
            <>
            <NavItem>
              <NavLink to="/">
                    <span>Home</span> 
              </NavLink>
            </NavItem>
            {/* <NavItem>
                <NavLink to="/shop">
                  <span>Shop</span> 
                </NavLink>
            </NavItem> */}
            </>:
            <NavItem>
            <NavLink to="/">
              <span>Admin Shop</span> 
            </NavLink>
            </NavItem>

            }
            {props.isAuthenticated&& (!props.isAdmin)?
            <>
             <NavItem>
             <NavLink to="/cart">
               <AiOutlineShoppingCart style={{height:'1.5rem',width:'1.5rem'}} />
             </NavLink>
             </NavItem>
             <NavItem>
             <NavLink to="/orders">
               {/* <AiOutlineShoppingCart style={{height:'1.5rem',width:'1.5rem'}} /> */}
               My Orders
             </NavLink>
             </NavItem>
             </>

            :null
            }
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
          {/* <NavItem>
            <NavLink to="/auth/admin/signin">
                <FaSignInAlt></FaSignInAlt>
                <span> Admin SignIn</span>
            </NavLink>
          </NavItem> */}

          
          </>:
          <>
          <NavItem>
            <NavLink to='#'>
                <BiUserCircle />
                <span>Hi {props.user.name.split(' ')[0] || props.user.name}</span>
            </NavLink>
          </NavItem>
          <NavItem onClick={()=>{setmodalOpen(true)}}>
          <NavLink to="#" > 
              <BiLogOut></BiLogOut>
              <span>Logout</span></NavLink>
          </NavItem>
          </>
          }
            
          </Nav>
        </Collapse>
      </Navbar>
    </>
    
  );
}
const mapStateToProps = (state)=>{
  return {
    isAuthenticated:state.auth.isAuthenticated,
    isAdmin:state.auth.isAdmin,
    user:state.auth.user
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