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
    isAuthenticated:false
}

const reducer =(state =initialState,action)=>{
    switch(action.type){
        case(actionTypes.SIGNUP_INIT):
            return {...state, isSignUp:true}
        case(actionTypes.SIGNUP_START):
            return {...state, loading:true}
        case(actionTypes.SIGNUP_FAILED):
            return {...state, loading:false, authError :action.error}
        case(actionTypes.SIGNUP_SUCCESS):
            return{...state, loading:false,isAuthenticated:true}
        case(actionTypes.SIGNIN_INIT):
            return {...state, isSignUp:false}
        case(actionTypes.SIGNIN_START):
            return {...state, loading:true}
        case(actionTypes.SIGNIN_FAILED):
            return {...state, loading:false, authError :action.error}
        case(actionTypes.SIGNIN_SUCCESS):
            return{...state, loading:false, isAuthenticated:true}
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