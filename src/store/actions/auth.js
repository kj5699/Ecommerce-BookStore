import * as actionTypes from './actionTypes';

const signUpStart =()=>{
    return{
        type: actionTypes.SIGNUP_START
    }       
}
const signUpSuccess =(userDetails)=>{
    return{
        type: actionTypes.SIGNUP_SUCCESS,
        ...userDetails
    }       
}
const signUpFailed =(err)=>{
    return{
        type: actionTypes.SIGNUP_FAILED,
        error:err
    }       
}

export const signUpInit =() =>{
    return{
        type:actionTypes.SIGNUP_INIT
    }
}

export const signInInit =() =>{
    return{
        type:actionTypes.SIGNIN_INIT
    }
}

const signInStart =()=>{
    return{
        type: actionTypes.SIGNIN_START
    }       
}
const signInSuccess =(userDetails)=>{
    return{
        type: actionTypes.SIGNIN_SUCCESS,
        ...userDetails
    }       
}
const signInFailed =(err)=>{
    return{
        type: actionTypes.SIGNIN_FAILED,
        error:err
    }       
}

export const signUp =(userData)=>{
    return dispatch=>{
        dispatch(signUpStart())
        const authData ={
            email:userData.email,
            password:userData.password,
        }
        //send request 

        const userDetails={
            ...userData,
            password:null,
            userId:Math.random(),
            token:Math.random()
        }
        dispatch(signUpSuccess(userDetails))
    }

}

export const signIn =(userData)=>{
    return dispatch=>{
        dispatch(signInStart())
        const authData ={
            email:userData.email,
            password:userData.password,
        }
        //send request 

        const userDetails={
            ...userData,
            password:null,
            userId:Math.random(),
            token:Math.random()
        }
        dispatch(signInSuccess(userDetails))
    }

}


export const logout=()=>{
    console.log('logout-action')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationTime')
    return {
        type:actionTypes.LOGOUT
    }
}
