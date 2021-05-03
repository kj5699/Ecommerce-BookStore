import axios from 'axios';
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
const userInitialize =(userData)=>{
    return{
        type:actionTypes.USER_INIT,
        name:userData.name,
        email:userData.email,
        userId:userData.userId,
        cart:userData.cart,

    }
}

export const signUp = (userData,isAdminAuth)=>{
    return (async dispatch=>{
        dispatch(signUpStart())
        const authData ={
            name:userData.name,
            email:userData.email,
            password:userData.password,
        }
        const URL = isAdminAuth ?
                    'http://localhost:5000/api/user/admin/signup':
                    'http://localhost:5000/api/user/signup';
        try{
            const response= await axios.post(URL,authData)
            // console.log(response.data)
            const expirationTime= new Date(new Date().getTime() + (60 * 60 *1000))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('expirationTime', expirationTime)
            localStorage.setItem('isAdmin', response.data.isAdmin)
            // console.log(response.data)
            
            dispatch(signUpSuccess(response.data))
            if(!response.data.isAdmin){
                const userData={
                    name: response.data.name,
                    email: response.data.email,
                    userId: response.data.userId,
                    cart: response.data.cart,
                }
                dispatch(userInitialize(userData))
            }
            




            
        }catch(err){
            console.log(err);
            dispatch(signUpFailed(err))
        }
    })

}

export const signIn =(userData,isAdminAuth)=>{
    return async dispatch=>{
        dispatch(signInStart())
        const authData ={
            email:userData.email,
            password:userData.password,
        }
        //send request 
        const URL = isAdminAuth ?
                    'http://localhost:5000/api/user/admin/login':
                    'http://localhost:5000/api/user/login';
        try{
            const response= await axios.post(URL,authData)
            const expirationTime= new Date(new Date().getTime() + (60 * 60 *1000))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('expirationTime', expirationTime)
            localStorage.setItem('isAdmin', response.data.isAdmin)
            
            // console.log(response.data)
            dispatch(signInSuccess(response.data))
            if(!response.data.isAdmin){
                const userData={
                    name: response.data.name,
                    email: response.data.email,
                    userId: response.data.userId,
                    cart: response.data.cart,
                }
                dispatch(userInitialize(userData))
            }
        }catch(err){
            console.log(err.response);
            dispatch(signInFailed(err.response))
        }
    }

}


export const logout=()=>{
    console.log('logout-action')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('isAdmin')
    return {
        type:actionTypes.LOGOUT
    }
}

const getUserById = (userId,token ,isAdmin)=>{
    return async dispatch=>{
        const URL= isAdmin==="true" ?`http://localhost:5000/api/user/admin/${userId}`:
                            `http://localhost:5000/api/user/${userId}`
        console.log(isAdmin)
        try{
            console.log('sending request to' ,URL)
            const response = await axios.get(URL)
            dispatch(signInSuccess({...response.data,token:token}))
            if(!response.data.isAdmin){
                const userData={
                    name: response.data.name,
                    email: response.data.email,
                    userId: response.data.userId,
                    cart: response.data.cart,
                }
                dispatch(userInitialize(userData))
            }
            
        }catch(err){
            console.log(err)
            dispatch(signInFailed(err))
        }
    }
}

export const checkAuth =()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        if(!token){
            return
        }else if(new Date(localStorage.getItem('expirationTime')) <= new Date()){
            
            dispatch(logout())
        }else{
            const userId = localStorage.getItem('userId')
            const isAdmin=localStorage.getItem('isAdmin')
            console.log(userId,isAdmin)
            dispatch(getUserById(userId,token,isAdmin))
        }
    }
}

