import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CategorySection from '../components/Products/CategorySection';
import * as Actions from '../store/actions/index'


import './home.scss'
const Home = props => {

    useEffect(()=>{
        props.onfetchProducts()
        props.onfetchCategories()
    },[])
    return (
        <div className="home">
                {props.categories.map(category=>(
                    <CategorySection category={category}></CategorySection>
                ))}
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
        onfetchCategories:()=> dispatch(Actions.fetchCategory()),
        onfetchProducts:()=> dispatch(Actions.fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));