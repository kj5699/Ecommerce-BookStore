import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router"
import { Button, Card, CardBody, CardFooter, CardHeader, 
    CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AddressFrom from "../components/User/AddressFrom";
import * as Actions from '../store/actions/index'
import  './checkout.scss';

const CHECKOUT_STAGES=['order-detail','address','payment']

const Checkout = props => {
    const [currentStage,setCurrentState]=useState(0);
    const [orderItems,setOrderItems]=useState([]);
    const [orderaddress,setOrderAddress]=useState(null);
    const [paymentStatus,setPayment]=useState(false);
    const [paymentOption,setPaymentOption]=useState(null);

    
    useEffect(()=>{
            
            props.onGetCart(props.user.token)
    },[])

    
    const proceedHandler=(e,addressData) =>{
        e.preventDefault()
        console.log(currentStage)
        if(currentStage===0){
            setOrderItems(props.cart.items)
        }else if(currentStage===1){
            if(addressData===undefined){
                throw new Error('Please Enter a valid adddress')
                
            }
            setOrderAddress(addressData)
        }
        else if(currentStage===2){
            console.log('creating')
            if(orderItems && orderaddress && paymentStatus){
                const orderData={
                    items: orderItems,
                    address: orderaddress,
                    paymentStatus: paymentStatus,
                    paymentMode:paymentOption,
                    orderValue: props.cartValue
                }

                props.onCreateOrder(orderData, props.user.token)


            }else{
                console.log('Incorrect Details')
            }
        }
        setCurrentState(prevState=>prevState+1)
    }
    const goBackHandler=(e)=>{
        e.preventDefault()
        if(currentStage===0){
            console.log('goback to cart');
            props.history.goBack();
        }
        setCurrentState(prevState=>prevState-1)
    }

    console.log(paymentOption,paymentStatus)
    return (
        <Container fluid>
        {props.orderCreated && <Redirect to='/orders'></Redirect>}
        {CHECKOUT_STAGES[currentStage]==='address'?<AddressFrom orderaddress={orderaddress} onSave={proceedHandler} goBackHandler={goBackHandler}/>:null}
        {CHECKOUT_STAGES[currentStage]==='payment'?
        <Card style={{width:'40vw',maxWidth:'600px', margin:'8rem auto'}}>
            <CardHeader>
                <CardTitle> Select Payment Option</CardTitle>
            </CardHeader>
            <CardBody>
            <Form>
                <FormGroup tag="fieldset">
                    <FormGroup check style={{margin:'1rem auto'}}>
                        <Label check>
                        <Input type="radio" name="radio1" value="cod" onChange={(e)=>{
                            setPayment(true)
                            setPaymentOption(e.target.value)
                        }}/>{' '}
                        Cash On Delivery
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="radio" name="radio1" value="upi" onChange={(e)=>{
                            setPayment(true)
                            setPaymentOption(e.target.value)
                        }}/>{' '}
                        Pay with UPI
                        </Label>
                    </FormGroup>
                </FormGroup>
            </Form>
            </CardBody>
            <CardFooter>
                <Button color='danger' onClick={goBackHandler}>Go Back</Button>
                <Button color='success' onClick={proceedHandler} disabled={!paymentStatus && paymentOption!=='cod'} >Proceed</Button>
            </CardFooter>
        </Card>
        
        
        :null}
        
        
        
        
        
        {CHECKOUT_STAGES[currentStage]==='order-detail'?
            <div className="cartWrapper">
                { props.cart.items&& props.cart.items.length>0?
                    <Container size="md" style={{margin:'6rem auto'}}>
                        <Col xs='12'><p>Order Details</p></Col>
                        <Row>
                            <Col xs='8' >
                            <strong>Product</strong>
                            </Col>
                            <Col ><strong>Price</strong></Col>
                            <Col ><strong>Quantity</strong></Col>
                            <Col ><strong>Total Amount</strong></Col>
                        </Row>
                        {props.cart.items.map(p=>{return(
                        <Row key={p._id} className="productItem">
                            <Col xs='8' >
                                {p.productId.name}
                            </Col>
                            <Col >&#x20B9; {p.productId.price}</Col>
                            <Col >{p.quantity}</Col>
                            <Col >&#x20B9; {p.quantity*p.productId.price}</Col>

                        </Row>)}
                        )}
                        <Row style={{ borderTop: '1px solid black' }}>
                            <Col xs='8' >
                            <strong>Total amount</strong>
                            </Col>
                            <Col ></Col>
                            <Col ></Col>
                            <Col >&#x20B9; {props.cartValue}</Col>
                        </Row>
                    </Container>
                    :
                    <h3>Nothing in Cart</h3>
                }
            <div className="cartFooter">
                        <Button color='danger' onClick={goBackHandler}>Go Back</Button>
                        <Button color='success' onClick={proceedHandler}>Proceed</Button>
            </div>
        </div>
        :null}

        
        </Container>
        
    )
}
const mapStateToProps =(state) =>{
    return{
        cart: state.user.cart,
        cartUpdated: state.user.cartUpdated,
        user:state.auth.user,
        cartValue: state.user.cartValue,
        orderCreated: state.user.orderCreated
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        onGetCart:(token) =>dispatch(Actions.getCart(token)),
        onRemoveFromCart:(id,token)=>dispatch(Actions.removeFromCart(id,token)),
        onCreateOrder:(orderData,token)=>dispatch(Actions.createOrder(orderData,token))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))