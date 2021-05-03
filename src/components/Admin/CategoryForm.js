import React, { Component } from 'react';
import {
    Container,
    Col, Form,
  FormGroup, Label, Input, Row,
  
} from 'reactstrap'
import { checkValidity } from '../../utils/utils';
import * as Actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import ImageUpload from '../UI/ImageUpload';


class AddCategory extends Component{
    state={
        AddCategoryForm:{
            name : {
                type:'text',
                name: 'name',
                id:'category',
                placeholder:'Category',
                label:'Category',
                value: '',
                validations:{
                    required:true,
                    
                    },
                valid:false,
                touched:false
            },
            description : {
                type:'text',
                name:'description',
                id:'description',
                placeholder:'Description',
                label:'description',
  
                value: '',
                validations:{
                    minLenght:5
                    },
                valid:false,
                touched:false
            },
            image:{
                type:'file',
                name:'image',
                id:'image',
                
                label:'Category Image',
  
                value: null,
                validations:{
                    required:true,
                },
                valid:false,
                touched:false
            }
        },
        formIsValid:false,
        existingCategory:null
    }
    componentDidMount(){
        this.props.onAddCategoryInit()
        if(this.props.isEditMode){
            const category= this.props.categories.find(c => c.id===this.props.match.params.id)
            console.log(category)
            this.setState({existingCategory:category})
            let InputElement
            let updateForm={...this.state.AddCategoryForm}
            for ( InputElement in updateForm){
                updateForm[InputElement].value=category[InputElement]
                updateForm[InputElement].valid=true;
                
            }
            console.log(updateForm)
            this.setState({AddCategoryForm: updateForm, formIsValid:true})
        }
    }
    componentDidUpdate(){
        console.log(this.props.submitted)
    }
    cancelEditHandler=(e)=>{
        e.preventDefault()
        // console.log(this.props)
        this.props.onCancelForm()
        
    }
    onSubmitHandler=(e)=>{
        e.preventDefault()
        if (this.props.isEditMode){
        const categoryData =new FormData()
        categoryData.append('name', this.state.AddCategoryForm.name.value)
        categoryData.append('description', this.state.AddCategoryForm.description.value)
        if(this.state.AddCategoryForm.image.value){
            categoryData.append('image',this.state.AddCategoryForm.image.value)
        }
        console.log(categoryData)
        this.props.onUpdateCategory(categoryData, this.props.match.params.id,this.props.user.token)
        }
        else{
        const categoryData =new FormData()
        categoryData.append('name', this.state.AddCategoryForm.name.value)
        categoryData.append('description', this.state.AddCategoryForm.description.value)
        categoryData.append('image', this.state.AddCategoryForm.image.value)
        console.log(categoryData)    
        this.props.onAddCategory(categoryData,this.props.user.token)
        }
        
    }
    inputChangedHandler =(event, element)=>{
        let AddCategoryForm={...this.state.AddCategoryForm}
        let Element={...AddCategoryForm[element]}
        let updatedElement={...Element,
            value: event.target.value,
            valid: checkValidity(event.target.value, Element.validations)
        }
        let updatedCategoryForm ={...AddCategoryForm, 
            [element] :updatedElement
        }

        let formIsValid=true;
        let InputElement
        for ( InputElement in this.state.AddCategoryForm){
            formIsValid=this.state.AddCategoryForm[InputElement].valid && formIsValid
        }
        this.setState({AddCategoryForm: updatedCategoryForm, formIsValid:formIsValid})
    }
    imageInputHandler=(id,value,isValid)=>{
        let AddCategoryForm={...this.state.AddCategoryForm}
        let Element={...AddCategoryForm[id]}
        let updatedElement={...Element,
            value: value,
            valid: isValid
        }
        let updatedCategoryForm ={...AddCategoryForm, 
            [id] : updatedElement
        }

        let formIsValid = this.state.formIsValid && isValid;
        this.setState({AddCategoryForm: updatedCategoryForm, formIsValid:formIsValid})

    }
    render(){
        let formElements= [];
        let key
        for ( key in this.state.AddCategoryForm){
            if(key!=='image'){
                formElements.push({
                    id: key,
                    config: this.state.AddCategoryForm[key]
                })
            }

            
        }
        let form=(
            <Form className="form" onSubmit={this.onSubmitHandler}>
                {formElements.map(element=>(
                    <Col key={element.id}>
                        <FormGroup>
                        <Label>{element.config.label}</Label>
                        <Input
                            type={element.config.type}
                            name={element.config.name}
                            id={element.config.id}
                            placeholder={element.config.placeholder}
                            valid={element.config.valid}
                            value={element.config.value}
                            onChange={(event)=>this.inputChangedHandler(event,element.id)}
                        />
                        </FormGroup>
                    </Col>
                    ))
                } 
                <Col>
                <ImageUpload id='image'
                            label={this.state.AddCategoryForm.image.label} 
                            name={this.state.AddCategoryForm.image.name} 
                            onInput={this.imageInputHandler}
                            options={{
                                maxSizeMB :0.1,
                                maxWidthOrHeight :300,
                                useWebWorker:true
                            }}
                            imagePath={this.props.isEditMode&& this.state.existingCategory? this.state.existingCategory.imagePath: null}
                />
                
                </Col>  
                {!this.props.isEditMode?
                <Row>
                    <Col >
                            <button className="btn btn-success" disabled={!this.state.formIsValid} style={{margin:'auto'}}>Add</button>
                    </Col>
                    <Col>
                        <button className="btn btn-danger" onClick={this.cancelEditHandler} >Cancel</button>
                    </Col>
                </Row>
                :
                <Row>
                    <Col>
                        <button className="btn btn-success" disabled={!this.state.formIsValid}>Update</button>
                    </Col>
                    <Col>
                        <button className="btn btn-danger" onClick={this.cancelEditHandler} >Cancel</button>
                    </Col>
                </Row>
                }       
            </Form>
        )
        return(
            <Container>  
                    {this.props.submitted? <Redirect to='/'></Redirect> :null} 
                    {form}
            </Container>
        )
    }
}
const mapDispatchToProps =dispatch=>{
    return{
        onAddCategory :(categoryData,token,)=>dispatch(Actions.addCategory(categoryData,token)),
        onAddCategoryInit:()=>dispatch(Actions.addCategoryInit()),
        onUpdateCategory:(categoryData,id,token)=>dispatch(Actions.updateCategory(categoryData,id,token)),
        onCancelForm:()=>dispatch(Actions.cancelForm())
    }
}

const mapStateToProps = state=>{
    return{
      submitted: state.shop.submitted,
      categories: state.shop.categories,
      user: state.auth.user
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCategory))
