
import { AiOutlineFullscreen, AiOutlineShoppingCart, AiTwotoneDelete } from "react-icons/ai"
import { FiEdit, FiHeart } from "react-icons/fi";
import './ProductCard.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ModalComponent from "../UI/Modal";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import * as Actions from "../../store/actions/index"


const ProductCard = props => {
    const [inCart, setInCart] =useState(false)
    const [modalOpen,setmodalOpen]=useState(false)
    const [authModalOpen,setAuthmodalOpen]=useState(false)
    const [authRedirect,setAuthRedirect]=useState(false)

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
    return (
        <>  
            {authRedirect && <Redirect to ='/auth/signin'></Redirect>}
            
            {modalOpen && <ModalComponent
            opened={modalOpen} 
            toggle={toggleDelete}
            header={'Confirm Delete'}
            footer={<>
                    <Button color="primary" onClick={onClickedDelete}>Delete</Button>
                    <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
                    </>}
            >
                <>
                <h5>Do you want to Delete This Item ?</h5>
                <br/>
                <h5>{props.name}</h5>

                </>
            </ModalComponent>}
            {authModalOpen && <ModalComponent
            opened={authModalOpen} 
            toggle={toggleAuth}
            header={'Continue to Login'}
            footer={<>
                    <Button color="primary" onClick={onClickedContinue}>Continue</Button>
                    <Button color="secondary" onClick={toggleAuth}>Cancel</Button>
                    </>}
            >
                <>
                <h5>You are not logged in, Please continue to log in</h5>
                

                </>
            </ModalComponent>}
        <Card className='productCard' >
            
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
        </Card>
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
