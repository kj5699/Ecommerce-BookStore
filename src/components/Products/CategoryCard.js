import { NavLink } from "react-router-dom"
import { Card } from "reactstrap"
import './CategoryCard.scss'

const CategoryCard = props => {
    return (
       
        <NavLink to={`/shop/category/${props.id}`} style={{ textDecoration: 'none' }}
            className="categoryCard">
                <img src={props.image} alt={props.name}></img>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            
            
        </NavLink>
        
    )
}



export default CategoryCard
