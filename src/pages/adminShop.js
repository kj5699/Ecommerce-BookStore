import { InputAdornment, TextField, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Route, withRouter } from 'react-router';
import CategoryForm from '../components/Admin/CategoryForm';
import ProductForm from '../components/Admin/ProductForm';
import CategoryList from '../components/Products/CategoryList';
import CategorySection from '../components/Products/CategorySection';
import ProductList from '../components/Products/ProductList';
// import Button from '../components/UI/Button';
import * as Actions from '../store/actions/index'
import './adminShop.scss'
const AdminShop = props => {
    const [pageName,setPageName] =useState("Shop")
    const [selectedCategory,setSelectedCategory] =useState(props?.categories[0])
    const [searchString, setSearchString] = useState('')
    const onEditSearchString =(e)=>{
        setSearchString(e.target.value);
    }

    const onSelectCategory=(e,category)=>{
        setSelectedCategory(category)
    }
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
    const handleAddButtons=(e, path)=>{
        e.preventDefault()
        props.history.push(path)

    }

    useEffect(()=>{
        // console.log(props.categories)
        // console.log(props.products)
    },[props.categories, props.products])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column',padding:1, height:'92vh',width:'100vw'}}>
            <div className='body-header'>
                <Box sx={{display: 'flex', justifyContent:'space-between',mx:2, width:'100%'}}>
                    {/* <CategorySelector categories={props.categories} onClickedItem={onSelectCategory}></CategorySelector>
                    { category  && category.name!=='All' ? 
                        <div className="menu-options ml-3">
                            <NavLink to={'/edit-category/'+category._id}><MdEdit size={22}>Edit category</MdEdit>&nbsp;Edit</NavLink>
                            <NavLink onClick={toggleDelete} to='/'><MdDelete size={22} >Delete Category</MdDelete>&nbsp;Delete</NavLink>
                        </div>
                        :''
                    } */}

                    <div className="TextField-without-border-radius">
                    <TextField
                        label="Search Your favorite books"
                        id="standard-start-adornment"
                        variant="outlined"
                        sx={{ mx:'auto',mb:1}}
                        InputProps={{
                            endAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                        fullWidth
                        
                        value={searchString}
                        onChange={onEditSearchString}
                    />
                    </div>
                    <div className='headerActions'>
                        <Button sx={{mx:1}}  color='primary' onClick={(e)=>handleAddButtons(e,'/admin/newCategory')}>Add category </Button>
                        <Button sx={{mx:1}}  color='secondary'onClick={(e)=>handleAddButtons(e,'/admin/newItem')}>Add item </Button>
                    </div>

                    
                </Box>
                
                
            </div>
            <Box>
                <Route path='/admin/newItem' exact component={ProductForm}></Route>
                <Route path='/admin/newCategory' exact component={CategoryForm}></Route>
                <Route path='/admin/product/:id' exact ><ProductForm isEditMode / ></Route>
                <Route path='/admin/category/:id' exact ><CategoryForm isEditMode / ></Route>
                {pageName==='Shop' ? 
                <div className='body-wrapper'>
                
                    <div className='body-wrapper-cats'>
                        <CategoryList selectedCategory={selectedCategory} categories={props.categories} onSelectCategory={onSelectCategory}/> 

                    </div>
                    <div className='body-wrapper-items'>
                        {props.categories.map(category=>(
                            <CategorySection selectedCategory={selectedCategory} category={category}></CategorySection>
                        ))}
                    </div>
                
                </div>
                :null
                }            
            </Box>
        </Box>
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