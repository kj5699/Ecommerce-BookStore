export const checkValidity=(value, rules)=>{
    let isValid=true;
    
    if (! rules){
        return true;
    }
    if (rules.hasCategory){
        isValid=value !==''&& isValid;
    }
    if (rules.required){
        isValid =value.trim() !== '' && value !== null && isValid;
    }

    if (rules.minLength){
        isValid =value.length >= rules.minLength&& isValid;
    }

    if (rules.maxLength){
        isValid =value.length <= rules.minLength&& isValid;
    }

    if (rules.isEmail){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    if (rules.isNotNegative){
        isValid= value >=0 && isValid;
    }
    if (rules.isZipCode){
        const pattern=/(^\d{6}$)/;
        isValid = pattern.test(value) && isValid;
    }
    if (rules.isPhoneNumber){
        const pattern=/(^\d{10}$)/;
        isValid = pattern.test(value) && isValid;
    }
    
    return isValid;
}