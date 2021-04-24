
import Button from "../UI/Button";
import { AiOutlineFullscreen, AiOutlineShoppingCart } from "react-icons/ai"
import { FiHeart } from "react-icons/fi";
import './ProductCard.scss';
import { Card, CardBody, CardColumns, CardFooter, CardHeader, CardImg, CardText } from "reactstrap";

const ProductCard = props => {
    return (
        <Card style={{minWidth: '20vw',margin: '1rem 2rem', maxWidth: '20vw'}}>
            <CardImg src={props.image} alt={props.name}/>
            <CardBody>
            <CardHeader fontSize={'22px'}>
            {props.name}
            <CardText>{props.description}</CardText>
            </CardHeader> 
            <CardColumns>{props.price}</CardColumns>
                
                
                
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    )
}



export default ProductCard
