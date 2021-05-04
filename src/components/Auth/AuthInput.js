import { useEffect, useReducer } from "react"
import { checkValidity } from "../../utils/utils"
import './AuthInput.scss';

const inputReducer=(state, action) =>{
    switch(action.type){
        case "CHANGE":
            return{
                ...state,
                value:action.val,
                isValid:checkValidity(action.value,action.validations)
            }
        case 'TOUCH': {
                return {
                  ...state,
                  isTouched: true
                }
              }
        default:
            return state
    }
}

const AuthInput = props => {
    const [inputState, dispatch] =useReducer(inputReducer,{
        value:props.value || '',
        isTouched:false,
        isValid: props.isValid || false
    })
    const {id ,onInput} =props
    const {value , isValid} =inputState
    useEffect(()=>{
        onInput(id, value ,isValid)

    },[id, value, isValid, onInput])

    const changeHandler = event => {
        dispatch({
          type: 'CHANGE',
          val: event.target.value,
          validators: props.validators
        });
      };
    
      const touchHandler = () => {
        dispatch({
          type: 'TOUCH'
        });
      };
      const element =
      props.element === 'input' ? (
        <>
        <h5 >{props.label}</h5>
        <input className='input'
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
        </>
      ) : (
        
        <textarea className='input'
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
        
      );


    return (
        <div className='form-element'>
            {element}
        </div>
    )
}

export default AuthInput
