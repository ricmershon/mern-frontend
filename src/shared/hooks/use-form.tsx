import { useReducer, useCallback } from "react";
import { FormState, FormInputs } from "../types";
import { InputChangeHandler } from "../components/FormElements/Input";

type FormAction =
    { type: 'INPUT_CHANGE', inputId: string, value: string, isValid: boolean }
    | { type: 'LOAD_DATA', inputs: FormInputs, formIsValid: boolean };

export type LoadFormHandler = (inputData: FormInputs, formIsValid: boolean) => void;

const formReducer = (state: FormState, action: FormAction) => {
    switch (action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (state.inputs[inputId]) {
                    if (inputId === action.inputId) {
                        formIsValid = formIsValid && action.isValid;
                    } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid;
                    }
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

        case 'LOAD_DATA': 
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }

        default:
            return state
    }
}

const useForm = (
    initialInputs: FormInputs, initialValidity: boolean
): [
    formState: FormState,
    handleInputChange: InputChangeHandler,
    loadFormData: LoadFormHandler
] => {
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

    const loadFormData = useCallback((inputData: FormInputs, formValidity: boolean) => {
        dispatch({
            type: 'LOAD_DATA',
            inputs: inputData,
            formIsValid: formValidity
        })
    }, [])
    
    return [formState, handleInputChange, loadFormData];
}

export default useForm;