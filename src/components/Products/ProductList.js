
import{products}  from '../../data'
import ProductCard from './ProductCard'
import './ProductList.scss'

const ProductList = props => {
    return (
        <div className="product-list">
            {products.filter(p=>p.categoryId===props.categoryId).map(p=>(
                <ProductCard 
                key={p.id}
                name={p.name}
                description={p.description}
                image={props.image} 
                price={p.price}

                />
            ))}
        </div>
    )
}

ProductList.propTypes = {

}

export default ProductList
