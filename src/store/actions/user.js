import axios from 'axios';
import * as actionTypes from './actionTypes';

const addToCartStart=()=>{
    return{
        type: actionTypes.ADD_TO_CART_START
    }
}

const addToCartSuccess=(cart)=>{
    return{
        type: actionTypes.ADD_TO_CART_SUCCESS,
        cart:cart
    }
}
const addToCartFailed=(err)=>{
    return{
        type: actionTypes.ADD_TO_CART_FAILED,
        error:err
    }
}
const removeFromCartStart=()=>{
    return{
        type: actionTypes.REMOVE_FROM_CART_START
    }
}
const removeFromCartSuccess=(cart)=>{
    return{
        type: actionTypes.REMOVE_FROM_CART_SUCCESS,
        cart:cart
    }
}
const removeFromCartFailed=(err)=>{
    return{
        type: actionTypes.REMOVE_FROM_CART_FAILED,
        error:err
    }
}

const getCartStart=()=>{
    return{
        type: actionTypes.GET_CART_START
    }
}
const getCartSuccess=(cart)=>{
    return{
        type: actionTypes.GET_CART_SUCCESS,
        cart:cart
    }
}
const getCartFailed=(err)=>{
    return{
        type: actionTypes.GET_CART_FAILED,
        error:err
    }
}

const fetchOrderStart=()=>{
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}
const fetchOrderSuccess=(orders)=>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}
const fetchOrderFailed=(err)=>{
    return{
        type: actionTypes.FETCH_ORDER_FAILED,
        error:err
    }
}

export const createOrderInit=()=>{
    return{
        type: actionTypes.CREATE_ORDER_INIT
    }
}
const createOrderStart=()=>{
    return{
        type: actionTypes.CREATE_ORDER_START
    }
}
const createOrderSuccess=(order)=>{
    return{
        type: actionTypes.CREATE_ORDER_SUCCESS,
        order:order
    }
}
const createOrderFailed=(err)=>{
    return{
        type: actionTypes.CREATE_ORDER_FAILED,
        error:err
    }
}

const cancelOrderStart=()=>{
    return{
        type: actionTypes.CANCEL_ORDER_START
    }
}
const cancelOrderSuccess=(orders)=>{
    return{
        type: actionTypes.CANCEL_ORDER_SUCCESS,
        orders:orders
    }
}
const cancelOrderFailed=(err)=>{
    return{
        type: actionTypes.CANCEL_ORDER_FAILED,
        error:err
    }
}


export const getCart=( token)=>{
    return async dispatch=>{
        dispatch(getCartStart())
        try{
            const response= await axios.get(`${process.env.REACT_APP_BOOKSTORE_BACKEND_URL}/shop/cart`,{headers:
                    { 
                        Authorization: 'BEARER ' + token
                 }})
            console.log(response)
            dispatch(getCartSuccess(response.data.cart))

        }catch(err){
            dispatch(getCartFailed(err))
        }
    }

}

export const addToCart=(productId,quantity, token)=>{
    return async dispatch=>{
        dispatch(addToCartStart())
        const data={
            productId:productId,
            quantity:quantity
        }
        try{
            const response= await axios.post(`${process.env.REACT_APP_BOOKSTORE_BACKEND_URL}/shop/cart`,data,{headers:
                    {  'Content-Type': 'application/json',
                        Authorization: 'BEARER ' + token
                 }})
            console.log(response)
            dispatch(addToCartSuccess(response.data.cart))

        }catch(err){
            console.log(err)
            dispatch(addToCartFailed(err))
        }
    }

}

export const removeFromCart=(productId, token)=>{
    return async dispatch=>{
        dispatch(removeFromCartStart())
        try{
            const response= await axios.delete(`${process.env.REACT_APP_BOOKSTORE_BACKEND_URL}/shop/cart/${productId}`,{headers:
                    { 
                        Authorization: 'BEARER ' + token
                 }})
            dispatch(removeFromCartSuccess(response.data.cart))

        }catch(err){
            dispatch(removeFromCartFailed(err))
        }
    }

}


export const createOrder =(orderData, token) =>{
    return async dispatch=>{
        dispatch(createOrderStart())
        try{
            const response= await axios.post(`${process.env.REACT_APP_BOOKSTORE_BACKEND_URL}/shop/order`, orderData,
            {headers:{
                'Content-Type': 'application/json', 
                Authorization: 'BEARER ' + token
            }})
            console.log(response)
            dispatch(createOrderSuccess(response.data.order))

            // console.log('Order created', orderData)
        }catch(err){
            console.error(err)
            dispatch(createOrderFailed(err))
        }
    }

}

export const fetchOrders =(token)=>{
    return async dispatch=>{
        dispatch(fetchOrderStart())
        try{
            const response= await axios.get(`${process.env.REACT_APP_BOOKSTORE_BACKEND_URL}/shop/order`, 

            {headers:{
                Authorization: 'BEARER ' + token
            }})
            dispatch(fetchOrderSuccess(response.data.orders))
        
        }catch(err){
            console.error(err)
            dispatch(fetchOrderFailed(err))
        }
    }
    
}

export const cancelOrder =(orderId,token)=>{
    return async dispatch=>{
        dispatch(cancelOrderStart())
        try{
            console.log(orderId,token)
            const response= await axios.delete(`${process.env.REACT_APP_BOOKSTORE_BACKEND_URL}/shop/order/${orderId}`,
            {headers:{ 
                Authorization: 'BEARER ' + token
            }})
            dispatch(cancelOrderSuccess(response.data.orders))
        }catch(err){
            console.error(err)
            dispatch(cancelOrderFailed(err))
        }
    }
}