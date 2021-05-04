import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { NavLink } from "react-router-dom";
import { Button, Container } from "reactstrap";
import * as Actions from '../store/actions/index'
import  './cart.scss';

const Cart = props => {
    
    useEffect(()=>{
            console.log('cart updated')
            props.onGetCart(props.user.token)
    },[props.cartUpdated])
    useEffect(()=>{
        props.onCrateOrderInit()
    },[])

    
    

    const proceedCheckoutHandler=()=>{
        props.history.push(`/${props.user.userId}/checkout`)
    }
    return (
        <Container fluid>
        <div className="pageHeading">Your Cart</div>
        <div className="cartWrapper">
        { props.cart.items&& props.cart.items.length>0?
            <ul>
                <h5 style={{textAlign:'center', marginTop:'0',marginBottom:'1rem'}}>Cart Items</h5>
                {props.cart.items.map(p=>{
                    return(
                    <li key={p._id} className="productItem">
                    <div className="productImage">
                        <img src={`${process.env.REACT_APP_BOOKSTORE_ASSET_URL}/${p.productId.imagePath}`} alt={p.productId.name}></img>
                    </div>
                    <div className="productBody">
                    
                        <h3 className="productTitle">{p.productId.name}</h3>
                        <div className="productOptions">
                            <div className="productDetails">
                                <p>Quantity: <strong>{p.quantity}</strong></p>
                                <p>Amount: <strong>{p.quantity*p.productId.price}</strong> ({p.quantity}x{p.productId.price})</p>
                            </div>
                            <Button color="danger" onClick={()=>{props.onRemoveFromCart(p.productId._id,props.user.token)}}>
                                <AiTwotoneDelete ></AiTwotoneDelete>
                            </Button>
                        </div>
                    </div>

                </li>
                    )

                }
                )}
                



            </ul>
            :
            <h3>Cart Empty</h3>
        }
        <div className="cartFooter">
                    <p>Total Value:  <strong> {props.cartValue}</strong></p>
                    <Button to={`/${props.user.userId}/checkout`} onClick={proceedCheckoutHandler} color='success'>Proceed To Checkout</Button>
        </div>
        </div>

        
        </Container>
        
    )
}
const mapStateToProps =(state) =>{
    return{
        cart: state.user.cart,
        cartUpdated: state.user.cartUpdated,
        user:state.auth.user,
        cartValue: state.user.cartValue
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        onGetCart:(token) =>dispatch(Actions.getCart(token)),
        onRemoveFromCart:(id,token)=>dispatch(Actions.removeFromCart(id,token)),
        onCrateOrderInit:()=>dispatch(Actions.createOrderInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))
