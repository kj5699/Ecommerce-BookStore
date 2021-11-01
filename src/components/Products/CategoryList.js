import { List, ListItem, ListItemButton, ListItemText, Typography, Box } from '@mui/material'
import{products}  from '../../data'
import CategoryCard from './CategoryCard'
import './CategoryList.scss'

const CategoryList = props => {
    return (
        // <div className="category-list">
        //     {props.categories.map(p=>{
        //         return <CategoryCard 
        //         key={p.id}
        //         id={p.id}
        //         name={p.name}
        //         description={p.description}
        //         image={p.imagePath}
        //         />
        //     }
                
        //     )}
        // </div>
        <Box >
            <List sx={{marginY:'2rem'}}>
                {props.categories.map(p=>{
                    return(
                    <ListItemButton key={p.id} onClick={(e)=>props.onSelectCategory(e,p )} selected={props.selectedCategory?._id===p._id}>
                        <ListItemText primary={p.name} ></ListItemText>
                        
                    </ListItemButton>) 
                })}
                

            </List>
        </Box>
    )
}



export default CategoryList