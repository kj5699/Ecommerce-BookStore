import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router";
import { Button, Col, Container, FormGroup, Input, Label } from "reactstrap";
import ModalComponent from "../components/UI/Modal";
import { products } from "../data";
import * as Actions from '../store/actions/index'
import './product-page.scss'

const ProductPage = props => {
    const [product,setProduct]= useState(null)
    const [category,setCategory]= useState(null)
    const [quantity,setQuantity]= useState(1);
    const [authModalOpen,setAuthmodalOpen]=useState(false)
    const [authRedirect,setAuthRedirect]=useState(false)
    const onClickedContinue = ()=>{
        setAuthRedirect(true)
        setAuthmodalOpen(false);
    }
    const toggleAuth= ()=>{
        setAuthmodalOpen(prevState=>!prevState)
    }
    const addToCartHandler= ()=>{
        if(props.isAuthenticated){
        props.onAddToCart(product.id,quantity,props.user.token)
        }else{
            setAuthmodalOpen(true);
        }
    }
    useEffect(()=>{
        const p= props.products.find(product=>product.id===props.match.params.id)
        const c= props.categories.find(c=> c.id===p.category)
        setProduct(p)
        setCategory(c)
        
    },[])
    useEffect(()=>{
        
    },[quantity])
    return (
        
        <Container fluid >
                <>
                {authRedirect && <Redirect to ='/auth/signin'></Redirect>}
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
                {product?
                <div className="productWrapper" style={{margin:'auto'}}>
                    <div className="productImage">
                        <img src={`${process.env.REACT_APP_BOOKSTORE_ASSET_URL}/${product.imagePath}`} alt={product.name}></img>
                    </div>
                    <div className="productBody">
                    <h3 className="productTitle">{product.name}</h3>
                    <div className="productDescription">
                        <p>Written By: <strong>{product.author}</strong></p>
                        <p>Category: <strong>{category.name}</strong></p>
                        

                    </div>
                    <div className="productDetails">
                    <p>Price: <strong>&#x20B9; {product.price} /-</strong></p>

                    <p style={{color:!product.available?'red':'green', fontWeight:'bold'}}>{product.available ? "In Stock" : "Currently unavailable" }</p>
                    <p style={{color:'blue'}}>( Only {product.quantity} left in stock. )</p>
                    </div>
                    <div className="productQuantity">
                          
                        <Input id="quantity" type="number" value={quantity} onChange={(event)=>{
                                event.preventDefault();
                                setQuantity(event.target.value)}}
                        ></Input>
                            
                            <h6>Quantity</h6>
                    </div>
                   
                    <div className="productActions">

                        
                            
                        
                        
                        <Button color="secondary" onClick={addToCartHandler}>
                            Add to Cart
                        </Button>
                    </div>
                    </div>
                    
                   

                </div>:null}
                </>
        </Container>
    )
}
const mapStateToProps =(state) =>{
    return{
        categories: state.shop.categories,
        products:state.shop.products,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        onAddToCart:(productId,quantity,token) =>{dispatch(Actions.addToCart(productId,quantity,token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));
