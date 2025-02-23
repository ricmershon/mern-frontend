export interface FieldInput {
    value: string;
    isValid: boolean
}

export type FormInputs = { [key: string]: FieldInput }

export interface FormState {
    inputs: FormInputs;
    isValid: boolean;
}