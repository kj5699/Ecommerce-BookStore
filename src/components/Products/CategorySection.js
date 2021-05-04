import ProductList from "./ProductList"
import './CategorySection.scss'

const CategorySection = props => {
    return (
        <div className="categorySection">
            <div className="categoryHeader">
                <h3>{props.category.name}</h3>
            </div>
            <ProductList products={props.category.products}></ProductList>
        
        </div>
    )
}


export default CategorySection
