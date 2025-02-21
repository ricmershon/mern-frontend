interface InputProps {
    inputType: string;
    id?: string;
    type: string;
    label: string;
    placeholder?: string;
    rows?: number;
}

const Input = ({ inputType, id, type, label, placeholder, rows }: InputProps) => {
    const element = inputType === 'input' ? (
        <input className="form-input" id={id} type={type} placeholder={placeholder} />
    ) : (
        <textarea className="form-textarea" id={id} rows={rows || 3} />
    );

    return (
        <div className="my-4 mx-0">
            <label htmlFor={id} className="block font-bold mb-2">{label}</label>
            {element}
        </div>
    )
}

export default Input;