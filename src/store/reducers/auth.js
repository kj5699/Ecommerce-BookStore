import * as actionTypes from '../actions/actionTypes';

const initialState={
    user:{
        token : null,
        userId: null,
        name: '',
        email: '',
    },
    isSignUp:false,
    error:null,
    SignInRedirectPath:'/',
    isAuthenticated:false,
    isAdmin:false,
    loading:false,
    successMessage: null
}

const reducer =(state =initialState,action)=>{
    switch(action.type){
        case(actionTypes.SIGNUP_INIT):
            return {...state, isSignUp:true,successMessage:null}
        case(actionTypes.SIGNUP_START):
            return {...state, loading:true,successMessage:null}
        case(actionTypes.SIGNUP_FAILED):
            return {...state, loading:false, 
                error :action.error}
        case(actionTypes.SIGNUP_SUCCESS):
            const newUser=action.isAdmin ? {...state.user, 
                token: action.token,
                userId: action.userId,
                name:action.name,
                email:action.email,
            }:{...state.user, 
                token: action.token,
                userId: action.userId,
                name:action.name,
                email:action.email,
                cart:action.cart
            }
            return{...state, 
                loading:false,
                isAuthenticated:true, 
                user:newUser,
                error:null,
                isAdmin:action.isAdmin,successMessage:action.message}
        
        case(actionTypes.SIGNIN_INIT):
            return {...state, isSignUp:false,successMessage:null}
        case(actionTypes.SIGNIN_START):
            return {...state, loading:true,successMessage:null}
        case(actionTypes.SIGNIN_FAILED):
            return {...state, loading:false, error : action.error}
        case(actionTypes.SIGNIN_SUCCESS):
            // console.log(action)
            const loggedInUser= action.isAdmin ? {...state.user, 
                token: action.token,
                userId: action.userId,
                name:action.name,
                email:action.email,
            }:
            {...state.user, 
                token: action.token,
                userId: action.userId,
                name:action.name,
                email:action.email,
                cart:action.cart 
            }
            return{...state, loading:false, 
                    isAuthenticated:true, 
                    user:loggedInUser,
                    error:null,
                    isAdmin:action.isAdmin, successMessage:action.message}
        case(actionTypes.LOGOUT):
            console.log('logout reducer')
            const user={
                token : null,
                userId: null,
                name: '',
                email: '',
            }
            return{...state,user:user, isAuthenticated:false,error:null }
        
        
            

        default:
            return state
    }
}
export default reducer