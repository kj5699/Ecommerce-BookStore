
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import CategoryCard from '../components/Products/CategoryCard';
import FilterSidebar from '../components/Products/FilterSidebar';
import {Categories} from '../data';
import * as Actions from '../store/actions/index';
import './shop.scss';
const Shop = props => {

    console.log(props)
    return (
        <div className="shop">
            <FilterSidebar />
            <Container style={{maxHeight:'100%', overflow:'scroll'}}>
            <Row>
                {Categories.map(category=>(
                <Col><CategoryCard key={category.id}
                    name={category.name}
                    id={category.id}
                    image={category.imageUrl}
                    description={category.description} />
                </Col>
                ))}
                </Row>
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