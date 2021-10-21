

import ProductCard from './ProductCard'
import './ProductList.scss'


const ProductList = props => {
    
    return (
        <>
        <div className="product-list">
            {props.products && props.products.length>0?
           
            
            props.products.map(p=>(
                <ProductCard 
                key={p.id}
                id={p.id}
                name={p.name}
                author={p.author}
                image={p.imagePath} 
                price={p.price}
                product={p}

                />
            )):
            
        
            <p>No Products in ths Category
                </p>
            }
        </div>
        
        </>
    )
}

ProductList.propTypes = {

}

export default ProductList
