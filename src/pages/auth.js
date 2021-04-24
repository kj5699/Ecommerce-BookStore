import useForm from "../hooks/form-hooks";
import AuthForm from "../components/Auth/AuthForm";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as Actions from '../store/actions/index';
import { withRouter } from "react-router";

const Auth =props => {
    const inputs=props.isSignUp ?{
        name:{},
        email:{},
        password:{},
    }:{
        email:{},
        password:{},
    }
    

    const [formState, inputHandler,setFormData] = useForm(inputs, false)
    useEffect(()=>{
        if(props.isSignUp){
            setFormData({
                name:{
                    id:'name',
                    element:'input',
                    type:'text',
                    placeholder:'Your Name',
                    value:'',
                    label:'Full Name',
                    validation:{
                        required:true
                    },
                    isValid:false
                },
                email:{
                    id:'email',
                    element:'input',
                    type:'email',
                    placeholder:'Your Email',
                    value:'',
                    label:'Email',
                    validation:{
                        required:true,
                        isEmail:true
                    },
                    isValid:false
                },
                password:{
                    id:'password',
                    element:'input',
                    type:'password',
                    placeholder:'Your Password',
                    value:'',
                    label:'Password',
                    validation:{
                        required:true,
                        minLength:5
                    },
                    isValid:false
                }},false)
        }else{
            setFormData({
                email:{
                    id:'email',
                    element:'input',
                    type:'email',
                    placeholder:'Your Email',
                    label:'Email',
                    value:'',
                    validation:{
                        required:true,
                        isEmail:true
                    },
                    isValid:false
                },
                password:{
                    id:'password',
                    element:'input',
                    type:'password',
                    placeholder:'Your Password',
                    label:'Password',
                    value:'',
                    validation:{
                        required:true,
                        minLength:5
                    },
                    isValid:false
                }},false)
        }


    },[props.isSignUp,setFormData])

    const submitHandler=(event) => {
        event.preventDefault();
        if(props.isSignUp){
            const userData={
                name:formState.inputs.name.value,
                email:formState.inputs.email.value,
                password:formState.inputs.password.value,
            }
            props.onSignUp(userData)
            

        }else{
            const userData={
                email:formState.inputs.email.value,
                password:formState.inputs.password.value,
            }
            props.onSignIn(userData)
        }
            
        

    }
    return (
        
            <AuthForm formState={formState} 
                inputHandler={inputHandler} 
                submitHandler={submitHandler} 
                isSignUp={props.isSignUp}
            ></AuthForm>
            
        
    )
}

const mapDispatchToProps=(dispatch) =>{
    return {
        onSignIn : (userData)=>dispatch(Actions.signIn(userData)),
        onSignup : (userData)=>dispatch(Actions.signUp(userData))
    }
}

export default connect(null,mapDispatchToProps)(withRouter(Auth));


