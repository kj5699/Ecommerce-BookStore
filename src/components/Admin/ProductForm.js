import React, { Component } from 'react';
import {
    Col, Form,
  FormGroup, Label, Input, Row,
  
} from 'reactstrap'
import { checkValidity } from '../../utils/utils';
import * as Actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import ImageUpload from '../UI/ImageUpload';


class AddItem extends Component{
    state={
        AddItemForm:{
            category:{
                type: 'select',
                name: 'category',
                id: 'category',
                label : 'Category',
                validations:{
                    hasCategory:true,
                },
                options:this.props.categories.map(c=>{
                    return {value:c.id,displayValue:c.name}
                }),
                // options:[{value:'1',displayValue:'category1'},{value:'2',displayValue:'category2'}],
                value:this.props.categories[0].id || null,
                valid:true,
            },
            image:{
                type:'file',
                name:'image',
                id:'name',
                label:'Product Image',
                value: null,
                validations:{
                    required:true,
                },
                valid:false,
                touched:true
            },
            name : {
                type:'text',
                name: 'name',
                id:'item name',
                placeholder:'Item Name',
                label:'Name',
  
                value: '',
                validations:{
                    required:true,
                    },
                valid:false,
                touched:false
            },
            author: {
                type:'text',
                name:'author',
                id:'author',
                placeholder:'Author',
                label:'Written By',
                value: '',
                validations:{
                    required: false, 
                },
                valid:false,
                touched:false
            },
            price :{
                type:'number',
                name:'price',
                id:'price',
                placeholder:'0' ,
                label:'Price (in Rs)',
                value: 0,
                validations:{ 
                    isNotNegative:true
                },
                valid:false,
                touched:false
            },
            quantity :{
                type:'number',
                name:'quantity',
                id:'quantity',
                placeholder:'0' ,
                label:'Quantity',
                value: 0,
                validations:{ 
                    isNotNegative:true
                },
                valid:false,
                touched:false
            },
            
        },
        formIsValid: false,
        existingProduct:null
    }
    componentDidMount(){
        this.props.onAddProductInit()
        if(this.props.isEditMode){
            const product= this.props.products.find(p => p.id===this.props.match.params.id)
            this.setState({existingProduct:product})
            let InputElement
            let updateForm={...this.state.AddItemForm}
            for ( InputElement in updateForm){
                updateForm[InputElement].value=product[InputElement]
                updateForm[InputElement].valid=true;
                
            }
            console.log(updateForm)
            this.setState({AddItemForm: updateForm, formIsValid:true})
        }
    }
    
    onSubmitHandler=(e)=>{
        e.preventDefault()
        
        if (this.props.isEditMode){
        const itemData = new FormData()
        itemData.append('category',this.state.AddItemForm.category.value)
        itemData.append('name',this.state.AddItemForm.name.value)
        itemData.append('author',this.state.AddItemForm.author.value)
        itemData.append('price',this.state.AddItemForm.price.value)
        itemData.append('quantity',this.state.AddItemForm.quantity.value)
        itemData.append('created_at',new Date())
        itemData.append('available',this.state.AddItemForm.quantity.value >0)
        if(this.state.AddItemForm.image.value){
            itemData.append('image',this.state.AddItemForm.image.value)
        }
        // console.log(itemData)
            
        this.props.onUpdateProduct(itemData,this.props.match.params.id.toString(),this.props.user.token)

        }else{
            
        const itemData = new FormData()
        itemData.append('category',this.state.AddItemForm.category.value)
        itemData.append('name',this.state.AddItemForm.name.value)
        itemData.append('author',this.state.AddItemForm.author.value)
        itemData.append('price',this.state.AddItemForm.price.value)
        itemData.append('quantity',this.state.AddItemForm.quantity.value)
        itemData.append('image',this.state.AddItemForm.image.value)
        itemData.append('created_at',new Date())
        itemData.append('available',this.state.AddItemForm.quantity.value >0)
        console.log(itemData)
        this.props.onAddProduct(itemData, this.props.user.token)
        }
            
        
        

    }
    inputChangedHandler =(event, element)=>{
        let AddItemForm={...this.state.AddItemForm}
        let Element={...AddItemForm[element]}
       
        let updatedElement={...Element,
            value: event.target.value,
            valid: checkValidity(event.target.value, Element.validations)
        }
        let updatedItemForm ={...AddItemForm, 
            [element] :updatedElement
        }

        let formIsValid=true;
        let InputElement
        for ( InputElement in this.state.AddItemForm){
            formIsValid=this.state.AddItemForm[InputElement].valid && formIsValid
        }
        this.setState({AddItemForm: updatedItemForm, formIsValid:formIsValid})
    }

    imageInputHandler=(id,value,isValid)=>{
        let AddItemForm={...this.state.AddItemForm}
        let Element={...AddItemForm[id]}
        let updatedElement={...Element,
            value: value,
            valid: isValid
        }
        let updatedItemForm ={...AddItemForm, 
            [id] : updatedElement
        }
        let formIsValid = this.state.formIsValid && isValid
        this.setState({AddItemForm: updatedItemForm, formIsValid:formIsValid})
    }

    render(){
        let formElements= [];
        let key
        for (key in this.state.AddItemForm){
            formElements.push({
                id: key,
                config: this.state.AddItemForm[key]
            })
               
        }
        let formElmts=formElements.map(element=>{
            switch(element.config.type){     
                case 'select':
                        return <Col sm={12}>
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
                case 'file':
                    return <ImageUpload id='image'
                    label={this.state.AddItemForm.image.label} 
                    name={this.state.AddItemForm.image.name} 
                    onInput={this.imageInputHandler}
                    options={{
                        maxSizeMB :0.2,
                        maxWidthOrHeight :500,
                        useWebWorker:true
                    }}
                    imagePath={this.props.isEditMode&& this.state.existingProduct? this.state.existingProduct.imagePath: null}
         />
                        
                default:
                    return <Col sm={12}>
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
            <Form className="form" onSubmit={this.onSubmitHandler} style={{width:'70%', margin:'2rem auto'}}>
            {formElmts}
            {!this.props.isEditMode?
            <Col>
                <button className="btn btn-success" disabled={!this.state.formIsValid}>Add</button>
            </Col>:
            <Row>
            <Col>
            <button className="btn btn-success" disabled={!this.state.formIsValid}>Update</button>
            </Col>
            <Col>
            <button className="btn btn-danger" >Cancel</button>
            </Col>
            </Row>}
                
            </Form>
        )
        return(
            <div className="mx-2"> 
                { this.props.submitted? <Redirect to='/'></Redirect> :null} 
                {form}
            </div>
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
      categories: state.shop.categories,
      products:state.shop.products,
      submitted: state.shop.submitted,
      userId: state.auth.user.userId,
      user: state.auth.user
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddItem))