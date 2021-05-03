import axios from 'axios';
import * as actionTypes from './actionTypes';


export const cancelForm =()=>{
    return{
        type: actionTypes.CANCEL_FORM
    }
}
export const addCategoryInit =()=>{
    return{
        type: actionTypes.ADD_CATEGORIES_INIT
    }
}

const addCategoryStart =()=>{
    return{
        type: actionTypes.ADD_CATEGORIES_START
    }
}

const addCategorySuccess =(category)=>{
    return{
        type: actionTypes.ADD_CATEGORIES_SUCCESS,
        newCategory: category
    }
}

const addCategoryFailed =(err)=>{
    return{
        type: actionTypes.ADD_CATEGORIES_FAILED,
        error:err
    }
}

export const addProductInit =()=>{
    return{
        type: actionTypes.ADD_PRODUCT_INIT
    }
}
const addProductStart =()=>{
    return{
        type: actionTypes.ADD_PRODUCT_START
    }
}

const addProductSuccess =(product)=>{
    return{
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        newProduct: product
    }
}

const addProductFailed =(err)=>{
    return{
        type: actionTypes.ADD_PRODUCT_FAILED,
        error:err
    }
}

const fetchCategoryStart =()=>{
    return {
        type:actionTypes.FETCH_CATEGORIES_START
    }
}
const fetchCategorySuccess =(categories)=>{
    return {
        type:actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories:categories
    }
}
const fetchCategoryFailed =(error)=>{
    return {
        type:actionTypes.FETCH_CATEGORIES_FAILED,
        error:error

    }
}

const fetchProductsStart =()=>{
    return {
        type:actionTypes.FETCH_PRODUCT_START
    }
}
const fetchProductsSuccess =(products)=>{
    return {
        type:actionTypes.FETCH_PRODUCT_SUCCESS,
        products:products
    }
}
const fetchProductsFailed =(error)=>{
    return {
        type:actionTypes.FETCH_PRODUCT_FAILED,
        error:error

    }
}

const updateProductSuccess =(product,id)=>{
    return{
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        id:id,
        newProduct: product
    }
}
const deleteProductStart =()=>{
    return{
        type: actionTypes.DELETE_PRODUCT_START
    }
}

const deleteProductSuccess =(id)=>{
    return{
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        id:id
    }
}

const deleteProductFailed =(err)=>{
    return{
        type: actionTypes.DELETE_PRODUCT_FAILED,
        error:err
    }
}
const updateCategorySuccess =(category,id)=>{
    return{
        type: actionTypes.UPDATE_CATEGORY_SUCCESS,
        id:id,
        newCategory: category
    }
}
const deleteCategoryStart =()=>{
    return{
        type: actionTypes.DELETE_CATEGORY_START
    }
}

const deleteCategorySuccess =(id)=>{
    return{
        type: actionTypes.DELETE_CATEGORY_SUCCESS,
        id:id
    }
}

const deleteCategoryFailed =(err)=>{
    return{
        type: actionTypes.DELETE_CATEGORY_FAILED,
        error:err
    }
}

export const addCategory =(categoryData,token)=>{
    return async dispatch=>{
        dispatch(addCategoryStart())
        console.log('sending',categoryData)
        const URL= 'http://localhost:5000/api/admin/shop/category';

        // send post request
        try{
            const response=await axios.post(URL, categoryData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'BEARER ' + token
                }})
            console.log('response', response.data)
            
            dispatch(addCategorySuccess(response.data))
        }catch(err){
            dispatch(addCategoryFailed(err.response))
        }
    }
}

export const addProduct =(productData,token)=>{
    return async dispatch=>{
        dispatch(addProductStart())

        // send post request
        const URL= 'http://localhost:5000/api/admin/shop/product';
        try{
            const response=await axios.post(URL, productData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'BEARER ' + token
                }})
            console.log('response', response.data)
            
            dispatch(addProductSuccess(response.data.product))
        }catch(err){
            dispatch(addProductFailed(err.response))
        }
    }
}


export const fetchCategory=()=>{
    return async dispatch=>{
        dispatch(fetchCategoryStart())
        const URL='http://localhost:5000/api/shop/categories'
        try{
            const response= await axios.get(URL)
            // console.log(response)
            dispatch(fetchCategorySuccess(response.data.categories))

        }catch(error){
            dispatch(fetchCategoryFailed(error))

        }
    
    }
}

export const fetchProducts=()=>{
    return async dispatch=>{
        dispatch(fetchProductsStart())
        const URL='http://localhost:5000/api/shop/products'
        try{
            const response= await axios.get(URL)
            // console.log(response)
            dispatch(fetchProductsSuccess(response.data.products))

        }catch(error){
            dispatch(fetchProductsFailed(error))

        }
    
    }
}

export const updateProduct =(productData,id,token)=>{
    return async dispatch=>{
        dispatch(addProductStart())

        // send post request
        const URL= `http://localhost:5000/api/admin/shop/product/${id}`;
        try{
            const response=await axios.patch(URL, productData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'BEARER ' + token
                }})
            console.log('response', response.data)
            
            dispatch(updateProductSuccess(response.data.product, id))
        }catch(err){
            dispatch(addProductFailed(err.response))
        }
    }
}

export const deleteProduct =(id,token)=>{
    return async dispatch=>{
        dispatch(deleteProductStart())

        // send post request
        const URL= `http://localhost:5000/api/admin/shop/product/${id}`;
        try{
            const response=await axios.delete(URL,{
                headers: {
                  Authorization: 'BEARER ' + token
                }})
            console.log('response', response.data)
            
            dispatch(deleteProductSuccess(id))
        }catch(err){
            dispatch(deleteProductFailed(err.response))
        }
    }
}

export const updateCategory =(productData,id,token)=>{
    
    return async dispatch=>{
        dispatch(addCategoryStart())

        // send post request
        const URL= `http://localhost:5000/api/admin/shop/category/${id}`;
        try{
            const response=await axios.patch(URL, productData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'BEARER ' + token
                }})
            console.log('response', response.data)
            
            dispatch(updateCategorySuccess(response.data.category, id))
        }catch(err){
            dispatch(addCategoryFailed(err.response))
        }
    }
}

export const deleteCategory =(id,token)=>{
    return async dispatch=>{
        dispatch(deleteCategoryStart())

        // send post request
        const URL= `http://localhost:5000/api/admin/shop/category/${id}`;
        try{
            const response=await axios.delete(URL,{
                headers: {
                  Authorization: 'BEARER ' + token
                }})
            console.log('response', response.data)
            
            dispatch(deleteCategorySuccess(id))
        }catch(err){
            dispatch(deleteCategoryFailed(err.response))
        }
    }
}