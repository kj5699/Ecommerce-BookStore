import ProductList from "./ProductList"
import './CategorySection.scss'
import {useState, useEffect, useRef} from 'react';
import  { Typography} from '@mui/material'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const CategorySection = props => {
    const [showMore, setShowMore]=useState(false)
    
    let length = props.category.products.length>3? Math.floor(props.category.products.length/3)*3 :props.category.products.length
    useEffect(() =>{
        console.log('selectedCategory chaged')
        if (props?.selectedCategory?._id===props?.category?._id){
            const violation = document.getElementById(props?.selectedCategory?.name)
            if(violation!==null && violation){
                console.log('Violation',violation)
                violation.scrollIntoView()
            }
        }

    },[props.selectedCategory,])
    console.log(props.category.products.length, length,Number(props.category.products.length/3))
    return (
        props.category.products.length > 0 &&
        <div  className="categorySection" id={props.category.name}>
            <div className="categoryHeader">
                <Typography  variant="h5"> {props.category.name}</Typography>
            </div>
            <div className="d-flex flex-wrap">
                <ProductList products={showMore?props.category.products:props.category.products.slice(0,Math.min(length,3))}></ProductList>
            </div>
            {props.category.products.length>3?
            <div className="d-flex my-2">
                <Typography sx={{mx:'auto' ,cursor: 'pointer'}} color='error' variant="subtitle2" onClick={()=>
                    {setShowMore(prev=>!prev)}}>
                        {showMore ? 'Show Less': 'Show All Items'}
                        {!showMore ? <KeyboardArrowDownIcon size='small' color='error' />: <KeyboardArrowUpIcon size='small' color='error' />}
                
                </Typography>
            </div>:null}
        </div>
    )
}


export default CategorySection
