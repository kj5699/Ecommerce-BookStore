import * as actionTypes from '../actions/actionTypes';
let initialState={
    categories:[],
    products:[],
    loading:false,
    error:null,
    submitted:true

}

const reducer =(state =initialState,action)=>{
    switch(action.type){
        case(actionTypes.CANCEL_FORM):
            return{...state,submitted:true,loading:false,error:null}

        case(actionTypes.ADD_CATEGORIES_INIT):
            return {...state, submitted:false}
        case(actionTypes.ADD_CATEGORIES_START):
            return {...state,loading:true,error:null}
        
        case(actionTypes.ADD_CATEGORIES_SUCCESS):
            return {...state, submitted:true, loading:false,error:null , categories:[...state.categories, action.newCategory]}
        
        case(actionTypes.ADD_CATEGORIES_FAILED):
            return {...state, submitted:false, loading:false,error:action.error}
       
        case(actionTypes.ADD_PRODUCT_INIT):
            return {...state, submitted:false}
        case(actionTypes.ADD_PRODUCT_START):
            return {...state, submitted:false, loading:true,error:null}
        
        case(actionTypes.ADD_PRODUCT_SUCCESS):
            return {...state, submitted:true, loading:false,error:null,products:[...state.products, action.newProduct]}
        
        case(actionTypes.ADD_PRODUCT_FAILED):
            return {...state, submitted:false, loading:false,error:action.error}
        
        case(actionTypes.FETCH_CATEGORIES_START):
            return {...state,loading:true,error:null}
        case(actionTypes.FETCH_CATEGORIES_SUCCESS):
            return {...state,loading:false,error:null, categories:action.categories}
        case(actionTypes.FETCH_CATEGORIES_FAILED):
            return {...state,loading:false, error:action.error}
        
        case(actionTypes.FETCH_PRODUCT_START):
            return {...state,loading:true,error:null}
        case(actionTypes.FETCH_PRODUCT_SUCCESS):
            return {...state,loading:false,error:null,products:action.products}
        case(actionTypes.FETCH_PRODUCT_FAILED):
            return {...state,loading:false,error:action.error,}

        case(actionTypes.UPDATE_PRODUCT_SUCCESS):

            const updatedProducts= state.products.filter(product => product.id !==action.id)
            return {...state, submitted:true, loading:false,error:null,products:[...updatedProducts, action.newProduct]}
        case(actionTypes.DELETE_PRODUCT_START):
            return {...state, submitted:false, loading:true,error:null}
        
        case(actionTypes.DELETE_PRODUCT_SUCCESS):
            const remainingProducts = state.products.filter(product => product.id !==action.id)
            return {...state, submitted:true, loading:false,error:null,products:[...remainingProducts]}
        
        case(actionTypes.DELETE_PRODUCT_FAILED):
            return {...state, submitted:false, loading:false,error:action.error}

        case(actionTypes.UPDATE_CATEGORY_SUCCESS):

            const updatedCategories= state.categories.filter(c => c.id !==action.id)
            return {...state, submitted:true, loading:false,error:null,products:[...updatedCategories, action.newCategory]}
        case(actionTypes.DELETE_CATEGORY_START):
            return {...state, submitted:false, loading:true,error:null}
        
        case(actionTypes.DELETE_CATEGORY_SUCCESS):
            const remainingCategories = state.categories.filter(c => c.id !==action.id)
            return {...state, submitted:true, loading:false,error:null,products:[...remainingCategories]}
        
        case(actionTypes.DELETE_CATEGORY_FAILED):
            return {...state, submitted:false, loading:false,error:action.error}
        
        default:
            return state

    }


}
export default reducer