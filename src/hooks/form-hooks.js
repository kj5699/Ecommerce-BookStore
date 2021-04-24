import { useCallback , useReducer } from 'react';

const formReducer = (state,action) =>{
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid =true;

            for (const inputId in state.inputs){
                if (!state.inputs[inputId]){
                    continue;
                }
                if (inputId ===action.inputId){
                    formIsValid = formIsValid && action.isValid
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.inputId] : {...state.inputs[action.inputId],value:action.value ,isValid: action.isValid}
                },
                isValid:formIsValid,
            }

            case 'SET_DATA':
                return{
                    inputs:action.inputs,
                    isValid:action.isValid
                }
        
        default:
            return state
    }
}

const useForm =(initialInputs,initalFormValidity)=>{
    const [formState, dispatch] = useReducer(formReducer,{
        inputs:initialInputs,
        isValid:initalFormValidity
    });
    const inputHandler = useCallback((id, value, isValid)=>{
        dispatch({
            type:'INPUT_CHANGE',
            inputId:id,
            isValid:isValid,
            value:value
        })
    },[])

    const setFormData = useCallback((inputData,formIsValid)=>{
        dispatch({
            type:'SET_DATA',
            inputs:inputData,
            isValid:formIsValid
            
        })
    },[])

    return[formState,inputHandler,setFormData]
}

export default useForm;