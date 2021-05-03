import React from 'react';
import Button from '../UI/Button';
import AuthInput from './AuthInput';
import './AuthForm.scss'
import { NavLink } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';

const AuthForm = props => {
    
    let formElements=[];
    let inputKey;
    for (inputKey in props.formState.inputs){
        
        formElements.push(
            {...props.formState.inputs[inputKey],id:inputKey}
        )
    }
    
    return (
        <div className="authPage">
            <div className="authHeader">
                
               {props.isSignUp ?
               <span>
                {props.isAdminAuth? <h3>Admin</h3>:null}
                <h3><FaSignInAlt />{' '}SignUp</h3>
                <p>Already have a account? <NavLink to={props.isAdminAuth?'/auth/admin/signin':'/auth/signin'} >SignIn</NavLink></p> 
                </span>
            :
            <span>
                {props.isAdminAuth? <h3>Admin</h3>:null}
                <h3><FaUserPlus />{' '}SignIn</h3>
                <p>Already have a account? <NavLink to={props.isAdminAuth?'/auth/admin/signup':'/auth/signup'} >SignUp</NavLink></p> 
            </span>}

            </div>
            {props.loading?
            <div className="authForm">
            <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" /></div>
            :
            <form className="authForm">
                {
                    formElements.map(inputKey =>
                    <AuthInput key={inputKey.id} label={inputKey.label}
                    placeholder={inputKey.placeholder}
                    id={inputKey.id}
                    type={inputKey.type}
                    onInput={props.inputHandler}
                    element={inputKey.element}
                    validation={inputKey.validation}
                    isValid={inputKey.isValid}
                    value={inputKey.value}
                    />)
                }
                {props.error && props.error.data&& <p className="errorMessage">{props.error.data["message"]}</p>}
            <Button disabled={!props.formState.isValid} onClick={props.submitHandler} type='submit' >Submit</Button>
        {!props.isAdminAuth?<p className="googleSignin">
            <a href="http://localhost:5000/auth/google/" class="button">
            <div>
            <span class="svgIcon t-popup-svg">
              <svg
                class="svgIcon-use"
                width="25"
                height="37"
                viewBox="0 0 25 25"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
                    </span>
                    <span class="button-label">Sign in with Google</span>
                </div>
                </a>
            </p>:null}
            
            </form>}

        
        </div>
    )
}

const mapStateToProps= (state)=>{
    return{
        loading :state.auth.loading,
        error:state.auth.error
    }
}

export default  connect(mapStateToProps,null)(AuthForm)
