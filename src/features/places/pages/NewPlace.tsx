import { FormEvent, useCallback, useReducer } from "react";

import { InputType } from "@/shared/components/FormElements/types";
import { ValidatorMinLength, ValidatorRequire } from "@/shared/utils/validators";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";

interface FormState {
    inputs: { [key: string]: InputType };
    isValid: boolean;
}

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

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const handleInputChange = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("^^^ INPUTS ^^^\n", formState.inputs);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="list-none my-0 mx-auto p-4 w-[90%] max-w-[40rem] shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-md bg-white"
        >
            <Input
                id="title"
                inputType="input"
                type="text"
                label="Title"
                validators={[ValidatorRequire()]}
                onChange={handleInputChange}
                errorText="Please enter a valid title."
            />
            <Input
                id="description"
                inputType="textarea"
                label="Description"
                validators={[ValidatorMinLength(5)]}
                onChange={handleInputChange}
                errorText="Please enter a valid description with at least 5 characters."
            />
            <Input
                id="address"
                inputType="input"
                label="Address"
                validators={[ValidatorRequire()]}
                onChange={handleInputChange}
                errorText="Please enter a valid address."
            />
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}

export default NewPlace;