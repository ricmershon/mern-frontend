import { useReducer, useCallback } from "react";
import { FormState, InputType } from "../types";

interface FormAction extends InputType {
    type: 'INPUT_CHANGE',
    inputId: string;
}

const formReducer = (state: FormState, action: FormAction) => {
    switch (action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }
        }
        default:
            return state
    }
}

const useForm = (initialInputs: { [key: string]: InputType; }, initialValidity: boolean) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialValidity
    });

    const handleInputChange = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);
    
    return [formState, handleInputChange];
}

export default useForm;