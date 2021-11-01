import { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CategoryList from '../components/Products/CategoryList';
import CategorySection from '../components/Products/CategorySection';
import * as Actions from '../store/actions/index';
import  { Box, InputAdornment, TextField} from '@mui/material'


import './home.scss'

const Home = props => {
    const [selectedCategory,setSelectedCategory] =useState(props?.categories[0])

    const onSelectCategory=(e,category)=>{
        setSelectedCategory(category)
    }
    const [searchString, setSearchString] = useState('')
    const onEditSearchString =(e)=>{
        setSearchString(e.target.value);
    }
    useEffect(() =>{
        console.log('SelectedCategory', selectedCategory?.name)
    },
    [selectedCategory])
    useEffect(()=>{
        props.onfetchProducts()
        props.onfetchCategories()
    },[])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column',padding:1, height:'92vh',width:'100vw'}}>
            <div className='body-header'>
                <Box sx={{mx:2, maxWidth: '600px'}}>
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
                </Box>
                
            </div>
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
        onfetchCategories:()=> dispatch(Actions.fetchCategory()),
        onfetchProducts:()=> dispatch(Actions.fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));