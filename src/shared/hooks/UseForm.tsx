import { useReducer, useCallback } from "react";
import { InputType } from "../components/FormElements/types";

interface PlaceState {
    inputs: { [key: string]: InputType };
    isValid: boolean;
}

interface FormAction extends InputType {
    type: 'INPUT_CHANGE',
    inputId: string;
}

const formReducer = (state: PlaceState, action: FormAction) => {
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
    const [placeState, dispatch] = useReducer(formReducer, {
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
    
    return [placeState, handleInputChange];

}

export default useForm;