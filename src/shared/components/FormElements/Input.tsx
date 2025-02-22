import { useEffect, useReducer, ChangeEvent } from "react";

import { Validate } from "@/shared/utils/validators";
import { InputValidators } from "@/shared/utils/validators";
import { InputType } from "./types";

interface InputState extends InputType {
    isTouched: boolean;
}

type InputAction =
    | { type: 'CHANGE', value: string, validators: InputValidators }
    | { type: 'BLUR' }


const inputReducer = (state: InputState, action: InputAction) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: Validate(action.value, action.validators)
            }
        case 'BLUR':
            return {
                ...state,
                isTouched: true
            }
        default: 
            return state
    }
}

interface InputProps {
    inputType?: string;
    id: string;
    type?: string;
    label: string;
    inputValue?: string;
    valid?: boolean;
    placeholder?: string;
    rows?: number;
    onChange: (id: string, value: string, isValid: boolean) => void;
    validators: InputValidators;
    errorText?: string;
}

const Input = ({ inputType, id, type, label, placeholder, inputValue, valid, rows, errorText, validators, onChange }: InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: inputValue || '',
        isValid: valid || false,
        isTouched: false
    });

    const { value, isValid } = inputState;

    useEffect(() => {
        onChange(id, value, isValid);
    }, [id, value, isValid, onChange]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: 'CHANGE',
            value: event.target.value,
            validators: validators
        });
    };

    const handleTouch = () => dispatch({ type: 'BLUR' });

    const element = inputType === 'input' ? (
        <input
            className={`form-input ${!inputState.isValid && inputState.isTouched && 'border-red-500 bg-[#ffd1d1]'}`}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleTouch}
            value={inputState.value}
        />
    ) : (
        <textarea
            className={`form-textarea ${!inputState.isValid && inputState.isTouched && 'border-red-500 bg-[#ffd1d1]'}`}
            id={id} rows={rows || 3}
            onChange={handleChange}
            onBlur={handleTouch}
            value={inputState.value}
        />
    );


    return (
        <div className={`my-4 mx-0 ${!inputState.isValid && inputState.isTouched && 'text-red-500'}`}>
            <label htmlFor={id} className="block font-bold mb-2">{label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p className='mt-1'>{errorText}</p>}
        </div>
    )
}

export default Input;