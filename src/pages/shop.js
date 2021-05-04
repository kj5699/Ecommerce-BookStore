
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import CategoryCard from '../components/Products/CategoryCard';
import CategoryList from '../components/Products/CategoryList';
import CategorySection from '../components/Products/CategorySection';
import FilterSidebar from '../components/Products/FilterSidebar';
import * as Actions from '../store/actions/index';
import './shop.scss';
const Shop = props => {
    useEffect(()=>{
        props.onfetchProducts()
        props.onfetchCategories()
    },[])
    return (
        <div className="shop">
            <FilterSidebar categories={props.categories}/>
            <Container style={{maxHeight:'100%', overflow:'scroll'}}>
                <section style={{minHeight:'60vh', margin:'auto'}}>
                    <CategoryList categories={props.categories}></CategoryList>
                </section>
                {props.categories.map(category=>(
                    <CategorySection category={category}></CategorySection>
                ))}
            </Container>

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop));