import{products}  from '../../data'
import CategoryCard from './CategoryCard'
import './CategoryList.scss'

const CategoryList = props => {
    return (
        <div className="category-list">
            {props.categories.map(p=>{
                return <CategoryCard 
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                image={p.imagePath}
                />
            }
                
            )}
        </div>
    )
}



export default CategoryList