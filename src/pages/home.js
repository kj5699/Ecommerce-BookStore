import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import CategoryCard from '../components/Products/CategoryCard';
import ProductCard from '../components/Products/ProductCard';
import ProductList from '../components/Products/ProductList';


import {Categories, products} from '../data';
import './home.scss'
const Home = () => {
    return (
        <div className="home">

            

                {Categories.map(category=>(
                    <div className="categorySection">
                        <div className="categoryHeader">
                            <h3>{category.name}</h3>
                        </div>
                        <ProductList image={category.imageUrl} categoryId={category.id}></ProductList>
    
                    </div>
                ))}
            

                {/* <Row>
                {Categories.map(category=>(
                <Col><CategoryCard 
                key={category.id}
                name={category.name}
                id={category.id}
                image={category.imageUrl}
                description={category.description} />
                </Col>
                ))}

                </Row> */}


            
            
        </div>
    )
}

export default withRouter(Home);