import * as actionTypes from '../actions/actionTypes';

const initialState={
    user:{},

    cart:{
        items:[]
    },
    cartValue:0,

    orders:[],

    cartUpdated:false,
    orderCreated:false,

    error:null,
    loading:false,
}

const reducer =(state =initialState,action)=>{
    switch(action.type){
        case (actionTypes.USER_INIT):
            const newUser={name:action.name,email:action.email, userId:action.userId}
            const newcartItems =action.cart? action.cart.items :[]
            return{...state, user:newUser, cart:{items:newcartItems}}

        case(actionTypes.ADD_TO_CART_START):
            return{...state, loading:true,error:null,cartUpdated:false}
        case(actionTypes.ADD_TO_CART_SUCCESS):
            let nvalue = 0;
            action.cart.items.forEach(p => {
            nvalue=nvalue+ (p.quantity*p.productId.price)});
            return{...state, loading:false,
                            error:null, 
                            cart:{items:action.cart.items},
                            cartUpdated:true,cartValue:nvalue}
        case(actionTypes.ADD_TO_CART_FAILED):
            return{...state, loading:false,error:action.error, cartUpdated:false}
        
        case(actionTypes.REMOVE_FROM_CART_START):
            return{...state, loading:true,error:null, cartUpdated:false}
        case(actionTypes.REMOVE_FROM_CART_SUCCESS):
            let uvalue = 0;
            action.cart.items.forEach(p => {
            uvalue=uvalue+ (p.quantity*p.productId.price)});
            return{...state, loading:false,error:null, 
                    cart:{items:action.cart.items},
                    cartUpdated:true, cartValue:uvalue}
        case(actionTypes.REMOVE_FROM_CART_FAILED):
            return{...state, loading:false,error:action.error,cartUpdated:false}
        
        case(actionTypes.GET_CART_START):
            return{...state, loading:true,error:null}
        case(actionTypes.GET_CART_SUCCESS):
            let value = 0;
            action.cart.items.forEach(p => {
                value=value+ (p.quantity*p.productId.price)});
     
            return{...state, loading:false,error:null, cart:{items:action.cart.items},cartValue:value}
        case(actionTypes.GET_CART_FAILED):
            return{...state, loading:false,error:action.error}
        
        case(actionTypes.CREATE_ORDER_INIT):
            return{...state, orderCreated:false}
        case(actionTypes.CREATE_ORDER_START):
            return{...state, loading:true,error:null}
        case(actionTypes.CREATE_ORDER_SUCCESS):
            return{...state, loading:false,error:null, orders:[...state.orders, action.order],orderCreated:true}
        case(actionTypes.CREATE_ORDER_FAILED):
            return{...state, loading:false,error:action.error}
        
        case(actionTypes.FETCH_ORDER_START):
            return{...state, loading:true,error:null}
        case(actionTypes.FETCH_ORDER_SUCCESS):
            return{...state, loading:false,error:null, orders:action.orders}
        case(actionTypes.FETCH_ORDER_FAILED):
            return{...state, loading:false,error:action.error}

        case(actionTypes.CANCEL_ORDER_START):
            return{...state, loading:true,error:null}
        case(actionTypes.CANCEL_ORDER_SUCCESS):
            return{...state, loading:false,error:null, orders:action.orders}
        case(actionTypes.CANCEL_ORDER_FAILED):
            return{...state, loading:false,error:action.error}

        


        
        
        
        
        
        
        
        default:
            return state

    }
}
export default reducer;