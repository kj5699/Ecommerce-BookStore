
import { AiOutlineFullscreen, AiOutlineShoppingCart, AiTwotoneDelete } from "react-icons/ai"
import { FiEdit, FiHeart } from "react-icons/fi";
import './ProductCard.scss';
// import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { CardMedia,Button, IconButton, Typography, Card,CardContent, Box, ListItem, Switch } from '@mui/material';
import { connect } from "react-redux";
import { useEffect, useState, useHistory } from "react";
import ModalComponent from "../UI/Modal";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import * as Actions from "../../store/actions/index";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const ProductCard = props => {
    const [inCart, setInCart] =useState(false)
    const [modalOpen,setmodalOpen]=useState(false)
    const [authModalOpen,setAuthmodalOpen]=useState(false)
    const [authRedirect,setAuthRedirect]=useState(false)
    const searchTags=['a','b','c','d','e']
   

    useEffect(() =>{
        if (props.cartItems.find(p=>{
            return p.productId===props.product.id
        })){
            setInCart(true)
        }
    },[props.cartUpdated, inCart])
    const onClickedDelete = ()=>{
        props.onDeleteProduct(props.product.id, props.user.token);
      setmodalOpen(false);
    }
    const toggleDelete= ()=>{
        setmodalOpen(prevState=>!prevState)
    }
    const onClickedContinue = ()=>{
        setAuthRedirect(true)
      setmodalOpen(false);
    }
    const toggleAuth= ()=>{
        setAuthmodalOpen(prevState=>!prevState)
    }
    const addToCartHandler= ()=>{
        if(props.isAuthenticated){
        props.onAddToCart(props.id,1,props.user.token)
        setInCart(true)
        }else{
            setAuthmodalOpen(true);
        }
    }

    const onCardClickHandler=(e)=>{
        e.preventDefault()
        props.history.push(`/product/${props.id}`)
    }
    const onClickedEdit=(e)=>{
        e.preventDefault()
        props.history.push(`/admin/product/${props.id}`)
    }
    return (
        <>  
            {authRedirect && <Redirect to ='/auth/signin'></Redirect>}
            
            {modalOpen && <ModalComponent
            opened={modalOpen} 
            toggle={toggleDelete}
            header={'Confirm Delete'}
            footer={<>
                    <Button variant='contained' sx={{ml:1}} color="success" onClick={toggleDelete}>Cancel</Button>
                    <Button variant='contained' sx={{ml:1}} color="error" onClick={onClickedDelete}>Delete</Button>
                    
                    </>}
            >
                <>
                <Typography variant="body">Do you want to Delete This Item ?</Typography>
                <br/>
                <Typography variant="h5">{props.name}</Typography>

                </>
            </ModalComponent>}
            {authModalOpen && <ModalComponent
            opened={authModalOpen} 
            toggle={toggleAuth}
            header={'Continue to Login'}
            footer={<>
                    <Button  sx={{ml:1}} color="error" onClick={toggleAuth}>Cancel</Button>
                    <Button  sx={{ml:1}} color="success" onClick={onClickedContinue}>Continue</Button>
                    
                    </>}
            >
                <>
                <Typography variant="body">You are not logged in, Please continue to log in</Typography>
                

                </>
            </ModalComponent>}
        {/* <Card className='productCard' >
            
            <img  src={`${process.env.REACT_APP_BOOKSTORE_ASSET_URL}/${props.image}`} 
                alt={props.name} 
                class='productImage'
                
            ></img>
           
            <CardBody className='productCardBody'>
            <CardTitle tag='h5' color='secondary'>{props.name}</CardTitle>
            
            <CardSubtitle>By {props.author}</CardSubtitle> 
            
            <CardText>&#x20B9; {props.price}</CardText>
            </CardBody>
            <CardFooter className='productCardFooter'>
                {props.isAdmin  ?
                <>
                <NavLink  to = {`/admin/product/${props.id}`}>
                    <FiEdit  className='buttonIcon'/>
                    Edit
                </NavLink>
                <Button  onClick={()=>{setmodalOpen(true)}}>
                    <AiTwotoneDelete className='buttonIcon' />
                    Delete
                </Button>
                </>:
                <>
                    <NavLink to={`/product/${props.id}`}  className={'inverse'}>
                        <AiOutlineFullscreen  className='buttonIcon' />
                        View
                    </NavLink>
                    <NavLink to='#' onClick={addToCartHandler} className={inCart? 'inCart':null} >
                        <AiOutlineShoppingCart className='buttonIcon'/>
                        Add To Cart
                    </NavLink>
                </>
            
                }
            </CardFooter>
        </Card> */}

    <div className='item-card mr-3'>
       <div className='menu-card' >
         <img onClick={onCardClickHandler} src={`${process.env.REACT_APP_BOOKSTORE_ASSET_URL}/${props.image}`}  alt={props.name}></img>
         <div onClick={onCardClickHandler} className="name-container">
             <Typography className="dish-name" varient="h2" fontWeight="fontWeightMedium">{props.name}</Typography>
         </div>
         <div onClick={onCardClickHandler} className="card-content d-flex justify-content-between">
           <div className="dish-description">
             <Typography className="dish-info" color="textSecondary">{props.author}</Typography>
           </div>
           
           <Typography fontWeight="fontWeightRegular">&#8377; {props.price}</Typography>
           
         </div>
         {inCart? <Typography sx={{ mb:1 }} variant='subtitle2'>
              <CheckCircleOutlineIcon sx={{ mr:0.5 }} size="small" color="success"/>
              Added to Cart
         </Typography>:
         <Typography sx={{ mb:1 }} variant='subtitle2'>
         
    </Typography>}
         <div className="d-flex flex-row justify-content-between ">
                {props.isAdmin  ?
                <>
                <IconButton color='primary' onClick = {onClickedEdit}>
                    <EditIcon />
                    
                </IconButton>
                <IconButton color='error' onClick={()=>{setmodalOpen(true)}}>
                    <DeleteIcon />
                </IconButton>
                </>:
                <>
                    <Button variant='contained' color='success'  sx={{ width:'100%', borderRadius:'1rem'}} onClick={addToCartHandler} className={inCart? 'inCart':null} >
                        Add To Cart
                    </Button>
                </>
                }

       </div>
           </div>
       {/* <DeleteModal 
         opened={showDeleteModal} 
         toggle={toggleDelete} 
         item={props.item} 
         onClickedDelete={deleteItem} 
         header={"Confirm Delete Item"}
         additionalInfo={'Price : ' +props.item.price + ' Rs'}
         >{"Do you want to delete this item?"}
       </DeleteModal> */}
   </div>
    </>
    )
}

const mapStateToProps = state => {
    return {
        isAdmin:state.auth.isAdmin,
        isAuthenticated:state.auth.isAuthenticated,
        user:state.auth.user,
        cartItems:state.user.cart.items,
        cartUpdated:state.user.cartUpdated
        
    }
}
const mapDispatchToProps =dispatch => {
    return {
        onDeleteProduct : (id,token) =>dispatch(Actions.deleteProduct(id,token)),
        onAddToCart: (productId,quantity,token) =>dispatch(Actions.addToCart(productId,quantity,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductCard));
