import React, { Component } from 'react';
import {
    Container,
    Col, Form,
  FormGroup, Label, Input, Row, Button,
  
} from 'reactstrap'
import { checkValidity } from '../../utils/utils';
import * as Actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ImageUpload from '../UI/ImageUpload';
import './AddressForm.scss'

var States = [ "Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam	Dispur","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand	Ranchi","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]
class AddressForm extends Component{
    state={
        AddressForm:{
            address : {
                type:'textarea',
                name: 'address',
                id:'address',
                placeholder:'address',
                label:'Address',
  
                value: '',
                validations:{
                    required:true,
                    },
                valid:false,
                touched:false
            },
            city: {
                type:'text',
                name:'city',
                id:'city',
                placeholder:'city',
                label:'City',
                value: '',
                validations:{
                    required: false, 
                },
                valid:false,
                touched:false
            },
            state:{
                type: 'select',
                name: 'state',
                id: 'state',
                label : 'State',
                validations:{
                    hasCategory:true,
                },
                options:States.map(c=>{
                    return {value:c,displayValue:c}
                }),
                value:States,
                valid:true,
            },
            zipcode :{
                type:'number',
                name:'pincode',
                id:'pincode',
                placeholder:"Enter 6 digit Pincode" ,
                label:'Pincode',
                
                validations:{ 
                    isZipCode:true
                },
                valid:false,
                touched:false
            },
            contact :{
                type:'number',
                name:'contact',
                id:'contact',
                placeholder:'Enter your 10 digit mobile no' ,
                label:'Phone Number',
                
                validations:{ 
                    isPhoneNumber:true
                },
                valid:false,
                touched:false
            },

            save:{
                type:'checkbox',
                name:'save',
                id:'save',
                label:'Save as your address',
                value:false,
                valid:true,
            }
            
        },
        formIsValid: false,
        existingProduct:null
    }
    componentDidMount(){
        this.props.onAddProductInit()
        if(this.props.orderaddress){
            console.log(this.props.orderaddress)
            let InputElement
            let updateForm={...this.state.AddressForm}
            for ( InputElement in updateForm){
                updateForm[InputElement].value=this.props.orderaddress[InputElement]
                updateForm[InputElement].valid=true;
                
            }
            this.setState({AddressForm: updateForm, formIsValid:true})
            
        }
    }
    
    onSubmitHandler=(e)=>{
        e.preventDefault()
        // const addressData = new FormData()

        // addressData.append('address',this.state.AddressForm.address.value)
        // addressData.append('city',this.state.AddressForm.city.value)
        // addressData.append('state',this.state.AddressForm.state.value)
        // addressData.append('zipcode',this.state.AddressForm.zipcode.value)
        // addressData.append('save',this.state.AddressForm.save.value)
        // console.log(addressData)
        const addressData={
            address:this.state.AddressForm.address.value,
            city:this.state.AddressForm.city.value,
            state:this.state.AddressForm.state.value,
            zipcode:this.state.AddressForm.zipcode.value,
            contact:this.state.AddressForm.contact.value,
            save:this.state.AddressForm.save.value,
        }
        this.props.onSave(e,addressData)
        
    }
    inputChangedHandler =(event, element)=>{
        let AddressForm={...this.state.AddressForm}
        let Element={...AddressForm[element]}
       
        let updatedElement={...Element,
            value: event.target.value,
            valid: checkValidity(event.target.value, Element.validations)
        }
        let updatedAddressForm ={...AddressForm, 
            [element] :updatedElement
        }

        let formIsValid=true;
        let InputElement
        for ( InputElement in this.state.AddressForm){
            formIsValid=this.state.AddressForm[InputElement].valid && formIsValid
        }
        this.setState({AddressForm: updatedAddressForm, formIsValid:formIsValid})
    }

    imageInputHandler=(id,value,isValid)=>{
        let AddressForm={...this.state.AddressForm}
        let Element={...AddressForm[id]}
        let updatedElement={...Element,
            value: value,
            valid: isValid
        }
        let updatedAddressForm ={...AddressForm, 
            [id] : updatedElement
        }

        let formIsValid = this.state.formIsValid && isValid
        this.setState({AddressForm: updatedAddressForm, formIsValid:formIsValid})

    }

    render(){
        let formElements= [];
        let key
        for (key in this.state.AddressForm){
            formElements.push({
                id: key,
                config: this.state.AddressForm[key]
            })
               
        }
        let formElmts=formElements.map(element=>{
            switch(element.config.type){     
                case 'select':
                        return <Col sm={10}>
                            <FormGroup row>
                            <Label size='sm'>{element.config.label}</Label>
                                <Input
                                    type={element.config.type}
                                    name={element.config.name}
                                    id={element.config.id}
                                    valid={element.config.valid}
                                    
                                    onChange={(event)=>this.inputChangedHandler(event,element.id)}
                                    >
                                    {element.config.options.map(c=>{
                                        return <option value={c.value}>{c.displayValue}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                case 'checkbox':
                    return<Col sm={6} style={{alignItems: 'center'}}>
                        <FormGroup row>
                            <Label size='sm'>{element.config.label}</Label>
                                <Input
                                    type={element.config.type}
                                    name={element.config.name}
                                    id={element.config.id}
                                    valid={element.config.valid}
                                    onChange={(event)=>this.inputChangedHandler(event,element.id)}
                                    >
                                </Input>
                            </FormGroup>
                        </Col>

                case 'file':
                    return <ImageUpload id='image'
                    label={this.state.AddressForm.image.label} 
                    name={this.state.AddressForm.image.name} 
                    onInput={this.imageInputHandler}
                    options={{
                        maxSizeMB :0.2,
                        maxWidthOrHeight :500,
                        useWebWorker:true
                    }}
                    imagePath={this.props.isEditMode&& this.state.existingProduct? this.state.existingProduct.imagePath: null}
         />
                        
                default:
                    return <Col sm={10}>
                        <FormGroup row>
                            <Label size='sm'>{element.config.label}</Label>
                            <Input
                                type={element.config.type}
                                name={element.config.name}
                                id={element.config.id}
                                placeholder={element.config.placeholder}
                                value={element.config.value}
                                valid={element.config.valid}
                                invalid={!element.config.valid && element.config.touched}
                                onChange={(event)=>this.inputChangedHandler(event,element.id)}
                            /> 
                        </FormGroup>
                    </Col> 
                }
            }
        )

        let form=(
            <Form className="form" onSubmit={this.onSubmitHandler}>
                {formElmts}
                {!this.props.isEditMode?
                <Row>
                    <Col>
                        <Button color='danger' onClick={this.props.goBackHandler}>Go Back</Button>
                        <Button color='success' onSubmit={this.onSubmitHandler} disabled={!this.state.formIsValid} >Proceed</Button>
                    </Col>
                </Row>
                :
            <Row>
            <Col>
            <button className="btn btn-danger" >Cancel</button>
            </Col>
            <Col>
            <button className="btn btn-success" disabled={this.state.formIsValid}>Update</button>
            </Col>
            
            </Row>}
                
        </Form>
        )
        return(
            <Container size='sm' style={{margin:'5rem auto', maxWidth:'70%', alignItems: 'center',maxHeight:'80vh'}}> 
                <h3 style={{margin:'1rem auto', textAlign: 'center'}}>Enter your Shipping Details</h3>
                {form}
            </Container>
        )
    }
}
const mapDispatchToProps =dispatch=>{
    return{
         onAddProduct :(ItemData,token)=>dispatch(Actions.addProduct(ItemData,token)),
         onUpdateProduct :(ItemData,id,token)=>dispatch(Actions.updateProduct(ItemData,id,token)),
         onAddProductInit:()=>dispatch(Actions.addProductInit()) 
    }
} 
const mapStateToProps = state=>{
    return{
      userId: state.auth.user.userId,
      user: state.auth.user
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddressForm))
