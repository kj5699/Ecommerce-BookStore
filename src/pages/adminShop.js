import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Route, withRouter } from 'react-router';
import CategoryForm from '../components/Admin/CategoryForm';
import ProductForm from '../components/Admin/ProductForm';
import CategoryList from '../components/Products/CategoryList';
import CategorySection from '../components/Products/CategorySection';
import ProductList from '../components/Products/ProductList';
import Button from '../components/UI/Button';
import * as Actions from '../store/actions/index'
import './adminShop.scss'
const AdminShop = props => {
    const [pageName,setPageName] =useState("Shop")
    useEffect(()=>{
        props.onAddCategoryInit()
        props.onfetchCategories()
        props.onfetchProducts()

        props.history.push('/')
    },[props.submitted])
    useEffect(()=>{
        if(props.location.pathname==="/admin/newCategory"){
            setPageName("Add New Category")
        }
        else if((props.location.pathname==="/admin/newItem")){
            setPageName("Add New Item")
        }
        else if((props.location.pathname!=="/")){
            setPageName("Edit Item")
        }
        else{
            setPageName("Shop")
        }
    },[props])

    useEffect(()=>{
        // console.log(props.categories)
        // console.log(props.products)
    },[props.categories, props.products])
    return (
        <div className="shop">
            <header className='header'>
                <div className='headerPagename'>
                    {pageName}
                </div>
                <div className='headerActions'>
                    <Button to='/admin/newCategory'>Add category </Button>
                    <Button to='/admin/newItem'>Add item </Button>
                </div>
            </header>
            <div className="container mainBody">
                <Route path='/admin/newItem' exact component={ProductForm}></Route>
                <Route path='/admin/newCategory' exact component={CategoryForm}></Route>
                <Route path='/admin/product/:id' exact ><ProductForm isEditMode / ></Route>
                <Route path='/admin/category/:id' exact ><CategoryForm isEditMode / ></Route>
                {pageName==='Shop' ? 
                <>
                <div className="section">
                    <div>
                        <h3>View All Categories</h3>
                    </div>
                
                
                <CategoryList categories={props.categories}></CategoryList>
                </div>
                {props.categories.map(c=>(
                    <CategorySection category={c}/>
                    
                ))}
                </>
                :

                
                console.log(pageName)
                }            
            </div>
        </div>
    )
}
const mapStateToProps =(state) =>{
    return{
        categories: state.shop.categories,
        products:state.shop.products,
        isAuthenticated: state.auth.isAuthenticated,
        submitted: state.shop.submitted,
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        onAddCategoryInit: () => dispatch(Actions.addCategoryInit()),
        onfetchCategories:()=> dispatch(Actions.fetchCategory()),
        onfetchProducts:()=> dispatch(Actions.fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminShop));