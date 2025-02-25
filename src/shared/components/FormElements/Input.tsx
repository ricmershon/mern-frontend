import { useEffect, useReducer, ChangeEvent } from "react";

import { Validate } from "@/shared/utils/validators";
import { InputValidators } from "@/shared/utils/validators";
import { FieldInput } from "@/shared/types";

interface InputState extends FieldInput {
    isTouched: boolean;
}

type InputAction =
    { type: 'CHANGE', value: string, validators: InputValidators }
    | { type: 'BLUR' }

export type InputChangeHandler = (id: string, value: string, isValid: boolean) => void;

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
    initialValue?: string;
    initialValid?: boolean;
    placeholder?: string;
    rows?: number;
    onChange: InputChangeHandler;
    validators: InputValidators;
    errorText?: string;
}

const Input = ({
    inputType,
    id,
    type,
    label,
    placeholder,
    initialValue,
    initialValid,
    rows,
    errorText,
    validators,
    onChange
}: InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '',
        isValid: initialValid || false,
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