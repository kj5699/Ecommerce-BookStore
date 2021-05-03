
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Button, Col, Container, Row } from "reactstrap"
import ModalComponent from "../components/UI/Modal"
import * as Actions from '../store/actions/index'
const Orders = props => {
    const [modalOpen,setmodalOpen]=useState(false)
    const onClickedYes = (id)=>{
        props.onCancelOrder(id, props.user.token);
        setmodalOpen(false);
    }
    const toggle= ()=>{
        console.log('clicked')
        setmodalOpen(prevState=>!prevState)
    }
    useEffect(() =>{
        props.onGetOrders(props.user.token)
    },[])
    console.log(props.orders)
    return (
        <>

        

        <div className="cartWrapper">
            {props.orders&&props.orders.length>0 ? props.orders.map(order =>
                
                    <Container size="md" style={{margin:'auto'}}>
                        <Row>
                            <Col xs='8' >
                            <strong>Product</strong>
                            </Col>
                            <Col ><strong>Price</strong></Col>
                            <Col ><strong>Quantity</strong></Col>
                            <Col ><strong>Total Amount</strong></Col>
                        </Row>
                        {order.items.map(p=>{return(
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
                            <Col >&#x20B9; {order.orderValue}</Col>
                        </Row>

                        <Row >
                            <Col xs='8' >
                            <strong>Status</strong>
                            </Col>
                            <Col ></Col>
                            <Col ></Col>
                            <Col style={{padding:'5px 10px',borderRadius:'5px', textAlign:'center',
                             backgroundColor:'red', color:'white'}}>{order.orderStatus}</Col>
                        </Row>
                        <div className={'cardFooter'}>
                            
                            <Button style={{margin:'0 1rem'}} color='success' >View Details</Button>
                            
                            {order.orderStatus!=='completed'&& order.orderStatus!=='cancelled'&&
                            <Button style={{margin:'0 1rem'}} color='danger' onClick={()=>{setmodalOpen(true)}} > Cancel Order</Button>}
                        </div>
                        {modalOpen && <ModalComponent
                                opened={modalOpen} 
                                toggle={toggle}
                                header={'Confirm Cancel Order'}
                                footer={<>
                                        <Button color="primary" onClick={()=>onClickedYes(order.id)}>Yes</Button>
                                        <Button color="secondary" onClick={toggle}>No</Button>
                                        </>}
                                >
                                    <>
                                    <h5>Do you want to Cancel the Order ?</h5>
                                    <br/>
                                    </>

                            </ModalComponent>}
                    </Container>
            ): <h1>No orders found</h1>}
        </div>
        </>
        
    )
}

const mapStateToProps =(state) =>{
    return{
        orders: state.user.orders,
        user:state.auth.user,
        
        orderCreated: state.user.orderCreated
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        onGetOrders:(token) =>dispatch(Actions.fetchOrders(token)),
        onRemoveFromCart:(id,token)=>dispatch(Actions.removeFromCart(id,token)),
        onCreateOrder:(orderData,token)=>dispatch(Actions.createOrder(orderData,token)),
        onCancelOrder:(orderId,token)=>dispatch(Actions.cancelOrder(orderId,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders))
