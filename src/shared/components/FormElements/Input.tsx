import { ChangeEvent, useReducer } from "react";

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: true
            }
        default: 
            return state
    }
}

interface InputProps {
    inputType: string;
    id?: string;
    type: string;
    label: string;
    placeholder?: string;
    rows?: number;
    onChange?: () => void;
    validators?: Array<string>;
    errorText?: string;
}

const Input = ({ inputType, id, type, label, placeholder, rows, errorText }: InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: 'CHANGE', value: event.target.value });
    };

    const element = inputType === 'input' ? (
        <input
            className={`form-input ${!inputState.isValid && 'border-red-500 bg-[#ffd1d1]'}`}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={inputState.value}
        />
    ) : (
        <textarea
            className={`form-textarea ${!inputState.isValid && 'border-red-500 bg-[#ffd1d1]'}`}
            id={id} rows={rows || 3}
            onChange={handleChange}
            value={inputState.value}
        />
    );


    return (
        <div className={`my-4 mx-0 ${!inputState.isValid && 'text-red-500'}`}>
            <label htmlFor={id} className="block font-bold mb-2">{label}</label>
            {element}
            {!inputState.isValid && <p className='mt-1'>{errorText}</p>}
        </div>
    )
}

export default Input;