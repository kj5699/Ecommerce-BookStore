import React from 'react';
import Button from '../UI/Button';
import AuthInput from './AuthInput';
import './AuthForm.scss'
import { NavLink } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const AuthForm = props => {
    let formElements=[];
    let inputKey;
    for (inputKey in props.formState.inputs){
        
        formElements.push(
            {...props.formState.inputs[inputKey],id:inputKey}
        )
    }
    console.log(props.formState.isValid)
    return (
        <div className="authPage">
            <div className="authHeader">
                
               {props.isSignUp ?
               <span>
                <h3><FaSignInAlt />{' '}SignUp</h3>
                <p>Already have a account? <NavLink to='/auth/signin' >SignIn</NavLink></p> 
                </span>
            :
            <span>
                <h3><FaUserPlus />{' '}SignIn</h3>
                <p>Already have a account? <NavLink to='/auth/signup' >SignUp</NavLink></p> 
            </span>}

            </div>
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
                    />)
                }
                <Button disabled={!props.formState.isValid} onClick={props.submitHandler} type='submit' >Submit</Button>
            </form>
        </div>
    )
}

export default AuthForm
