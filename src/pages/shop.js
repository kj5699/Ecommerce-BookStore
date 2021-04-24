
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import CategoryCard from '../components/Products/CategoryCard';
import FilterSidebar from '../components/Products/FilterSidebar';
import {Categories} from '../data';
import './shop.scss'
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

export default withRouter(Shop);